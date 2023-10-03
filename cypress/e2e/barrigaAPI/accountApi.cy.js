import { faker } from "@faker-js/faker";

describe("Account API", function () {
  // refatorar a repetição da url

  // Usar massa de dados em fixture ou factories
  const user = {
    email: "carlos.souza@email.com",
    password: "pwd123",
  };
  before(function () {
    cy.getJwtToken(user.email, user.password);
    cy.apiResetAccounts();
  });
  it("should add an Account by API sucessfully", function () {
    const account = {
      nome: `${faker.string.alpha(5)}`,
    };

    cy.request({
      method: "POST",
      url: "https://barrigarest.wcaquino.me/contas",
      headers: {
        Authorization: `JWT ${Cypress.env("jwtToken")}`,
      },
      body: {
        nome: account.nome,
      },
    }).then(function (response) {
      expect(response.status).to.eq(201);
      cy.wrap(response).its("body.nome").should("be.equal", account.nome);
    });
  });

  it("should update an Account by API sucessfully", function () {
    const account = {
      nome: `${faker.string.alpha(5)}`,
    };

    // adiciona a conta
    cy.apiAddAccount(account.nome);

    // consulta id da conta adicionada
    cy.apiGetAccountId(account.nome).then((id) => {
      cy.request({
        method: "PUT",
        url: `https://barrigarest.wcaquino.me/contas/${id}`,
        headers: {
          Authorization: `JWT ${Cypress.env("jwtToken")}`,
        },
        body: {
          nome: account.nome,
        },
      }).then(function (response) {
        expect(response.status).to.eq(200);
        cy.wrap(response).its("body.nome").should("be.equal", account.nome);
      });
    });
  });
  it.only("should not create an Account with same name", function () {
    const account = {
      nome: `${faker.string.alpha(5)}`,
    };

    // adiciona a conta
    cy.apiAddAccount(account.nome);

    const errorMsg = "Já existe uma conta com esse nome!";

    // Tentando adicionar a mesma conta
    cy.log("Oi");
    cy.request({
      method: "POST",
      url: "https://barrigarest.wcaquino.me/contas",
      failOnStatusCode: false,
      headers: {
        Authorization: `JWT ${Cypress.env("jwtToken")}`,
      },
      body: {
        nome: account.nome,
      },
    }).then(function (response) {
      expect(response.status).to.eq(400);
      cy.wrap(response).its("body.error").should("contain", errorMsg);
    });
  });
});
