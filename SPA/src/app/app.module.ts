import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarEntregasComponent } from './criar-entregas/criar-entregas.component';
import { CriarCamioesComponent } from './criar-camioes/criar-camioes.component';
import { CriarArmazensComponent } from './criar-armazens/criar-armazens.component';
import { ListarArmazensComponent } from './listar-armazens/listar-armazens.component';
import { ListarEntregasComponent } from './listar-entregas/listar-entregas.component';
import { RedeViariaComponent } from './rede-viaria/rede-viaria.component';
import { ListarCamioesComponent } from './listar-camioes/listar-camioes.component';
import { CriarEnpacotamentosComponent } from './criar-enpacotamentos/criar-enpacotamentos.component';
import { ListarEnpacotamentosComponent } from './listar-enpacotamentos/listar-enpacotamentos.component';
import { ObterPlaneamentoComponent } from './obter-planeamento/obter-planeamento.component';
import { CriarPercursosComponent } from './criar-percursos/criar-percursos.component';
import { ListarPercursosComponent } from './listar-percursos/listar-percursos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CriarUserComponent } from './criar-user/criar-user.component';
import { ListarViagensComponent } from './listar-viagens/listar-viagens.component';
import { AnonimizarUserComponent } from './anonimizar-user/anonimizar-user.component';



@NgModule({
  declarations: [
    AppComponent,
    CriarEntregasComponent,
    CriarCamioesComponent,
    CriarArmazensComponent,
    ListarArmazensComponent,
    ListarEntregasComponent,
    RedeViariaComponent,
    ListarCamioesComponent,
    CriarEnpacotamentosComponent,
    ListarEnpacotamentosComponent,
    CriarPercursosComponent,
    ObterPlaneamentoComponent,
    ListarPercursosComponent,
    DashboardComponent,
    CriarUserComponent,
    ListarViagensComponent,
    AnonimizarUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
