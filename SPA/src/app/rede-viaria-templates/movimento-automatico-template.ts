import * as THREE from "three"
import { No } from "./no-template";
import { Arco } from "./arco-template";

import { Ligacao } from "./ligacao-template";
import { ModeloCamiao } from "./camiao-template";
import { Mapa } from "./mapa-template";
import { Vector2, Vector3 } from "three";
import { elementAt } from "rxjs";

const  K_BERMA = 0.25;
const  K_ROTACAO = 0.10;
const multiplicador_velocidades = 5;

interface Movimento{
    movimento: string;
    fotogramas: number;
    vel_angular: number;
    vel_horizontal: number;
    vel_vertical: number;
}

export class MovimentoAutomatico {
    
    
    public camiao: ModeloCamiao;
    private mapa: Mapa;
    private rota: string[];

    private noAtual: number;

    private movimentoAtual: Movimento;

    private raio_rotacao: number;

    private inclinacao: number;

    private velocidades = [0.01, 0.005, 0.01, 0.02, 0.01, 0.005];
    



    //instancia o camiao no armazem de origem
    public constructor(mapa: Mapa, rota: string[], scene: THREE.Scene){  

        this.mapa = mapa;
        this.rota = rota;
        this.inclinacao = 0;

        
        this.setVelocidade();

        this.noAtual = 0;
        const no: No = this.mapa.mapNos[this.rota[this.noAtual]];

        this.raio_rotacao =  no.getRadius * K_ROTACAO;

        const berma = no.getRadius - no.getRadius * K_BERMA;

        const posicaoInicial: Vector3 = no.getPosition;

        this.camiao = new ModeloCamiao();
        

        this.camiao.iniciar_posicao(posicaoInicial, no.armazem.getOrientacao, berma);
        this.movimentoAtual = this.preparar_movimento_A();
        
    }

    private setVelocidade(){
        for(let i = 0; i < this.velocidades.length; i++)
            this.velocidades[i] *= multiplicador_velocidades;
    }

    
    //anima o camiao segundo as regras postas na variavel movimentoatual
    //quando os fotogramas se esgotarem chama a construção das peoximas regras de movimento
    public animate(): void{
        if(this.movimentoAtual.fotogramas > 0){
            this.camiao.posicionar(this.movimentoAtual.vel_horizontal, this.movimentoAtual.vel_vertical, this.movimentoAtual.vel_angular)
            this.movimentoAtual.fotogramas--;
            if(this.movimentoAtual.fotogramas == 0)
                this.preparar_next()
        }
    }

    //metodo responsavel por atualizar os parametros de movimento
    // Nota quando this.notual for igual ao nomero de nos na variavel rotas
    // o metodo this.preparar_movimento_A() muda o movimento para z acabando
    private preparar_next(){
        switch(this.movimentoAtual.movimento){
            case "a": this.movimentoAtual = this.preparar_movimento_B();
                break;

            case "b": this.movimentoAtual = this.preparar_movimento_C();
                break;

            case "c": this.movimentoAtual = this.preparar_movimento_D();
                break;

            case "d": this.movimentoAtual = this.preparar_movimento_E();
                break;

            case "e": this.movimentoAtual = this.preparar_movimento_F();
                break;

            case "f": 

                this.noAtual++;

                if(this.noAtual == this.rota.length - 1)
                    this.movimentoAtual = this.preparar_movimento_Z();
                else
                    this.movimentoAtual = this.preparar_movimento_A();

            break;

            case "z": 
                console.log("acabou");
                this.camiao.object.removeFromParent();
                break;

            default: 
                break;
        }
    }

    //prepara o movimento A seguindo as regras do tutorial
    private preparar_movimento_A(): Movimento{

        

        const no_currente: No = this.mapa.mapNos[this.rota[this.noAtual]];
        const no_destino: No = this.mapa.mapNos[this.rota[this.noAtual + 1]];

        const berma = no_currente.getRadius - no_currente.getRadius * K_BERMA;

        let angulo_movimento = 0;

        if(this.noAtual == 0){
            let ligacao = no_currente.getLigacao(no_destino);

            angulo_movimento = ligacao.getOrientacao - no_currente.armazem.getOrientacao + this.calcularAnguloDeRotacao(no_currente, ligacao) - Math.PI/2;
        } else {

            const no_passado: No = this.mapa.mapNos[this.rota[this.noAtual - 1]];

            let ligacao_seguinte = no_currente.getLigacao(no_destino);
            let ligacao_passada = no_passado.getLigacao(no_currente);

            angulo_movimento = ligacao_seguinte.getOrientacao - ligacao_passada.getOrientacao + this.calcularAnguloDeRotacao(no_currente, ligacao_seguinte) + this.calcularAnguloDeRotacao(no_currente, ligacao_passada);
        }

        if(angulo_movimento < 0 )
            angulo_movimento += 2*Math.PI;
        else if(angulo_movimento > 2*Math.PI)
            angulo_movimento -= 2*Math.PI;

        let comprimentoArco = berma * angulo_movimento; 

        let movimento:Movimento = {
            movimento: "a",
            fotogramas:  Math.ceil(comprimentoArco/this.velocidades[0]),
            vel_angular: angulo_movimento/ Math.ceil(comprimentoArco/this.velocidades[0]),
            vel_horizontal: 2 * berma * Math.sin((angulo_movimento/ Math.ceil(comprimentoArco/this.velocidades[0]))/2),
            vel_vertical: 0
        };

        return movimento;
    }

    //prepara o movimento B seguindo as regras do tutorial
    private preparar_movimento_B(): Movimento{

        const no_currente: No = this.mapa.mapNos[this.rota[this.noAtual]];
        const no_destino: No = this.mapa.mapNos[this.rota[this.noAtual + 1]];
        let ligacao = no_currente.getLigacao(no_destino);

        let angulo_movimento =  this.calcularAnguloDeRotacao(no_currente, ligacao);

        if(angulo_movimento < 0 )
            angulo_movimento += 2*Math.PI;
        else if(angulo_movimento > 2*Math.PI)
            angulo_movimento -= 2*Math.PI;

        let comprimentoArco = this.raio_rotacao * angulo_movimento; 

        let movimento:Movimento = {
            movimento: "b",
            fotogramas: Math.ceil(comprimentoArco/this.velocidades[1]),
            vel_angular: -angulo_movimento/Math.ceil(comprimentoArco/this.velocidades[1]),
            vel_horizontal: 2 * this.raio_rotacao * Math.sin((angulo_movimento/Math.ceil(comprimentoArco/this.velocidades[1]))/2),
            vel_vertical: 0
        };
        
        return movimento;
    }

    //prepara o movimento C seguindo as regras do tutorial
    private preparar_movimento_C(): Movimento{

        const no_currente: No = this.mapa.mapNos[this.rota[this.noAtual]];
        const no_destino: No = this.mapa.mapNos[this.rota[this.noAtual + 1]];
        let ligacao = no_currente.getLigacao(no_destino);

        let catLong =  this.calcularCatetoLongitudinal(no_currente, ligacao);

        let comprimentoPercurso = ligacao.getComprimento - catLong; 

        let movimento:Movimento = {
            movimento: "c",
            fotogramas: Math.ceil(comprimentoPercurso/this.velocidades[2]),
            vel_angular: 0,
            vel_horizontal: comprimentoPercurso/Math.ceil(comprimentoPercurso/this.velocidades[2]),
            vel_vertical: 0
        };
        
        return movimento;
    }

    //prepara o movimento D seguindo as regras do tutorial
    private preparar_movimento_D(): Movimento{

        const no_currente: No = this.mapa.mapNos[this.rota[this.noAtual]];
        const no_destino: No = this.mapa.mapNos[this.rota[this.noAtual + 1]];
        
        const ligacaoA = no_currente.getLigacao(no_destino); 
        const ligacaoB = no_destino.getLigacao(no_currente); 

        /*
        const comprimentoPlano = 
            Math.sqrt(Math.pow(ligacaoB.getInfinitesmo.x - ligacaoA.getInfinitesmo.x, 2) + (Math.pow(ligacaoB.getInfinitesmo.y - ligacaoA.getInfinitesmo.y,2))) - ligacaoA.getComprimento - ligacaoB.getComprimento;

        const comprimento = Math.sqrt(Math.pow(comprimentoPlano, 2) + Math.pow(desnivel, 2)); 
        */

        const rampa: Arco = no_currente.getRampa(no_destino);
        const desnivel = ligacaoB.getInfinitesmo.z - ligacaoA.getInfinitesmo.z;
       
        this.inclinacao = Math.atan(desnivel/ rampa.getComprimentoPlano()); 
        
        const comprimento = rampa.getComprimentoPlano();

        let movimento:Movimento = {
            movimento: "d",
            fotogramas: Math.ceil(comprimento/this.velocidades[3]),
            vel_angular: 0,
            vel_horizontal: comprimento/Math.ceil(comprimento/this.velocidades[3]),
            vel_vertical: desnivel / Math.ceil(comprimento/this.velocidades[3])
        };

        this.camiao.object.rotateY(- this.inclinacao);

        /* const material = new THREE.LineBasicMaterial({
            color: 0x00ff00
        });

        const points = [];
        points.push( this.camiao.object.position );
        points.push( new THREE.Vector3(  
                        this.camiao.object.position.x + movimento.vel_horizontal * Math.cos(this.camiao.orientacao) * movimento.fotogramas, 
                        this.camiao.object.position.y + movimento.vel_horizontal * Math.sin(this.camiao.orientacao) * movimento.fotogramas, 
                        this.camiao.object.position.z + movimento.vel_vertical * movimento.fotogramas) );

        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const line = new THREE.Line( geometry, material );
        this.scene.add( line ); */
        
        return movimento;
    }

    //prepara o movimento E seguindo as regras do tutorial
    private preparar_movimento_E(): Movimento{

        const no_currente: No = this.mapa.mapNos[this.rota[this.noAtual]];
        const no_destino: No = this.mapa.mapNos[this.rota[this.noAtual + 1]];

        let ligacao = no_destino.getLigacao(no_currente);

        let catLong =  this.calcularCatetoLongitudinal(no_destino, ligacao);

        let comprimentoPercurso = ligacao.getComprimento - catLong; 

        let movimento:Movimento = {
            movimento: "e",
            fotogramas: Math.ceil(comprimentoPercurso/this.velocidades[4]),
            vel_angular: 0,
            vel_horizontal: comprimentoPercurso/(Math.ceil(comprimentoPercurso/this.velocidades[4])),
            vel_vertical: 0
        };
        
        this.camiao.object.rotateY(this.inclinacao);

        return movimento;
    }

    //prepara o movimento F seguindo as regras do tutorial
    private preparar_movimento_F(): Movimento{

        const no_currente: No = this.mapa.mapNos[this.rota[this.noAtual]];
        const no_destino: No = this.mapa.mapNos[this.rota[this.noAtual + 1]];
        let ligacao = no_destino.getLigacao(no_currente);

        let angulo_movimento =  this.calcularAnguloDeRotacao(no_destino, ligacao);

        if(angulo_movimento < 0 )
            angulo_movimento += 2 * Math.PI;
        else if(angulo_movimento > 2 * Math.PI)
            angulo_movimento -= 2 * Math.PI;

        let comprimentoArco = this.raio_rotacao * angulo_movimento; 

        let movimento:Movimento = {
            movimento: "f",
            fotogramas: Math.ceil(comprimentoArco/this.velocidades[5]),
            vel_angular: -angulo_movimento/Math.ceil(comprimentoArco/this.velocidades[5]),
            vel_horizontal: 2 * this.raio_rotacao * Math.sin((angulo_movimento/Math.ceil(comprimentoArco/this.velocidades[5]))/2),
            vel_vertical: 0
        };
        
        return movimento;
    }

    

    private preparar_movimento_Z(): Movimento{


        const no_currente: No = this.mapa.mapNos[this.rota[this.noAtual]];
        const no_passado: No = this.mapa.mapNos[this.rota[this.noAtual - 1]];

        const berma = no_currente.getRadius - no_currente.getRadius * K_BERMA;

        let angulo_movimento = 0;
        
        let ligacao_passada = no_passado.getLigacao(no_currente);

        angulo_movimento = no_currente.armazem.getOrientacao - ligacao_passada.getOrientacao + this.calcularAnguloDeRotacao(no_currente, ligacao_passada) + Math.PI/2;

        if(angulo_movimento < 0 )
            angulo_movimento += 2*Math.PI;
        else if(angulo_movimento > 2*Math.PI)
            angulo_movimento -= 2*Math.PI;

        let comprimentoArco = berma * angulo_movimento; 

        let movimento:Movimento = {
            movimento: "z",
            fotogramas:  Math.ceil(comprimentoArco/this.velocidades[0]),
            vel_angular: angulo_movimento/ Math.ceil(comprimentoArco/this.velocidades[0]),
            vel_horizontal: 2 * berma * Math.sin((angulo_movimento/ Math.ceil(comprimentoArco/this.velocidades[0]))/2),
            vel_vertical: 0
        };

        return movimento;
    }

    //Metodo utilizado para calcular o angulo de rotação de entrada/saida para circulos
    private calcularAnguloDeRotacao (no: No, ligacao: Ligacao): number{
        const hip = no.getRadius - no.getRadius * K_BERMA + this.raio_rotacao;
        
        const cat = ligacao.getLargura/2 - no.getRadius * K_BERMA + this.raio_rotacao;

        return Math.acos(cat/hip);
    }

    //Metodo utilizado para calcular o cateto longitudinal de ligações
    private calcularCatetoLongitudinal (no: No, ligacao: Ligacao): number{
        const hip = no.getRadius - no.getRadius * K_BERMA + this.raio_rotacao;
        
        const cat = ligacao.getLargura/2 - no.getRadius * K_BERMA + this.raio_rotacao;

        return Math.sqrt(Math.pow(hip, 2) - Math.pow(cat, 2));
    }
}
