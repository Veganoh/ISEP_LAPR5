import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarArmazensComponent } from './criar-armazens/criar-armazens.component';
import { ListarArmazensComponent } from './listar-armazens/listar-armazens.component';
import { CriarEntregasComponent } from './criar-entregas/criar-entregas.component';
import { ListarEntregasComponent } from './listar-entregas/listar-entregas.component';
import { RedeViariaComponent } from './rede-viaria/rede-viaria.component';
import { CriarCamioesComponent } from './criar-camioes/criar-camioes.component';
import { ListarCamioesComponent } from './listar-camioes/listar-camioes.component';
import { CriarEnpacotamentosComponent } from './criar-enpacotamentos/criar-enpacotamentos.component';
import { ListarEnpacotamentosComponent } from './listar-enpacotamentos/listar-enpacotamentos.component';
import { ObterPlaneamentoComponent } from './obter-planeamento/obter-planeamento.component';
import { CriarPercursosComponent } from './criar-percursos/criar-percursos.component';
import { ListarPercursosComponent } from './listar-percursos/listar-percursos.component';
import { ListarViagensComponent } from './listar-viagens/listar-viagens.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CriarUserComponent } from './criar-user/criar-user.component';
import { LoginComponent } from './login/login.component';
import { AnonimizarUserComponent } from './anonimizar-user/anonimizar-user.component';

const routes: Routes = [
  {path: 'criar-armazens', component: CriarArmazensComponent},
  {path: 'listar-armazens', component: ListarArmazensComponent},
  {path: 'rede-viaria', component: RedeViariaComponent},
  {path: 'criar-entregas', component: CriarEntregasComponent},
  {path: 'listar-entregas', component: ListarEntregasComponent},
  {path: 'criar-camioes', component: CriarCamioesComponent},
  {path: 'criar-user', component: CriarUserComponent},
  {path: 'listar-camioes', component: ListarCamioesComponent},
  {path: 'criar-enpacotamentos', component: CriarEnpacotamentosComponent},
  {path: 'listar-enpacotamentos', component: ListarEnpacotamentosComponent},
  {path: 'criar-percursos', component: CriarPercursosComponent},
  {path: 'listar-percursos', component: ListarPercursosComponent},
  {path: 'obter-planeamento', component: ObterPlaneamentoComponent},
  {path: 'anonimizar-user', component: AnonimizarUserComponent},
  {path: 'listar-viagens', component: ListarViagensComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
