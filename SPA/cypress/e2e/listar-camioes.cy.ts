import config from "config";

describe('listar Camiao  (necessita chamar o teste de criação de camiao previamente)', () => {

    beforeEach(() => {
      
      cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
      cy.setCookie('role', 'Gestor de Armazens')

      cy.intercept('http://localhost:3000/api/camiao').as('camioes')
      cy.visit('http://localhost:4200/listar-camioes');
      cy.wait('@camioes')
    })
  
    it('Deve listar todos os armazens disponiveis', () => {
      cy.get('table').find('tr').its('length').should('be.gte', 1);
    })
  
    it('Deve listar so o camiao escolhido por ID', () => {
      cy.get("#identificador").type("CA-10-10");
      cy.get('table').find('tr').should('have.length', 2)
    })
  
    it('Não deve mostrar nenhuma fila com um ID invalido', () => {
      cy.get("#identificador").type("00-00-00");
      cy.get('table').find('tr').should('have.length', 1)
    })

  })