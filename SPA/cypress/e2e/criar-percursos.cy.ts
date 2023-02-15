describe('Criar Percursos', () => {

  beforeEach(() => {
    
    cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
    cy.setCookie('role', 'Gestor de Armazens')

    cy.visit('http://localhost:4200/criar-percursos');
  })

  it('Deve criar o Percurso', function() {
    cy.intercept(
      {
        method: 'POST',
        url: 'http://localhost:3000/api/Percursos',
       },
       [] )

    cy.get("#armazem-orig").select("Arouca");
    cy.get("#armazem-dest").select("Test");
    cy.get("#distancia").clear().type("60");
    cy.get("#energia").clear().type("45");
    cy.get("#tempo").clear().type("30");
    cy.get("#tempo-extra").clear().type("0");
    cy.get("button").click();
    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Tem a certeza de que quer criar o Percurso?');
    });
    cy.on('window:confirm', () => true);
    cy.get("h3").should("have.text", "Percurso Criado com Sucesso");

    cy.visit('http://localhost:4200/listar-percursos');
    cy.get('#armazem-origem').clear().type('001');
    cy.get('#armazem-destino').clear().type('Tes');
    cy.get('table').find('tbody').find("tr").should('exist');
  })

  it('Deve avisar de distancia inválida', function() {
    cy.get('#distancia').clear().type('0');
    cy.get("#distancia").blur();
    cy.get(".error").should("have.text", "     A Distância do percurso deve ser positiva e maior que 0! ");
  })

  it('Deve avisar de energia inválida', function() {
    cy.get('#energia').clear().type('0');
    cy.get("#energia").blur();
    cy.get(".error").should("have.text", "     A Energia Gasta do percurso deve ser positivo e maior que 0! ");
  })

  it('Deve avisar de tempo inválido', function() {
    cy.get('#tempo').clear().type('0');
    cy.get("#tempo").blur();
    cy.get(".error").should("have.text", "     O Tempo Base do percurso deve ser positivo e maior que 0! ");
  })

  it('Verificar que o Butão fica desativado até ter toda a informação necessária', function() {
    cy.get('button').should('be.disabled');
    cy.get("#armazem-orig").select("Arouca");

    cy.get('button').should('be.disabled');
    cy.get("#armazem-dest").select("Test");

    cy.get('button').should('be.disabled');
    cy.get("#distancia").clear().type("60");

    cy.get('button').should('be.disabled');
    cy.get("#energia").clear().type("45");

    cy.get('button').should('be.disabled');
    cy.get("#tempo").clear().type("30");

    cy.get('button').should('be.enabled');
    cy.get("#tempo-extra").clear().type("0");
    cy.get('button').should('be.enabled');

    cy.get("#tempo").clear().type("0");
    cy.get('button').should('be.disabled');
  })
})