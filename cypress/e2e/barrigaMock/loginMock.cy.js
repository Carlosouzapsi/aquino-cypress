/// <reference types="Cypress" />
import loginPage from "../../support/pages/login";

describe("login", function () {
  const user = {
    name: "carlos souza",
    email: "carlos.souza@email.com",
    password: "pwd123",
  };

  before(function () {
    // Mockando login
    cy.intercept(
      {
        method: "POST",
        url: "https://barrigarest.wcaquino.me/signin",
      },
      {
        statusCode: 200,
        body: {
          id: 1000,
          nome: "carlos souza mocked",
          token: "uma string muito grande",
        },
      }
    ).as("login");
    // rota de saldo
    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/saldo",
      },
      {
        statusCode: 200,
        body: [
          {
            conta_id: 999,
            conta: "carteira Mockada!!!!",
            saldo: "0.01",
          },
          {
            conta_id: 1000,
            conta: "Conta Mockada!!!!",
            saldo: "10000.00",
          },
        ],
      }
    ).as("saldo");
    cy.visit("/");
  });

  it("should do login successfully", function () {
    loginPage.doLogin("erradoPraforcarMock", "tantoFaz");
    const msg = `Bem vindo, ${user.name}!`;

    // loginPage.toast.shouldHaveMsg(msg);
  });
});
