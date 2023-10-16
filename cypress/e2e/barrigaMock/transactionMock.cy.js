import header from "../../support/components/header";
import loginPage from "../../support/pages/login";
import accountPage from "../../support/pages/accounts";
import accountMovimentPage from "../../support/pages/AccountMoviment";
import balancePage from "../../support/pages/balance";
import buildEnv from "../../support/buildEnv";

import { accountMovement, user } from "../../support/factories";

describe("Account movement", function () {
  beforeEach(function () {
    buildEnv();
    cy.visit("/");
    loginPage.doLogin(user.email, user.password);
  });

  beforeEach(function () {
    header.navToAccountMovement();
  });

  it("Should create a transaction sucessfully", function () {
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
          descricao: accountMovement.descricao,
          envolvido: accountMovement.valor,
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

    // Passar esse body para um arquivo de fixture.
    cy.intercept(
      {
        method: "GET",
        url: "https://barrigarest.wcaquino.me/extrato/**",
      },
      {
        statusCode: 200,
        body: [
          {
            conta: "Conta para movimentacoes",
            id: 1823836,
            descricao: "Movimentacao para exclusao",
            envolvido: "AAA",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-10-16T03:00:00.000Z",
            data_pagamento: "2023-10-16T03:00:00.000Z",
            valor: "-1500.00",
            status: true,
            conta_id: 1945613,
            usuario_id: 41550,
            transferencia_id: null,
            parcelamento_id: null,
          },
          {
            conta: "Conta com movimentacao",
            id: 1823837,
            descricao: "Movimentacao de conta",
            envolvido: "BBB",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-10-16T03:00:00.000Z",
            data_pagamento: "2023-10-16T03:00:00.000Z",
            valor: "-1500.00",
            status: true,
            conta_id: 1945614,
            usuario_id: 41550,
            transferencia_id: null,
            parcelamento_id: null,
          },
          {
            conta: "Conta para saldo",
            id: 1823838,
            descricao: "Movimentacao 1, calculo saldo",
            envolvido: "CCC",
            observacao: null,
            tipo: "REC",
            data_transacao: "2023-10-16T03:00:00.000Z",
            data_pagamento: "2023-10-16T03:00:00.000Z",
            valor: "3500.00",
            status: false,
            conta_id: 1945615,
            usuario_id: 41550,
            transferencia_id: null,
            parcelamento_id: null,
          },
          {
            conta: "Conta para saldo",
            id: 1823839,
            descricao: "Movimentacao 2, calculo saldo",
            envolvido: "DDD",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-10-16T03:00:00.000Z",
            data_pagamento: "2023-10-16T03:00:00.000Z",
            valor: "-1000.00",
            status: true,
            conta_id: 1945615,
            usuario_id: 41550,
            transferencia_id: null,
            parcelamento_id: null,
          },
          {
            conta: "Conta para saldo",
            id: 1823840,
            descricao: "Movimentacao 3, calculo saldo",
            envolvido: "EEE",
            observacao: null,
            tipo: "REC",
            data_transacao: "2023-10-16T03:00:00.000Z",
            data_pagamento: "2023-10-16T03:00:00.000Z",
            valor: "1534.00",
            status: true,
            conta_id: 1945615,
            usuario_id: 41550,
            transferencia_id: null,
            parcelamento_id: null,
          },
          {
            conta: "Conta para extrato",
            id: 1823841,
            descricao: "Movimentacao para extrato",
            envolvido: "FFF",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-10-16T03:00:00.000Z",
            data_pagamento: "2023-10-16T03:00:00.000Z",
            valor: "-220.00",
            status: true,
            conta_id: 1945616,
            usuario_id: 41550,
            transferencia_id: null,
            parcelamento_id: null,
          },
          {
            conta: "Conta para extrato",
            id: 1823841,
            descricao: accountMovement.descricao,
            envolvido: "FFF",
            observacao: null,
            tipo: "DESP",
            data_transacao: "2023-10-16T03:00:00.000Z",
            data_pagamento: "2023-10-16T03:00:00.000Z",
            valor: accountMovement.valor,
            status: true,
            conta_id: 1945616,
            usuario_id: 41550,
            transferencia_id: null,
            parcelamento_id: null,
          },
        ],
      }
    ).as("listaNovaMovimentacao");

    accountMovimentPage.addAccountMov(
      accountMovement.descricao,
      accountMovement.valor,
      accountMovement.interessado
    );

    const msg = "Movimentação inserida com sucesso!";
    accountMovimentPage.toast.shouldHaveMsg(msg);

    const size = 7;
    balancePage.shouldHaveListLength(size);
  });

  it("Should remove a transaction sucessfully", function () {
    // Mock delete com sucesso
    cy.intercept(
      {
        method: "DELETE",
        url: "https://barrigarest.wcaquino.me/transacoes/**",
      },
      {
        statusCode: 204,
      }
    ).as("deletaMovimentacao");

    header.navToBalance();

    // Usando o within como uma alternativa ao .find()
    cy.get("[data-test=mov-row]")
      .eq(-1)
      .within(() => {
        // cria um contexto e não limita igual o find pra achar uma tag
        cy.get("a[href='#']").click();
      })
      .then(() => {});

    const msg = "Movimentação removida com sucesso!";
    balancePage.toast.shouldHaveMsg(msg);

    cy.contains(`${accountMovement.descricao}`).should("not.exist");
  });
});
