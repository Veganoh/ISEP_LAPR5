describe('listar Armazem  (necessita chamar o teste de criação de armazem previamente)', () => {

  beforeEach(() => {
    
    cy.setCookie('jwtToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInByaW1laXJvTm9tZSI6IkNhcmxvcyIsInVsdGltb05vbWUiOiJEaWFzIiwiZW1haWwiOiJjZXJkMjAwMkBnbWFpbC5jb20iLCJ0ZWxlbW92ZWwiOiI5MTIzNDU2NzgiLCJyb2xlIjoiR2VzdG9yIGRlIEFybWF6ZW5zIiwiaWF0IjoxNjczMTIzNDQwLCJleHAiOjE2NzM3MjgyNDB9.SXrXyrxzJAR4Mdg3ZrRDEk8fTfkr8nN-3edgryoCso8')
    cy.setCookie('role', 'Gestor de Armazens')

    cy.intercept('https://localhost:5001/api/Armazens').as('armazens')
    cy.visit('http://localhost:4200/listar-armazens');
    cy.wait('@armazens')
  })

  it('Deve listar todos os armazens disponiveis', () => {
    cy.get('table').find('tr').its('length').should('be.gte', 1);
  })

  it('Deve listar so o armazem escolhido por ID', () => {
    cy.get("#identificador").type("Tes");
    cy.get('table').find('tr').should('have.length', 2)
  })

  it('Deve listar so o armazem escolhido por designacao', () => {
    cy.get("#designacao").type("Test");
    cy.get('table').find('tr').should('have.length', 2)
  })

  it('Não deve mostrar nenhuma fila com um ID invalido', () => {
    cy.get("#identificador").type("Test");
    cy.get('table').find('tr').should('have.length', 1)
  })

  
  it('Não deve mostrar nenhuma fila com um ID valido mas uma designação invalida', () => {
    cy.get("#identificador").type("Tes");
    cy.get("#designacao").type("aaaa");
    cy.get('table').find('tr').should('have.length', 1)
  })

  it('Deve ser possivel inibir um armazem', () => {
    cy.get("#identificador").type("Tes");
    cy.get('table').find('tr').find("button").should("have.text", "Inibir");
    cy.get('table').find('tr').find("button").click();
    cy.wait(50);
    cy.get('table').find('tr').find("button").should("have.text", "Ativar");
  })

  it('Deve ser possivel ativar um armazem', () => {
    cy.get("#identificador").type("Tes");
    cy.get('table').find('tr').find("button").should("have.text", "Ativar");
    cy.get('table').find('tr').find("button").click();
    cy.wait(50);
    cy.get('table').find('tr').find("button").should("have.text", "Inibir");
  })
})