import * as THREE from "three"
import { Vector2 } from "three";
import { No } from "./no-template";

const K_LIGACAO = 2.1;
const K_OFFSET_Z = -0.03;
const COR_LIGACAO = '#797979';
const ROT_OFFSET = Math.PI/2;

interface Infinitesmo {
    x: number,
    y: number,
    z: number
}

interface LigacaoProps {
    largura: number
}


export class Ligacao {
    // Objeto da Ligação
    public object: THREE.Mesh;
    public noligado: No;

    
    // Dados da Ligação
    private comprimento: number;
    private largura: number;
    private orientacao: number;

    // Ponto central do nó
    private infinitesmo: Infinitesmo;

    
    public get getLargura() : number{
        return this.largura;
    }

    public get getComprimento() : number{
        return this.comprimento;
    }


    public get getOrientacao() : number{
        return this.orientacao;
    }

    public get getInfinitesmo() : Infinitesmo{
        return this.infinitesmo;
    }

    public constructor(noA: No, noB: No, props: LigacaoProps) {
        this.largura = props.largura;
        noA.check_largura(this.largura);
        this.noligado = noB; 
        this.comprimento = K_LIGACAO * noA.getRadius;

        const vecXY = (new Vector2(noB.object.position.x - noA.object.position.x, noB.object.position.y - noA.object.position.y)).normalize();
        
        this.orientacao = Math.atan2(vecXY.y, vecXY.x);
        if(this.orientacao < 0)
            this.orientacao += Math.PI*2;

        this.infinitesmo = { 
            x: noA.object.position.x,
            y: noA.object.position.y,
            z: noA.object.position.z
        };

        const geometry = new THREE.PlaneGeometry(this.largura, this.comprimento);
        const texture = new THREE.TextureLoader().load("./assets/textures/road.png"); 

        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter; 
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        
        const material = new THREE.MeshStandardMaterial( { map:texture, side: THREE.DoubleSide });

        geometry.translate(0.0, this.comprimento/2, K_OFFSET_Z);

        this.object = new THREE.Mesh( geometry, material ); 
        this.object.receiveShadow = true;

        this.object.position.set(this.infinitesmo.x, this.infinitesmo.y, this.infinitesmo.z);
        this.object.rotateZ(this.orientacao  - ROT_OFFSET);
    }

    public atualizar_comprimento(radius: number) {
        this.comprimento = K_LIGACAO * radius;

        const geometry = new THREE.PlaneGeometry(this.largura, this.comprimento);
        const texture = new THREE.TextureLoader().load("./assets/textures/road.png"); 
        const material = new THREE.MeshStandardMaterial( { map:texture, side: THREE.DoubleSide });

        geometry.translate(0.0, this.comprimento/2, K_OFFSET_Z);

        this.object = new THREE.Mesh( geometry, material );
        this.object.position.set(this.infinitesmo.x, this.infinitesmo.y, this.infinitesmo.z);
        this.object.rotateZ(this.orientacao - ROT_OFFSET);
    }   
}