describe("loginAPI", function () {
  // refatorar a repetição da url
  it("should do login successfully by API", function () {
    cy.request({
      method: "POST",
      url: "https://barrigarest.wcaquino.me/signin",
      body: {
        email: "carlos.souza@email.com",
        senha: "pwd123",
        redirecionar: false,
      },
    }).then(function (response) {
      expect(response.status).to.eq(200);
      cy.wrap(response).its("body.token").should("not.empty");
    });
  });
});
