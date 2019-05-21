export class PaymentStepPage {
  private payByBankWireOptionSelector: string;

  constructor() {
    this.payByBankWireOptionSelector = '.bankwire';
  }

  public  payByBankWire(): Cypress.Chainable {
    return cy.get(this.payByBankWireOptionSelector).click();
  }
}
