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
  it.only("should create an account successfully", function () {
    // Lista de contas mockadas
    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        statusCode: 200,
        body: [
          {
            id: 1,
            nome: "Carteira",
            visivel: true,
            usuario_id: 1,
          },
          {
            id: 2,
            nome: "Banco",
            visivel: true,
            usuario_id: 1,
          },
        ],
      }
    ).as("contasLista");
    // Cadastro de conta mockado
    cy.intercept(
      {
        method: "POST",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        body: {
          id: 3,
          nome: "newAccountMock",
          visivel: true,
          usuario_id: 1,
        },
      }
    ).as("contasNova");

    const newAccount = "newAccountMock";
    header.navToAccounts();

    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        statusCode: 200,
        body: [
          {
            id: 1,
            nome: "Carteira",
            visivel: true,
            usuario_id: 1,
          },
          {
            id: 2,
            nome: "Banco",
            visivel: true,
            usuario_id: 1,
          },
          {
            id: 3,
            nome: "newAccountMock",
            visivel: true,
            usuario_id: 1,
          },
        ],
      }
    ).as("contasSalvas");
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
