import * as THREE from "three"
import { No } from "./no-template";
import { Arco } from "./arco-template";

import { ArmazensData, LigacoesData } from "src/assets/Info";
import { Ligacao } from "./ligacao-template";

//Template do Mapa, isto encompassa os nos e os arcos
export class Mapa {

    //objeto principal responsavel pelas vias e pelos nós
    public mapa: THREE.Mesh = new THREE.Mesh;

    //lista de todos nós
    public mapNos: Record<string, No> = {};

    public listaArcos: Arco [] = [];

    private hiddenLabels = false;

    public constructor(armazemData: any){  
        armazemData.forEach((element: any) => {
          var no = new No(element);
        
          this.mapa.add( no.label );
          
          this.mapNos[no.getId] = no;
        });

        let listaligacao: Ligacao [] = [];

        LigacoesData.forEach ( ligacao => {
          const noA = this.mapNos[ligacao.ArmazemOrig];
          const noB = this.mapNos[ligacao.ArmazemDest];
          const ligacaoA = noA.adicionar_ligacao(noA, noB, ligacao.Largura);
          const ligacaoB = noB.adicionar_ligacao(noB, noA, ligacao.Largura);

          listaligacao.push(ligacaoA);
          listaligacao.push(ligacaoB);

          const arco = new Arco(ligacaoA, ligacaoB);

          this.listaArcos.push(arco);
          noA.adicionar_rampa(arco);
          noB.adicionar_rampa(arco);
        });
        
        Object.entries(this.mapNos).forEach( ([_, no]) => {
          this.mapa.add( no.object );

          no.listaLigacoes.forEach ( ligacao => {
            this.mapa.add( ligacao.object );
          });

          no.modelarArmazem();
        });

        this.listaArcos.forEach ( arco => {
          this.mapa.add( arco.object );
        });

        
    }

    public hideLabels() {
      this.hiddenLabels = !this.hiddenLabels;
      
      Object.entries(this.mapNos).forEach( ([_, no]) => {
        no.hideLabel(this.hiddenLabels);
      });
    }
}
