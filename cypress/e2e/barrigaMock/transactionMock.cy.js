import header from "../../support/components/header";
import loginPage from "../../support/pages/login";
import accountPage from "../../support/pages/accounts";
import accountMovimentPage from "../../support/pages/AccountMoviment";
import balancePage from "../../support/pages/balance";
import buildEnv from "../../support/buildEnv";

import { accountMovment, user } from "../../support/factories";

describe("Account moviment", function () {
  before(function () {
    buildEnv();
    cy.visit("/");
    loginPage.doLogin(user.email, user.password);
  });

  beforeEach(function () {
    header.navToAccountMovement();
  });

  after(function () {
    cy.visit("/");
  });
  // TODO
  it.only("Should create a transaction sucessfully", function () {
    accountMovimentPage.addAccountMov(
      accountMovment.descricao,
      accountMovment.valor,
      accountMovment.interessado
    );

    cy.pause();

    const msg = "Movimentação inserida com sucesso!";
    accountMovimentPage.toast.shouldHaveMsg(msg);

    const size = 7;
    balancePage.shouldHaveListLength(size);
  });

  it.only("Should remove a transaction sucessfully", function () {
    // Mockando resposta do cadastro mov
    cy.intercept(
      {
        method: "POST",
        url: "https://barrigarest.wcaquino.me/transacoes",
      },
      {
        statusCode: 201,
        body: {
          id: 1819153,
          descricao: accMovData.descricao,
          envolvido: accMovData.valor,
          observacao: null,
          tipo: "REC",
          data_transacao: "2023-10-11T03:00:00.000Z",
          data_pagamento: "2023-10-11T03:00:00.000Z",
          valor: "100.00",
          status: false,
          conta_id: 1940925,
          usuario_id: 41550,
          transferencia_id: null,
          parcelamento_id: null,
        },
      }
    ).as("novaMovimentacao");

    accountMovimentPage.addAccountMov(
      accMovData.descricao,
      accMovData.valor,
      accMovData.interessado
    );

    cy.pause();

    // Hook to validate the correct url
    cy.url().should("be.equal", "https://barrigareact.wcaquino.me/extrato");

    // Usando o within como uma alternativa ao .find()
    cy.get("[data-test=mov-row]")
      .eq(-1)
      .within(() => {
        // cria um contexto e não limita igual o find pra achar uma tag
        cy.get("a[href='#']").click();
      })
      .then(() => {
        const msg = "Movimentação removida com sucesso!";
        balancePage.toast.shouldHaveMsg(msg);
      });

    cy.contains(`${accMovData.descricao}`).should("not.exist");
  });
});
