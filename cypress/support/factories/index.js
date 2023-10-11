import { faker } from "@faker-js/faker";

export const user = {
  name: "carlos souza",
  email: "carlos@email.com",
  password: "pwd123",
  accountName: faker.string.alpha(5),
};

export const accountMovment = {
  descricao: faker.string.alpha(5) + "Desc",
  valor: "100",
  interessado: "TestInteressado",
};
