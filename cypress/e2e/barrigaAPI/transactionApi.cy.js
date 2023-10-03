import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

describe("Transactions", function () {
  // Usar massa de dados em fixture ou factories
  const user = {
    email: "carlos.souza@email.com",
    password: "pwd123",
  };
  before(function () {
    cy.getJwtToken(user.email, user.password);
    cy.apiResetAccounts();
  });

  it.only("Should create a transaction sucessfully", function () {
    const account = {
      nome: `${faker.string.alpha(5)}`,
    };
    cy.apiAddAccount(account.nome);
    cy.apiGetAccountId(account.nome).then(function (id) {
      cy.request({
        method: "POST",
        url: "https://barrigarest.wcaquino.me/transacoes",
        headers: {
          Authorization: `JWT ${Cypress.env("jwtToken")}`,
        },
        body: {
          tipo: "REC",
          data_transacao: dayjs().format("DD/MM/YYYY"),
          data_pagamento: dayjs().add(1, "day").format("DD/MM/YYYY"),
          descricao: "Descricao",
          valor: "123",
          envolvido: "Teste",
          conta_id: id,
          status: true,
        },
      }).then(function (response) {
        expect(response.status).to.eq(201);
        console.log(response.body);

        cy.wrap(response).its("body.id").should("exist");
      });
    });
  });
});
