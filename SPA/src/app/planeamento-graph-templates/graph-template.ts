import * as THREE from "three"

import { LigacoesData } from "src/assets/Info";

const NODE_RADIUS = 0.03;
const NODE_SEGMENTS = 60;
const NODE_COLOR = 0x00CCFF;

interface nodeDist {
    node: string;
    dist: number;
}

interface nodePair {
    node1: string;
    node2: string;
}

export class Graph {
    private scene: THREE.Scene;
    private camera: THREE.OrthographicCamera;
    private renderer: THREE.WebGLRenderer;

    private ligacoesList: THREE.Line [] = []; 
    private nodesLigados: nodePair[] = [];
    private rotasList: THREE.Line[] = [];
    private nodeHashMap = new Map<string, THREE.Mesh>()

    public constructor() {
        // Create a scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);
        this.camera = new THREE.OrthographicCamera();

        // Create an orthographic camera
        const aspectRatio = 500 / 500;
        if (aspectRatio < 1.0) {
            this.camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0 / aspectRatio, -1.0 / aspectRatio, 0.0, 1.0);
        } else {
            this.camera = new THREE.OrthographicCamera(-aspectRatio, aspectRatio, 1.0, -1.0, 0.0, 1.0);
        }

        // Create a renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(500, 500);
        const container = document.getElementById('canvas');
        container!.appendChild(this.renderer.domElement);

        // Register the event handler to be called on window resize
        window.addEventListener("resize", this.windowResize);
    }

    private windowResize() {
        const aspectRatio = 500 / 500;
        if (aspectRatio < 1.0) {
            this.camera.left = -1.0;
            this.camera.right = 1.0;
            this.camera.top = 1.0 / aspectRatio;
            this.camera.bottom = -1.0 / aspectRatio;
        } else {
            this.camera.left = -aspectRatio;
            this.camera.right = aspectRatio;
            this.camera.top = 1.0;
            this.camera.bottom = -1.0;
        }
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(500, 500);
    }

    public animate() {
        this.renderer.render(this.scene, this.camera);
    }

    public addNode(x: number, y: number, nodeId: string) {
        let geometry = new THREE.CircleGeometry(NODE_RADIUS, NODE_SEGMENTS);
        let material = new THREE.MeshBasicMaterial({color: NODE_COLOR});

        let node = new THREE.Mesh(geometry, material);

        node.position.x = x;
        node.position.y = y;

        this.nodeHashMap.set( nodeId, node );

        this.scene.add(node);
        this.scene.add( this.criarLabel(nodeId, node.position) );
    }

    public atualizarLigacoes() {
        const material = new THREE.LineDashedMaterial({
            color: 0xAAAAAA,
            linewidth: 1,
            scale: 1,
            dashSize: 0.03,
            gapSize: 0.015,
        });

        LigacoesData.forEach( ligacao => {
            let no1: string = ligacao.ArmazemOrig.toString();
            let no2: string = ligacao.ArmazemDest.toString();

            while (no1.length != 3) {
                no1 = '0' + no1;
            }

            while (no2.length != 3) {
                no2 = '0' + no2;
            }

            const points = [];
            points.push( this.nodeHashMap.get(no1)!.position );
            points.push( this.nodeHashMap.get(no2)!.position );
                
            const geometry = new THREE.BufferGeometry().setFromPoints( points );
                
            const line = new THREE.Line( geometry, material );
            line.translateZ(-1);
            line.computeLineDistances();
            this.scene.add( line ); 
        }) 
    }


    public adicionarRota(rota: string[]) {

        if (this.rotasList.length > 0) {
            this.rotasList.forEach(rotaE => {
                this.scene.remove(rotaE);
            });
    
            this.rotasList = [];
        }

        const material = new THREE.LineBasicMaterial({ color: 0xFF0000, linewidth: 2 });

        for ( let i = 0; i < rota.length - 1; i++ ) {
            const points = [];
            points.push( this.nodeHashMap.get(rota[i])!.position );
            points.push( this.nodeHashMap.get(rota[i + 1])!.position );
                    
            const geometry = new THREE.BufferGeometry().setFromPoints( points );
                
            const line = new THREE.Line( geometry, material );
            line.translateZ( -1 );

            this.scene.add( line ) 
            this.rotasList.push( line );
        }
    }

    // Função para criar uma label com o nome e id do armazem
    private criarLabel(nome: string, point: THREE.Vector3): THREE.Sprite {
        const size = 32;
        const borderSize = 5;
        const ctx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;
        const font =  `${size}px Helvetica `;
        ctx.font = font;
        // mede o tamanho do nome
        const textWidth = ctx.measureText(`${nome}`).width;

        const doubleBorderSize = borderSize * 2;
        const width = textWidth + doubleBorderSize;
        const height = size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height;

        // é necessário voltar a colocar a fonte após fazer o rezise
        ctx.font = font;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        ctx.fillStyle = 'rgba(75, 75, 75, 0.5)';
        ctx.fillRect(0, 0, width, height);

        // scale to fit but don't stretch
        const scaleFactor = Math.min(1, textWidth);
        ctx.translate(width / 2, height / 2);
        ctx.scale(scaleFactor, 1);
        ctx.fillStyle = 'white';
        ctx.fillText(`${nome}`, 0, 0);

        const texture = new THREE.CanvasTexture(ctx.canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const labelMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
        });

        const label = new THREE.Sprite(labelMaterial);

        label.position.set(point.x, point.y + 0.07, point.z);
        label.scale.set(0.08, 0.06, 0.0);

        return label;
    }


    /* public atualizarLigacoes() {
        let distancia: number;

        this.nodeHashMap.forEach((node, nodeId) => {
            let nosMaisProximos: nodeDist[] = [ {node: '', dist: 99999}, {node: '', dist: 99999}];

            this.nodeHashMap.forEach((node2, nodeId2) => {
                if ( nodeId !== nodeId2 || nodeId < nodeId2) {
                    distancia = node.position.distanceTo(node2.position);
                    
                    for ( let i = 0; i < 2; i++) {
                        if ( nosMaisProximos[i].dist > distancia ) {
                            nosMaisProximos[i].dist = distancia;
                            nosMaisProximos[i].node = nodeId2;
                            break;
                        } 
                    }
                }
            });
            
            const material = new THREE.LineDashedMaterial({
                color: 0xAAAAAA,
                linewidth: 1,
                scale: 1,
                dashSize: 0.03,
                gapSize: 0.015,
            });
            
            for ( let i = 0; i < 2; i++ ) {
                let skipFlag: boolean = false;

                this.nodesLigados.forEach(pair => {
                    if ( (pair.node1 === nodeId && pair.node2 === nosMaisProximos[i].node) || (pair.node2 === nodeId && pair.node1 === nosMaisProximos[i].node)) {
                        skipFlag = true;
                    }
                });

                if (skipFlag) 
                    break;
                
                const points = [];
                points.push( this.nodeHashMap.get(nosMaisProximos[i].node)!.position );
                points.push( node.position );
                
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                
                const line = new THREE.Line( geometry, material );
                line.translateZ(-1);
                line.computeLineDistances();
                this.scene.add( line ); 

                this.nodesLigados.push( {node1: nodeId, node2: nosMaisProximos[i].node});
            }
        });
    } */
}