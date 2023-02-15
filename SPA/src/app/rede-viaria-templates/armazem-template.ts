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

export class ModeloArmazem {
    // Objeto da Ligação
    public object: THREE.Group = new THREE.Group;
    public loaded: boolean = false;

    private distancia: number = 0;
    private orientacao: number = 0;
    private size: THREE.Vector3 = new THREE.Vector3();

    public get getOrientacao(): number{
        return this.orientacao;
    }

    public get getDistancia(): number{
        return this.distancia;
    }

    public constructor(listaLigacoes: Ligacao[], radius: number) {
  
        

        var loader = new FBXLoader();
        this.distancia = radius + K_ARMAZEM;
        this.orientacao = this.calcularOrientacao(listaLigacoes);
 
        loader.load('./assets/models/Armazem.fbx', (object) => { 
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


    
          
            box.getSize(this.size)

            this.posicionarArmazem(object);
            this.criarPlataforma();
            this.criarBaseArmazem();
        }); 
    }

    
    private criarBaseArmazem(){
        const texture = new THREE.TextureLoader().load("./assets/textures/floor.png"); 
        const geometry = new THREE.PlaneGeometry( 5, 5, 5, 5 );
        const material = new THREE.MeshStandardMaterial({ map : texture});
        const base = new THREE.Mesh( geometry, material );
        geometry.translate(0.0, this.distancia * 1.35, K_OFFSET_Z);
        base.receiveShadow = true;
        base.rotateZ(this.orientacao - ROT_OFFSET);

        this.object.add(base);
    }

    private criarPlataforma(){
        const geometry = new THREE.PlaneGeometry(LARGURA, this.distancia - this.size.x/2);

        const texture = new THREE.TextureLoader().load("./assets/textures/road.png"); 
        const material = new THREE.MeshStandardMaterial( { map:texture, side: THREE.DoubleSide });
        
        

        geometry.translate(0.0, this.distancia/2, K_OFFSET_Z);

        var object = new THREE.Mesh( geometry, material );
        object.rotateZ(this.orientacao - ROT_OFFSET);

        this.object.add(object);
    }


    private posicionarArmazem(object: THREE.Group) {
        object.position.set(this.size.x/2, this.size.z/2, 0); 
        var middleObject = new THREE.Group();
        object.castShadow = true;
        object.receiveShadow = true;

        middleObject.add(object);
        middleObject.rotateZ(this.orientacao + Math.PI/2);

        const x = (this.distancia)*Math.cos(this.orientacao);
        const y = (this.distancia)*Math.sin(this.orientacao);
        middleObject.position.set(x, y, 0);

        this.object.add(middleObject);
    }

    private calcularOrientacao(listaLigacoes: Ligacao[]): number{

        if(listaLigacoes.length == 1)
            return listaLigacoes[0].getOrientacao + Math.PI;

        if(listaLigacoes.length >= 1){
            const orientacaoReferencia = 2*Math.PI/listaLigacoes.length;

            var listaOrientacoes: number[] = [];

            listaLigacoes.forEach(element => {
                listaOrientacoes.push(element.getOrientacao);
            });

            var sortedOrientacoes: number[] = listaOrientacoes.sort((n1,n2) => n1 - n2);

            for(let i = 0; i < sortedOrientacoes.length; i++){
                if(i == sortedOrientacoes.length - 1)
                    return (sortedOrientacoes[i] - sortedOrientacoes[0]) / 2 + Math.PI + sortedOrientacoes[0];

                if(sortedOrientacoes[i+1] - sortedOrientacoes[i] >= orientacaoReferencia)
                    return (sortedOrientacoes[i+1] - sortedOrientacoes[i]) / 2 + sortedOrientacoes[i];
            }    
        }

        return 0;
    }
}