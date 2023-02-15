
describe('Criar Camiao', () => {

    beforeEach(() => {
      cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
      cy.setCookie('role', 'Gestor de Armazens')
      
      cy.intercept('http://localhost:3000/api/camiao').as('camioes')
      cy.visit('http://localhost:4200/criar-camioes');
    })
  
    it('Deve conseguir criar um camiao', () => {
      cy.get("#I").type("AA-99-99");
      cy.get("#tara").type("10");
      cy.get("#capacidadeCargaTotal").type("10");
      cy.get("#camiaoBateria").type("10");
      cy.get("#autonomiaCamiao").type("10");
      cy.get("#carregamentoLento").type("10");
      cy.get("#carregamentoRapido").type("10");

  
      cy.get("button").click();
      cy.wait('@camioes');
  
      cy.get("h3").should("have.text", "Camião Guardado");
    })
  
    it('Deve avisar um erro ao introduzir um id invalido', () => {
      cy.get("#I").type("Test");
      cy.get("#I").blur();
      cy.get(".error").should("have.text", "O id não respeita os modelos apresentados ");
    })
  
    it('Deve avisar um erro ao introduzir uma tara invalida', () => {
      cy.get("#tara").type("-1");
      cy.get("#tara").blur();
      cy.get(".error").should("have.text", "A tara de um camião não pode ser nula ou negativa ");
    })
  
    it('Deve avisar um erro ao introduzir uma capacidade invalida', () => {
      cy.get("#capacidadeCargaTotal").type("-1");
      cy.get("#capacidadeCargaTotal").blur();
      cy.get(".error").should("have.text", "A capacidade de carga total de um camião não pode ser nula ou negativa ");
    })
  
    it('Deve avisar um erro ao introduzir uma capacidade invalida', () => {
        cy.get("#camiaoBateria").type("-1");
        cy.get("#camiaoBateria").blur();
        cy.get(".error").should("have.text", "A bateria de um camião não pode ser nula ou negativa ");
      })
  
      it('Deve avisar um erro ao introduzir uma autonomia invalida', () => {
        cy.get("#autonomiaCamiao").type("-1");
        cy.get("#autonomiaCamiao").blur();
        cy.get(".error").should("have.text", "A autonomia de um camião não pode ser nula ou negativa ");
      })
  
      it('Deve avisar um erro ao introduzir um carregamento lento invalido', () => {
        cy.get("#carregamentoLento").type("-1");
        cy.get("#carregamentoLento").blur();
        cy.get(".error").should("have.text", "O carregamento lento de um camião não pode ser nulo ou negativo ");
      })

      it('Deve avisar um erro ao introduzir um carregamento rápido invalido', () => {
        cy.get("#carregamentoRapido").type("-1");
        cy.get("#carregamentoRapido").blur();
        cy.get(".error").should("have.text", "O carregamento rápido de um camião não pode ser nulo ou negativo ");
      })
  })
  