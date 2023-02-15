import * as THREE from "three"
import GUI from "lil-gui";

export class Luzes {

    /**
     * A scena que está a ser utilizada
     */
    private scene : THREE.Scene;

    /**
     * A luz direcional
     */
    private luzDirecional: THREE.DirectionalLight = new THREE.DirectionalLight;

    public sol : THREE.Mesh = new THREE.Mesh;


    /**
     * Folders para a organização da GUI
     */
    private folder;
    private folderLuzAmbiente;
    private folderLuzDirecional;
    private folderHelpers;

    /**
     * Coordenadas da posição da luz direcional
     */
    private lightPositionX: number = 70;
    private lightPositionY: number = 50; 
    private lightPositionZ: number = 70;

     /**
     * Coordenadas para onde a luz direcional aponta
     */
    private targetPositionX: number = -1;
    private targetPositionY: number = -22; 
    private targetPositionZ: number = 50;



    public constructor(gui : GUI , scene: THREE.Scene){  
        this.scene = scene;
        this.folder = gui.addFolder( ' Luzes ');
        this.folderLuzAmbiente = this.folder.addFolder('Ambiente');
        this.folderLuzDirecional = this.folder.addFolder('Direcional');
        this.folderHelpers = this.folder.addFolder('Helpers');

        this.setLuzAmbiente();
        this.setLuzDirecional();
        this.criarHelpers();
        this.criarSol();
    }   

    /**
     * Criar a luz ambiente
     */
    private setLuzAmbiente(){

        const cor = 0xFFFFFF;
        const intensidade = 1;

        const light = new THREE.AmbientLight(
            cor,intensidade
        );

        this.scene.add(light);

        // Apenas para dar toogle on/off à luz ambiente
        var obj = {
            switchLuz: function(){
                light.visible = ! light.visible;
            },
        }

        this.folderLuzAmbiente.addColor(new ColorGUIHelper(light, 'color'), 'value').name('Cor'); // Para escolher a cor
        this.folderLuzAmbiente.add(light, 'intensity', 0, 1, 0.1).name('Intensidade');            // Para escolher a intensidade
        this.folderLuzAmbiente.add(obj, "switchLuz").name('Luz Ambiente');                        // Para desligar a luz ambiente
    }

    /**
     * Criar a luz direcional
     */
    private setLuzDirecional(){
        
        const color = 0xfFAA0f ;
        const intensity = 1;

        const light = new THREE.DirectionalLight(color, intensity);

        light.position.set(this.lightPositionX,this.lightPositionY,this.lightPositionZ);
        light.castShadow = true;

        light.shadow.camera.top = 50;
        light.shadow.camera.right = 60;
        light.shadow.camera.bottom = -80;
        light.shadow.camera.left = -50;
        light.shadow.mapSize.x = 2000;
        light.shadow.mapSize.y = 2000;

        light.target.position.set(this.targetPositionX, this.targetPositionY , this.targetPositionZ);
        light.target.updateMatrixWorld();

        var obj = {
            switchLuz: function(){
                light.visible = ! light.visible;
            },
        }

        this.folderLuzDirecional.addColor(new ColorGUIHelper(light, 'color'), 'value').name('Cor');     // Para mudar a cor da luz direcional
        this.folderLuzDirecional.add(light, 'intensity', 0, 1, 0.1).name('Intensidade');                // Para mudar a intensidade da luz direcional
        this.folderLuzDirecional.add(obj, "switchLuz").name('Luz Direcional');                          // Para desligara luz direcional
        this.luzDirecional = light;
        this.scene.add(light);
        this.scene.add(light.target);
    }

    /**
     * Cria os helpers para ajudar a ver de onde vem a luz e como funciona as sombras
     */
    private criarHelpers(){
        var helperLuz = new THREE.DirectionalLightHelper(this.luzDirecional);
        helperLuz.update();

        var helperSombra = new THREE.CameraHelper(this.luzDirecional.shadow.camera);
        
        helperLuz.visible = false;
        helperSombra.visible = false;

        this.scene.add( helperLuz );
        this.scene.add( helperSombra );

        var obj = {
            switchHelperLuz: function(){
                helperLuz.visible = ! helperLuz.visible;
            },

            switchHelperSombra: function(){
                helperSombra.visible = ! helperSombra.visible;
            }
        }

        this.folderHelpers.add(obj, "switchHelperLuz").name('Helper Luz');
        this.folderHelpers.add(obj, "switchHelperSombra").name('Helper Sombra');
    }

    /**
     * Criar o sol para simular de onde vem a luz direcional
     */
    private criarSol(){
        const texture = new THREE.TextureLoader().load("./assets/textures/sun.png"); 
        const geometry = new THREE.SphereGeometry( 5, 32, 32 );
        const material = new THREE.MeshBasicMaterial({ map : texture});
        this.sol = new THREE.Mesh( geometry, material );

        this.scene.add(this.sol);
    
        this.sol.position.set(this.lightPositionX,this.lightPositionY,this.lightPositionZ);
    }
}

class ColorGUIHelper {
    private object;
    private prop;

    constructor(object: any, prop: any) {
      this.object = object;
      this.prop = prop;
    }
    get value() {
      return `#${this.object[this.prop].getHexString()}`;
    }
    set value(hexString) {
      this.object[this.prop].set(hexString);
    }
}

