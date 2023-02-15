import config from "config";

describe('Listar enpacotamentos', () => {
 
  beforeEach(function(){
    
    cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
    cy.setCookie('role', 'Gestor de Armazens')

    cy.intercept('http://localhost:3000/api/Enpacotamentos/pagina?pag=0&num=10').as('enpacotamentos')
    cy.visit('http://localhost:4200/listar-enpacotamentos');
    cy.wait('@enpacotamentos')
  })

  it('Deve listar todos os enpacotamentos disponiveis', function(){
    cy.get('table').find('tr').its('length').should('be.gte', 1);
  })

  it('Deve listar apenas o enpacotamento escolhido por Entrega', () => {
    cy.get("#entrega").type("TEST");
    cy.get('table').find('tr').should('have.length', 2)
  })

  it('Deve listar apenas o enpacotamento escolhido por Matricula', () => {
    cy.get("#matricula").type("TS-00-TS");
    cy.get('table').find('tr').should('have.length', 2)
  })

  it('Não deve mostrar nenhuma fila com uma Matricula inválida', () => {
    cy.get("#matricula").type("10-10-10");
    cy.get('table').find('tr').should('have.length', 1)
  })

  it('Deve listar apenas 3 empacotamentos disponiveis', function(){
    cy.get('#num-por-pagina').select('3');
    cy.get('table').find('tr').should('have.length', 4);
  })

  it('Deve listar apenas 5 empacotamentos disponiveis', function(){
    cy.get('#num-por-pagina').select('5');
    cy.get('table').find('tr').should('have.length', 6);
  })

  it('Deve listar apenas 7 empacotamentos disponiveis', function(){
    cy.get('#num-por-pagina').select('7');
    cy.get('table').find('tr').should('have.length', 8);
  })

  it('Deve começar com o botão Anterior desativado', function() {
    cy.get('#prev-page').should('have.class', 'disabled');
  })

  it('Deve ativar o botão Anterior ao ir para a próxima página', function() {
    cy.get('#prev-page').should('have.class', 'disabled');
    cy.get('#prox-page').click();
    cy.get('#prev-page').should('not.have.class', 'disabled');
  })

  it('Deve desativar o botão Anterior ao voltar para a primeira página', function() {
    cy.get('#prev-page').should('have.class', 'disabled');
    cy.get('#prox-page').click();
    cy.get('#prev-page').should('not.have.class', 'disabled');
    cy.get('#prev-page').click();
    cy.get('#prev-page').should('have.class', 'disabled');
  })
})