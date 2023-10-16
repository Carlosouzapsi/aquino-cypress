// Definir um ambiente com todas as rotas necessárias para os mocks
const buildEnv = () => {
  // mock do login
  cy.intercept(
    {
      method: "POST",
      url: "https://barrigarest.wcaquino.me/signin",
    },
    {
      statusCode: 200,
      body: {
        id: 1000,
        nome: "carlos souza",
        token: "uma string muito grande",
      },
    }
  ).as("login");
  // mock rota de saldo
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
  // mock da rota de contas listagem
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
  ).as("contas");

  // Mock extratos params generico
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
      ],
    }
  );
};

export default buildEnv;
