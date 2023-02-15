describe('Listar Percursos', () => {
 


  beforeEach(function(){
    
    cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
    cy.setCookie('role', 'Gestor de Armazens')
    
    cy.visit('http://localhost:4200/listar-percursos');
  })

  it('Deve listar todos os percuros disponiveis', function(){
    cy.get('table').find('tr').its('length').should('be.gte', 1);
  })

  it('Deve listar apenas o percurso escolhido por armazens', () => {
    cy.get("#armazem-origem").type("001");
    cy.get("#armazem-destino").type("Tes");
    cy.get('table').find('tr').should('have.length', 2)
  })

  it('Deve listar apenas 10 percuros disponiveis', function(){
    cy.get('#num-por-pagina').select('10');
    cy.get('table').find('tr').should('have.length', 11);
  })

  it('Deve listar apenas 15 percuros disponiveis', function(){
    cy.get('#num-por-pagina').select('15');
    cy.get('table').find('tr').should('have.length', 16);
  })

  it('Deve listar apenas 20 percuros disponiveis', function(){
    cy.get('#num-por-pagina').select('20');
    cy.get('table').find('tr').should('have.length', 21);
  })
  
  it('Deve listar apenas 25 percuros disponiveis', function(){
    cy.get('#num-por-pagina').select('25');
    cy.get('table').find('tr').should('have.length', 26);
  })

  it('Deve listar apenas 30 percuros disponiveis', function(){
    cy.get('#num-por-pagina').select('30');
    cy.get('table').find('tr').should('have.length', 31);
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