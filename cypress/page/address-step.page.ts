export class AddressStepPage {
  private proceedToCheckoutButtonSelector: string;

  constructor () {
    this.proceedToCheckoutButtonSelector = '#center_column > form > p > button > span';
  }

  public proceedToCheckout(): Cypress.Chainable {
    return cy.get(this.proceedToCheckoutButtonSelector).click();
  }
}
