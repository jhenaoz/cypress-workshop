export class ProductAddedModalPage {
  private proceedToCheckoutButtonSelector: string;

  constructor() {
    this.proceedToCheckoutButtonSelector =
      '[style*="display: block;"] .button-container > a';
  }

  public proceedToCheckout(): Cypress.Chainable {
    return cy.get(this.proceedToCheckoutButtonSelector).click();
  }
}
