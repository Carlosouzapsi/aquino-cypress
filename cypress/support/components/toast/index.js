import { el } from "./elements";

class Toast {
  shouldHaveMsg(msg) {
    cy.get(el.toast).should("have.text", msg);
  }
}

export default new Toast();
