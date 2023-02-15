describe('Criar Armazem', () => {

  beforeEach(() => {
    Cypress.Cookies.debug(true)
    cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
    cy.setCookie('role', 'Gestor de Armazens')
    
    cy.intercept('https://localhost:5001/api/Armazens').as('armazens')
    cy.visit('http://localhost:4200/criar-armazens');
  })

  it('Deve conseguir criar um armazem', () => {
    cy.get("#identificador").type("Tes");
    cy.get("#designacao").type("Test");
    cy.get("#endereco").type("Test,Test,0000-000");
    cy.get("#latitude").clear();
    cy.get("#latitude").type("0");
    cy.get("#longitude").clear();
    cy.get("#longitude").type("0");
    cy.get("#altitude").clear();
    cy.get("#altitude").type("0");

    cy.get("button").click();
    cy.wait('@armazens');

    cy.get("h3").should("have.text", " Armazem Guardado ");
  })

  it('Deve avisar um erro ao introduzir um id invalido', () => {
    cy.get("#identificador").type("Test");
    cy.get("#identificador").blur();
    cy.get(".error").should("have.text", " O identificador de um Armazem tem de ter 3 caracteres alfanuméricos ");
  })

  it('Deve avisar um erro ao introduzir uma designacao invalida', () => {
    cy.get("#designacao").type("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    cy.get("#designacao").blur();
    cy.get(".error").should("have.text", " A designação de um armazem não pode ser vazia nem maior que 50 caracteres ");
  })

  it('Deve avisar um erro ao introduzir um endereço invalido', () => {
    cy.get("#endereco").type("Test, 000-021");
    cy.get("#endereco").blur();
    cy.get(".error").should("have.text", " Este formato de endeço não é suportado ");
  })

  it('Deve avisar um erro ao introduzir uma latitude invalida', () => {
    cy.get("#latitude").clear();
    cy.get("#latitude").type("-91");
    cy.get("#latitude").blur();
    cy.get(".error").should("have.text", " Latitude tem de estar entre -90 e 90 graus ");
  })

  it('Deve avisar um erro ao introduzir uma longitude invalida', () => {
    cy.get("#longitude").clear();
    cy.get("#longitude").type("181");
    cy.get("#longitude").blur();
    cy.get(".error").should("have.text", " Longitude tem de estar entre -180 e 180 graus ");
  })

  it('Deve avisar um erro ao introduzir uma altitude invalida', () => {
    cy.get("#altitude").clear();
    cy.get("#altitude").type("-1");
    cy.get("#altitude").blur();
    cy.get(".error").should("have.text", " A altitude de um armazem não pode ser negativa ");
  })

})
