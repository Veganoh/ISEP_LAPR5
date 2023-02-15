import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { faIndustry } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import { faRoad } from '@fortawesome/free-solid-svg-icons'
import { faBox } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faBolt } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { getCookie } from 'config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  utilizador = '';

  role: string = '';

  roles = {
    armazens: 'Gestor de Armazens',
    logistica: 'Gestor de Logistica',
    admin: 'Administrador'
  }

  faBolt = faBolt;
  faTruck = faTruck;
  faWarehouse = faIndustry;
  faMap = faMap;
  faCompass = faCompass;
  faRoad = faRoad;
  faBox = faBox;
  faEnvelope = faEnvelope;
  faUser = faUser;
  faPlus = faPlus;
  faSearch = faSearch;
  faMinus = faMinus;

  constructor( private router: Router ) {}

  ngOnInit(): void{
    if ( getCookie( 'jwtToken' ) === null)
      this.router.navigate(['/login']);

    this.utilizador = `${getCookie( 'nome' )!} ${getCookie( 'apelido' )!}`;

    this.role = getCookie( 'role' )!;

    console.log(this.role);
  }

  mudarUtilizador() {
    switch ( this.role ) {
      case this.roles.armazens: 
        this.role = this.roles.logistica;
        break;
      case this.roles.logistica: 
        this.role = this.roles.admin;
        break;
      case this.roles.admin: 
        this.role = this.roles.armazens;
        break;
    }
  }
}
