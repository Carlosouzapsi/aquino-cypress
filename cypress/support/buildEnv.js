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
};

export default buildEnv;
