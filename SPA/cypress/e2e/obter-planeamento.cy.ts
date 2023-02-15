describe('Obter Planeamento', () => {

    beforeEach(() => {
      
      cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
      cy.setCookie('role', 'Gestor de Armazens')

      cy.intercept('http://localhost:4200/api/planeamento').as('planeamento')
      cy.visit('http://localhost:4200/obter-planeamento');
    })
  
    it('Deve conseguir criar um planemento', () => {
      cy.get("#camiao").type("CA-10-10");
      cy.get("#data").type("2022/12/05");
      cy.get("#algoritmo").type("2");

  
      cy.get("button").click();
      cy.wait('@planeamento');
  
      cy.get('table').find('tr').its('length').should('be.gte', 8);
    })
  
    it('Deve avisar um erro ao introduzir um camiao invalido', () => {
        cy.get("#camiao").type("TEST");
        cy.get("#camiao").blur();
        cy.get(".error").should("have.text", "O camião não existe ");
      })

    it('Deve avisar um erro ao introduzir uma data invalida', () => {
        cy.get("#data").type('{backspace}');
        cy.get("#data").blur();
        cy.get(".error").should("have.text", "Data deve seguir o formato YYYY/MM/DD ");
      })

      it('Deve avisar um erro ao introduzir um algoritmo invalido', () => {
        cy.get("#algoritmo").type('{backspace}');
        cy.get("#algoritmo").blur();
        cy.get(".error").should("have.text", "Deve escolher algoritmo existente ");
      })
  })
  