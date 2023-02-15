import { Component, OnInit } from '@angular/core';
import * as THREE from "three";
import { RedeViaria } from '../rede-viaria-templates/rede-viaria-template';
import { Location } from '@angular/common'
import { ListarArmazensServico } from '../servicos/listar-armazens.service';

@Component({
  selector: 'app-rede-viaria',
  templateUrl: './rede-viaria.component.html',
  styleUrls: ['./rede-viaria.component.css'],
  providers: [ListarArmazensServico]
})
export class RedeViariaComponent implements OnInit {

  constructor(private location: Location, private service: ListarArmazensServico) { }

  //Metodo incial responsavel por criar a rede viaria e pedir a animação de todos os frames.
  ngOnInit(): void {
    var redeViaria: RedeViaria = new RedeViaria(this.location, this.service);

    function animate() {
      requestAnimationFrame(animate);
      redeViaria.animate();
    }

    animate();
  }


}
