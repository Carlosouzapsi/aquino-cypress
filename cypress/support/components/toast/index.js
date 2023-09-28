import { el } from "./elements";

class Toast {
  shouldHaveMsg(msg) {
    cy.get(el.toast).should("contain", msg);
  }
}

export default new Toast();
