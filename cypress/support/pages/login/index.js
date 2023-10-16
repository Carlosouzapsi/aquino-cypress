import { el } from "./elements";
import toast from "../../components/toast";

class LoginPage {
  constructor() {
    this.toast = toast;
  }
  doLogin(email = "", password = "") {
    cy.get(el.inputEmail).should("be.visible").clear().type(email);
    cy.get(el.inputPassword).clear().type(password);
    cy.get(el.btnEntrar).and("have.text", "Entrar").click();
  }
}

export default new LoginPage();
