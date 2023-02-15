import * as THREE from "three"
import { Vector3 } from "three";
import { Arco } from "./arco-template";
import { ModeloArmazem } from "./armazem-template";
import { Ligacao } from "./ligacao-template";


export class No {

    //O objeto
    public object: THREE.Mesh;

    public label: THREE.Sprite;

    public armazem: ModeloArmazem = null!;

    //infromação estatica
    private id: string;
    private name: string; 
    private x: number;
    private y: number; 
    private z: number;

    //informação mutavel
    //largura do maior nó
    private w: number;
    private radius: number;
    private K_CIRCULO = 2.1;
    private material: THREE.MeshStandardMaterial;
    public listaLigacoes: Ligacao[] = [];
    public listaRampas: Arco[] = [];


    public get getRadius() : number {
        return this.radius;
    }

    public get getNome() : string {
        return this.name;
    }
    
    public get getId() : string {
        return this.id;
    }

    public get getPosition(): Vector3{
        return new Vector3(this.x, this.y, this.z);
    }

    public getLigacao(noB: No): Ligacao{

        for(let i = 0; i< this.listaLigacoes.length; i++){
            if(this.listaLigacoes[i].noligado.getId === noB.getId)
                return this.listaLigacoes[i];
        }

        throw new Error("não existe ligação entre estes 2 nos");
    }

    public getRampa(noB: No): Arco{

        for(let i = 0; i< this.listaRampas.length; i++){
            if(this.listaRampas[i].getParNos().noA.getId === noB.getId || this.listaRampas[i].getParNos().noB.getId === noB.getId)
                return this.listaRampas[i];
        }

        throw new Error("não existe nenhuma rampa entre estes 2 nos");
    }

    public constructor(params: any){  
        this.id = params.ID;
        this.name = params.Nome;
        this.x = params.X;
        this.y = params.Y;
        this.z = params.Z;
        this.w = 1;

        const texture = new THREE.TextureLoader().load("./assets/textures/roundabout_placeholder.png"); 

        this.radius =  this.K_CIRCULO * this.w/2;

        var geometry = new THREE.CircleGeometry(this.radius , 32 );
        this.material = new THREE.MeshStandardMaterial({ 
            map: texture,
            side: THREE.DoubleSide
        } );
        this.object = new THREE.Mesh( geometry, this.material );
        this.object.position.set(this.x, this.y, this.z);
        this.object.receiveShadow = true;


        this.label = this.criarLabel(this.name);
    }

    public adicionar_ligacao(noA: No, noB: No, largura: number) : Ligacao {
        const ligacao = new Ligacao(noA,noB, {largura});
        this.listaLigacoes.push(ligacao);
        return ligacao;
    }

    public adicionar_rampa(rampa: Arco) {
        this.listaRampas.push(rampa);
    }

    
    //re-froma o nó tendo em conta um novo valor de tamanho de via
    public check_largura(w: number){
        if(w > 8 || w < this.w)
            return;

        this.w = w;

        this.radius =  (this.K_CIRCULO * this.w)/2;
    
        var geometry = new THREE.CircleGeometry(this.radius , 32 );
        this.object = new THREE.Mesh( geometry, this.material );
        this.object.position.set(this.x, this.y, this.z);

        this.listaLigacoes.forEach ( ligacao => {
            ligacao.atualizar_comprimento(this.radius);
        })
    }

    public modelarArmazem(): void{
        this.armazem = new ModeloArmazem(this.listaLigacoes, this.radius);

        this.object.add(this.armazem.object)
    }

    // Função para criar uma label com o nome e id do armazem
    public criarLabel(nome: string): THREE.Sprite {
        const size = 32;
        const borderSize = 5;
        const ctx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D;
        const font =  `${size}px Helvetica `;
        ctx.font = font;
        // mede o tamanho do nome
        const textWidth = ctx.measureText(`${this.id}: ${nome}`).width;

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
        ctx.fillText(`${this.id}: ${nome}`, 0, 0);

        const texture = new THREE.CanvasTexture(ctx.canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const labelMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
        });

        const label = new THREE.Sprite(labelMaterial);

        label.position.set(this.x, this.y, this.z + 1.5);
        label.scale.set(width  * 0.05, height * 0.05, 0.0);

        return label;
    }

    public hideLabel(boolean: boolean) {
        this.label.visible = !boolean;
    }
}
