import { faker } from "@faker-js/faker";

describe("Account API", function () {
  // refatorar a repetição da url

  // Usar massa de dados em fixture ou factories
  const user = {
    email: "carlos.souza@email.com",
    password: "pwd123",
  };
  const account = {
    nome: `${faker.string.alpha(5)}`,
  };
  before(function () {
    cy.getJwtToken(user.email, user.password);
    cy.apiResetAccounts();
  });
  it("should add an Account by API", function () {
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
});
