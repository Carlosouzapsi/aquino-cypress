import loginPage from "../../support/pages/login";
import homePage from "../../support/pages/home";
import accountPage from "../../support/pages/accounts";
import header from "../../support/components/header";

import { faker } from "@faker-js/faker";

describe("Account", function () {
  // usar massa de dados em fixture ou factories
  const user = {
    name: "carlos souza",
    email: "carlos.souza@email.com",
    password: "pwd123",
    accountName: faker.string.alpha(5),
  };

  after(function () {
    cy.clearLocalStorage();
  });

  before(function () {
    cy.getJwtToken(user.email, user.password);
  });
  beforeEach(function () {
    // rota de saldos
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
    loginPage.doLogin(user.email, user.password);
  });
  it("should create an account successfully", function () {
    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        statusCode: 200,
        body: [
          {
            id: 1940220,
            nome: "newAccountUpdate",
            visivel: true,
            usuario_id: 41550,
          },
          {
            id: 1938470,
            nome: "newAccountTestUI",
            visivel: true,
            usuario_id: 41550,
          },
          {
            id: 1938471,
            nome: "AccUpdated",
            visivel: true,
            usuario_id: 41550,
          },
          {
            id: 1938472,
            nome: "sameAccountName",
            visivel: true,
            usuario_id: 41550,
          },
          {
            id: 1938464,
            nome: "Conta para alterar",
            visivel: true,
            usuario_id: 41550,
          },
          {
            id: 1938465,
            nome: "Conta mesmo nome",
            visivel: true,
            usuario_id: 41550,
          },
          {
            id: 1938466,
            nome: "Conta para movimentacoes",
            visivel: true,
            usuario_id: 41550,
          },
          {
            id: 1938467,
            nome: "Conta com movimentacao",
            visivel: true,
            usuario_id: 41550,
          },
          {
            id: 1938468,
            nome: "Conta para saldo",
            visivel: true,
            usuario_id: 41550,
          },
          {
            id: 1938469,
            nome: "Conta para extrato",
            visivel: true,
            usuario_id: 41550,
          },
        ],
      }
    ).as("saldo");
    cy.visit("/");
    loginPage.doLogin(user.email, user.password);

    const newAccount = "newAccountTestUI";
    header.navToAccounts();
    accountPage.addAccount(newAccount);
    accountPage.accountNameShouldBeVisible(newAccount);

    const msg = "Conta inserida com sucesso!";
    accountPage.toast.shouldHaveMsg(msg);
  });
  it("should update an account successfully", function () {
    const newAccount = "newAccountUpdate";
    cy.apiAddAccount(newAccount);
    header.navToAccounts();
    const newAccountUpdated = "AccUpdated";

    // Preciso refatorar o page object esse locator pode ser util na hora de excluir
    accountPage.accountNameShouldBeUpdated(newAccount, newAccountUpdated);
  });
  // it.skip("should remove an account successfully", function () {});

  it("should not create an account with same name", function () {
    const sameAccount = "sameAccountName";
    cy.apiAddAccount(sameAccount);

    header.navToAccounts();
    accountPage.addAccount(sameAccount);

    const msg = "Erro: Error: Request failed with status code 400";
    accountPage.toast.shouldHaveMsg(msg);
  });
});
