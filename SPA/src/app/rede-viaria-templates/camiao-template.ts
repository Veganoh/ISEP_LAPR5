import * as THREE from "three"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Vector2, Vector3 } from "three";
import { No } from "./no-template";
import { Ligacao } from "./ligacao-template";

const K_ARMAZEM = 2.5;
const K_OFFSET_Z = -0.03;
const COR_LIGACAO = '#797979';
const LARGURA = 1.5;
const ROT_OFFSET = Math.PI/2;

export class ModeloCamiao{
    public object: THREE.Group = new THREE.Group;

    private distancia: number = 0;
    public orientacao: number = 0;
    public size: THREE.Vector3 = new THREE.Vector3();

    //public helper: THREE.Box3Helper | undefined;

    public constructor(){
        var loader = new FBXLoader();

        loader.load('./assets/models/LowPolyTruck.fbx', (object) => { 
            object.scale.multiplyScalar(0.001);
            object.rotateX(Math.PI/2);
            object.traverse( function(model){
                if(model.isObject3D){
                    model.castShadow = true;
                    model.receiveShadow = true
                }
            })
            const box = new THREE.Box3();
            box.setFromObject(object);
            box.getSize(this.size);

            // this.helper = new THREE.Box3Helper( box, new THREE.Color(0xffff00) );
            // this.object.add(this.helper);
            
            this.posicionarCamiao(object);
        }); 
    }

    private posicionarCamiao(object: THREE.Group) {
        object.translateX(this.size.x / 2.0 - 0.10);         
        var middleObject = new THREE.Group();

        middleObject.add(object);
        //middleObject.rotateZ(Math.PI);

        this.object.add(middleObject);
    }

    

    public iniciar_posicao(position: Vector3, rotacao: number, berma: number) {
        
        this.orientacao = rotacao + Math.PI/2;

        position.add(
            new Vector3(Math.cos(rotacao) * berma, 
            Math.sin(rotacao) * berma, 
            0)
        );

        this.object.position.set(position.x,position.y,position.z);
        this.object.rotateZ(this.orientacao);
    }

    public posicionar(vel_horizontal: number, vel_vertical: number, vel_angular: number) {
        this.orientacao += vel_angular;

        if(this.orientacao > 2*Math.PI)
            this.orientacao -= 2*Math.PI

        this.object.rotateZ(vel_angular);
        this.object.position.add(new Vector3(vel_horizontal * Math.cos(this.orientacao), vel_horizontal * Math.sin(this.orientacao), vel_vertical));
    }
}