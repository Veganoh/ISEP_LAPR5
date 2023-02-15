import * as THREE from "three"
import { Mapa } from "./mapa-template";
import { ModeloCamiao } from "./camiao-template";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 
import GUI from "lil-gui";
import { Location } from '@angular/common'
import { MovimentoAutomatico } from "./movimento-automatico-template";
import { Viagem1, Viagem2 } from "src/assets/Info";
import { Luzes } from "./luz-template";
import { ListarArmazensServico } from "../servicos/listar-armazens.service";
import { ArmazemDTO } from "../interfaces/armazemDto";

export class RedeViaria {
  
    
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private mapa!: Mapa;
    private luz !: Luzes;
    private movimento1!: MovimentoAutomatico;
    private movimento2!: MovimentoAutomatico;
    private loaded: boolean = false;

    private controls! : OrbitControls;



    //Metodo responsavel por criar as peças da simulação
    public constructor(lastLocation: Location, service: ListarArmazensServico){  
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xF4F6FA );

        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
        this.renderer.setSize(window.innerWidth, window.innerHeight); 
        this.renderer.domElement.style.background = "black";
        this.renderer.domElement.style.width = "100%"
        this.renderer.domElement.style.height = "100%"
        this.renderer.domElement.style.overflow = "hidden"
        this.renderer.domElement.style.position = "absolute"
        this.renderer.domElement.style.top = "0"
        this.renderer.domElement.style.left = "0"
        this.renderer.domElement.style.zIndex = "10"
        
        document.body.appendChild( this.renderer.domElement );

        service.obterArmazens().subscribe((arm) => {
          this.mapa = new Mapa(this.prepararDados(arm));

          this.scene.add( this.mapa.mapa );

          
          this.movimento1 = new MovimentoAutomatico(this.mapa, Viagem1, this.scene);
          this.scene.add( this.movimento1.camiao.object );

          this.movimento2 = new MovimentoAutomatico(this.mapa, Viagem2, this.scene);
          this.scene.add( this.movimento2.camiao.object );

          this.controls = new OrbitControls( this.camera, this.renderer.domElement );
          this.controls.zoomSpeed = 2;

          this.camera.position.z = 110;
          this.camera.position.y = -15;
        
          var gui = new GUI();
          var rend = this.renderer;

          // Música Ambiente
          var listener = new THREE.AudioListener();
          this.camera.add(listener);
          const sound = new THREE.Audio( listener );
          const audioLoader = new THREE.AudioLoader();
          audioLoader.load( './assets/sounds/ambient.ogg', function( buffer ) {
                sound.setBuffer( buffer );
                sound.setLoop( true );
                sound.setVolume( 0.05 );
                sound.play();
          });

          this.luz = new Luzes(gui,this.scene);

          var listenerSol = new THREE.AudioListener();
          const soundSol = new THREE.PositionalAudio( listenerSol );
          const audioLoaderSol = new THREE.AudioLoader();
          audioLoaderSol.load( './assets/sounds/sun.ogg', function( buffer ) {
            soundSol.setBuffer( buffer );
            soundSol.setRefDistance( 1 );
            soundSol.play();
          });

          this.luz.sol.add(soundSol)

          const colorFog = 0xFFFFFF;
          const near = 0.1;
          const far = 2000;

          var fog = new THREE.Fog(colorFog,near,far);
          this.scene.fog = fog;

          
          var obj = {
            add: function() {
              sound.stop();
              soundSol.stop();
              gui.destroy();
              document.body.removeChild( rend.domElement );
              lastLocation.back();
            },
            byeFog: function(){
              fog.near = 0.1;
              fog.far = 2000;
            },
            hiFog: function(){
              fog.near = 10;
              fog.far = 100;
            }
          };

          var folderMusica = gui.addFolder( ' Música ');
          var folderAmbiente = folderMusica.addFolder(' Ambiente ');
          var folderSol = folderMusica.addFolder(' Sol ');
          var folderFog = gui.addFolder(' Fog ');


          folderFog.add(obj, 'hiFog').name('Ligar');  
          folderFog.add(obj, 'byeFog').name('Desligar');          
          gui.add(this.mapa, "hideLabels").name("Esconder Nomes");
          folderAmbiente.add(sound, "play").name("Ligar música");
          folderAmbiente.add(sound, "pause").name("Desligar música");
          folderSol.add(soundSol, "play").name("Ligar música");
          folderSol.add(soundSol, "pause").name("Desligar música");
          gui.add(obj, "add").name("Voltar à página anterior");

          this.loaded = true;
        });

        
    }

    private criarRede(){}


    public prepararDados(armazens: ArmazemDTO[]): any{
      let dados: any = [];

      armazens.forEach(element => {
          dados.push({
          ID:element.identificador,
          Nome:element.designacao,
          X:(100/0.5162)*(element.longitude - 8.2451) - 50,
          Y:(100/1.2728)*(element.latitude - 40.8387) - 50,
          Z:(50/800)*(element.altitude),
        })
      });

      return dados;
    }

    public animate(){

      if(!this.loaded)
        return;

      this.movimento1.animate();
      this.movimento2.animate();

      this.camera.aspect = window.innerWidth/window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight); 
      this.controls.update();
      this.renderer.render( this.scene, this.camera );
    }


  
}
