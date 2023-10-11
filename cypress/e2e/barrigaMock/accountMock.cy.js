import loginPage from "../../support/pages/login";
import accountPage from "../../support/pages/accounts";
import header from "../../support/components/header";

import buildEnv from "../../support/buildEnv";
import { user } from "../../support/factories";

describe("Account", function () {
  after(function () {
    cy.clearLocalStorage();
  });

  beforeEach(function () {
    buildEnv();
    cy.visit("/");
    loginPage.doLogin(user.email, user.password);
  });

  it("should create an account successfully", function () {
    // Cadastro mockado de conta
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
    ).as("cadastroConta");

    const newAccount = "newAccountMock";
    header.navToAccounts();

    // Lista de contas mockadas com a nova conta
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
    ).as("listaComNovoCadastro");

    accountPage.addAccount(newAccount);
    accountPage.accountNameShouldBeVisible(newAccount);

    const msg = "Conta inserida com sucesso!";
    accountPage.toast.shouldHaveMsg(msg);
  });
  it("should update an account successfully", function () {
    // Mockando resposta de edição
    cy.intercept(
      {
        method: "PUT",
        url: "https://barrigarest.wcaquino.me/contas/**",
      },
      {
        statusCode: 204,
        body: {
          id: 1,
          nome: "Carteira Editada",
          visivel: true,
          usuario_id: 1,
        },
      }
    ).as("contaEdicao");

    // Mockando lista de contas
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
            nome: "Carteira editada",
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
    ).as("listaEditada");

    header.navToAccounts();
    const newAccountUpdated = "Carteira editada";
    accountPage.accountNameShouldBeUpdated("Carteira", newAccountUpdated);
  });
  it("should not create an account with same name", function () {
    // Mockando erro de conta igual
    cy.intercept(
      {
        method: "POST",
        url: "https://barrigarest.wcaquino.me/contas",
      },
      {
        statusCode: 400,
        body: { error: "Já existe uma conta com esse nome!" },
      }
    );

    header.navToAccounts();
    cy.pause();
    accountPage.addAccount("Carteira");

    const msg = "Erro: Error: Request failed with status code 400";
    accountPage.toast.shouldHaveMsg(msg);
  });
});
