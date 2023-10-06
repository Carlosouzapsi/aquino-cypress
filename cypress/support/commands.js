// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import dayjs from "dayjs";

Cypress.Commands.add("getJwtToken", function (emailUser, passUser) {
  cy.request({
    method: "POST",
    url: "https://barrigarest.wcaquino.me/signin",
    body: {
      email: emailUser,
      redirecionar: false,
      senha: passUser,
    },
  }).then(function (response) {
    expect(response.status).to.equal(200);
    const token = response.body.token;
    Cypress.env("jwtToken", token);
  });
});

Cypress.Commands.add("apiResetAccounts", function () {
  cy.request({
    method: "GET",
    url: "https://barrigarest.wcaquino.me/reset",
    headers: {
      Authorization: "JWT " + Cypress.env("jwtToken"),
    },
  }).then((response) => expect(response.status).to.equal(200));
});

Cypress.Commands.add("apiAddAccount", function (accName) {
  cy.request({
    method: "POST",
    url: "https://barrigarest.wcaquino.me/contas",
    headers: {
      Authorization: `JWT ${Cypress.env("jwtToken")}`,
    },
    body: {
      nome: accName,
    },
  }).then(function (response) {
    expect(response.status).to.eq(201);
  });
});

Cypress.Commands.add("apiAddAccountMovement", function (accountId) {
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
      conta_id: accountId,
      status: true,
    },
  }).then(function (response) {
    expect(response.status).to.eq(201);
  });
});

Cypress.Commands.add("apiGetAccountId", function (accName) {
  cy.request({
    method: "GET",
    url: "https://barrigarest.wcaquino.me/contas",
    headers: {
      Authorization: `JWT ${Cypress.env("jwtToken")}`,
    },
    qs: {
      nome: accName,
    },
  }).then(function (response) {
    expect(response.status).to.eq(200);
    let id = response.body[0].id;
    return id;
  });
});

Cypress.Commands.add("apiGetAccountMovementId", function (accDesc) {
  // TODO
  cy.request({
    method: "GET",
    url: "https://barrigarest.wcaquino.me/transacoes",
    headers: {
      Authorization: `JWT ${Cypress.env("jwtToken")}`,
    },
    qs: {
      descricao: accDesc,
    },
  }).then(function (response) {
    let idTransaction = response.body[0].id;
    return idTransaction;
  });
});

/*
 Fazendo override do método cy.request
 se quando o método for usado precisar
 do token jwt, não vai ser mais necessário
 sempre passá-lo no headers
*/

// Funcionalidade MUITO importante!
Cypress.Commands.overwrite("request", function (originalFn, ...options) {
  if (options.length === 1) {
    if (Cypress.env("jwtToken")) {
      options[0].headers = {
        Authorization: `JWT ${Cypress.env("jwtToken")}`,
      };
    }
  }
  return originalFn(...options);
});
