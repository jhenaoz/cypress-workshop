export class BankPaymentPage {
  private confirmOrderButtonSelector: string;

  constructor() {
    this.confirmOrderButtonSelector = '#cart_navigation span';
  }

  public confirmOrder(): Cypress.Chainable {
    return cy.get(this.confirmOrderButtonSelector).click();
  }
}
