import * as THREE from "three"
import { Ligacao } from "./ligacao-template";
import { Vector3 } from "three";
import { No } from "./no-template";

const COR_ARCO = '#02075d';
const ROT_OFFSET = Math.PI/2;

interface Infinitesmo {
    x: number,
    y: number,
    z: number
}

interface ParNos {
    noA: No;
    noB: No;
}

export class Arco{
   // Objeto da Ligação
   public object: THREE.Mesh;

   // Dados de um arco
   private comprimentoPlano : number;
   private desnivel : number;
   private comprimento : number;
   private largura: number;
   private orientacao: number;
   private inclinacao : number;

   private nosLigados: ParNos;

   private infinitesmoA: Infinitesmo;
   private infinitesmoB: Infinitesmo;

    public constructor(ligacaoA: Ligacao, ligacaoB : Ligacao){

        this.infinitesmoA = ligacaoA.getInfinitesmo;
        this.infinitesmoB = ligacaoB.getInfinitesmo;


        this.comprimentoPlano = Math.sqrt(Math.pow(this.infinitesmoB.x - this.infinitesmoA.x,2)+(Math.pow(this.infinitesmoB.y - this.infinitesmoA.y,2))) - ligacaoA.getComprimento - ligacaoB.getComprimento;
        this.desnivel = this.infinitesmoB.z - this.infinitesmoA.z;

        this.comprimento = Math.sqrt(Math.pow(this.comprimentoPlano,2) + Math.pow(this.desnivel,2));
        this.largura = ligacaoA.getLargura;
        this.orientacao = ligacaoA.getOrientacao;

        this.inclinacao = Math.atan(this.desnivel/this.comprimentoPlano);

        const texture = new THREE.TextureLoader().load("./assets/textures/road.png"); 

        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipmapLinearFilter; 
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set( 1, 512 / this.comprimento);
      
        var geometry = new THREE.PlaneGeometry(this.largura,this.comprimento);
        const material = new THREE.MeshStandardMaterial({
            map:texture,
            side: THREE.DoubleSide})

        geometry.translate(0.0, this.comprimento/2, 0.0);

        this.object = new THREE.Mesh( geometry, material ); 
        this.object.receiveShadow = true;

        this.object.position.set(this.infinitesmoA.x, this.infinitesmoA.y, this.infinitesmoA.z);
        this.object.rotateZ(this.orientacao  - ROT_OFFSET);
        
       
        
        const vetorX = new Vector3(ligacaoA.getComprimento, 0.0, 0.0);
        const axisZ = new Vector3(0.0, 0.0, 1.0);  
        const axis = vetorX.applyAxisAngle(axisZ, this.orientacao);
        const point = new Vector3(this.object.position.x + axis.x, this.object.position.y + axis.y, this.object.position.z + axis.z);
        
        this.object.position.set(point.x, point.y, point.z - 0.03);
        this.object.rotateX(this.inclinacao);
            
        this.nosLigados = {
            noA: ligacaoB.noligado,
            noB: ligacaoA.noligado
        }
    }

    public getParNos(): ParNos {
        return this.nosLigados;
    }

    public getComprimento(): number {
        return this.comprimento;
    }

    public getDesnivel(): number {
        return this.desnivel;
    }

    public getComprimentoPlano(): number {
        return this.comprimentoPlano;
    }
}