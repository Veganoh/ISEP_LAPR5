describe('Criar empacotamento', () => {

  beforeEach(() => {
    
    cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
    cy.setCookie('role', 'Gestor de Armazens')

    cy.visit('http://localhost:4200/criar-enpacotamentos');
  })

  it('Deve criar Empacotamento', function() {
    
    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:3000/api/Enpacotamentos',
       },
       [] )

    cy.get("select").select("4398");
    cy.get("#matricula").clear().type("CA-10-10");
    cy.get("#tempoColocacao").clear().type("20");
    cy.get("#tempoRetirada").clear().type("30");
    cy.get("#coordenadaX").clear().type("4");
    cy.get("#coordenadaY").clear().type("2");
    cy.get("#coordenadaZ").clear().type("1");
    cy.get("button").click();
    cy.get("h3").should("have.text", "Empacotamento Guardado");
  })

  it('Deve avisar com Matricula inválido', function() {
    cy.get("#matricula").clear().type("XX-XX-XX");
    cy.get("#matricula").blur();
    cy.get(".error").should("have.text", " Este formato de matricula não é suportado! ");
  })

  
  it('Deve avisar com Tempo de Retirada inválido', function() {
    cy.get("#tempoRetirada").clear().type("-4");
    cy.get("#tempoRetirada").blur();
    cy.get(".error").should("have.text", " O tempo de retirada tem de ser positivo! ");
  })

  it('Deve avisar com Tempo de Colocação inválido', function() {
    cy.get("#tempoColocacao").clear().type("-2");
    cy.get("#tempoColocacao").blur();
    cy.get(".error").should("have.text", " O tempo de colocação tem de ser positivo! ");
  })
  
  it('Deve avisar com Coordenada X inválida', function() {
    cy.get("#coordenadaX").clear().type("10");
    cy.get("#coordenadaX").blur();
    cy.get(".error").should("have.text", " A coordenada X tem de estar entre 1 e 9! ");
  })

  it('Deve avisar com Coordenada Y inválida', function()  {
    cy.get("#coordenadaY").clear().type("20");
    cy.get("#coordenadaY").blur();
    cy.get(".error").should("have.text", " A coordenada Y tem de estar entre 1 e 19! ");
  })

  it('Deve avisar com Coordenada Z inválida', function()  {
    cy.get("#coordenadaZ").clear().type("-2");
    cy.get("#coordenadaZ").blur();
    cy.get(".error").should("have.text", " A coordenada Z tem de estar entre 1 e 7! ");
  })


  
})