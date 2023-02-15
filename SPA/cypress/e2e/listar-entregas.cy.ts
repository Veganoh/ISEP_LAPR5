import config from "config";

describe('listar Entrega  (necessita chamar o teste de criação de entrega previamente)', () => {

    beforeEach(() => {
      
      cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
      cy.setCookie('role', 'Gestor de Armazens')

      cy.intercept('https://localhost:5001/api/Entregas').as('entregas')
      cy.visit('http://localhost:4200/listar-entregas');
      cy.wait('@entregas')
    })
  
    it('Deve listar todas as entregas disponiveis', () => {
      cy.get('table').find('tr').its('length').should('be.gte', 1);
    })
  
    it('Deve listar so a entrega escolhida por ID do armazem', () => {
      cy.get("#identificador").select("Tes");
      cy.get('table').find('tr').should('have.length', 2)
    })

    it('Deve listar a entrega', () => {
      cy.get("#dateInicio").type("2022-12-10");
      cy.get("#dateFim").type("2022-12-10");
      cy.get("#sort").select("Peso");
      cy.get('table').find('tr').should('have.length',2)
    })
  
    it('Deve listar so a entrega escolhida por datas', () => {
      cy.get("#dateInicio").type("2022-12-10");
      cy.get("#dateFim").type("2022-12-10");
      cy.get('table').find('tr').should('have.length', 2)
    })
  })