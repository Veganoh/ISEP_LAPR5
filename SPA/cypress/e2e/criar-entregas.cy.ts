describe('Criar Entrega', () => {

    beforeEach(() => {
      
      cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
      cy.setCookie('role', 'Gestor de Armazens')

      cy.intercept('https://localhost:5001/api/Entregas').as('entregas')
      cy.visit('http://localhost:4200/criar-entregas');
    })
  
    it('Deve conseguir criar uma entrega', () => {
      //cy.get("#identificador").type("");
      cy.get("#data").type("10-12-2022");
      cy.get("#peso").type("10.12");
      cy.get("#arm_id").type("Tes");
      cy.get("#tempo_col").clear();
      cy.get("#tempo_col").type("2");
      cy.get("#tempo_ret").clear();
      cy.get("#tempo_ret").type("5");
  
      cy.get("button").click();
      cy.wait('@entregas');
      
      cy.get("h3").should("have.text", " Entrega Guardada ");
    })
  
    it('Deve avisar um erro ao introduzir a data', () => {
      cy.get("#data").type("12/10/2023");
      cy.get("#data").blur();
      cy.get(".error").should("have.text", " A data de uma entrega tem que ter o formato dd-mm-yyyy ");
    })

    it('Deve avisar um erro ao introduzir um peso invalido', () => {
        cy.get("#peso").clear();
        cy.get("#peso").type("0");
        cy.get("#peso").blur();
        cy.get(".error").should("have.text", " O peso de uma entrega tem que ser maior que 0 ");
      })

      it('Deve avisar um erro ao introduzir o id do armazem invalido', () => {
        cy.get("#arm_id").type("Tests");
        cy.get("#arm_id").blur();
        cy.get(".error").should("have.text", " O identificador de um Armazem tem de ter 3 caracteres alfanuméricos ");
      })
  
    it('Deve avisar um erro ao introduzir um tempo de colocação invalido', () => {
      cy.get("#tempo_col").clear();
      cy.get("#tempo_col").type("0");
      cy.get("#tempo_col").blur();
      cy.get(".error").should("have.text", " O tempo de colocação de uma entrega tem que ser maior que 0 ");
    })
  
    it('Deve avisar um erro ao introduzir um tempo de retirada invalido', () => {
      cy.get("#tempo_ret").clear();
      cy.get("#tempo_ret").type("-1");
      cy.get("#tempo_ret").blur();
      cy.get(".error").should("have.text", " O tempo de retirada de uma entrega tem que ser maior que 0 ");
    })
  
  })
  