export class SignInStepPage {
  private emailFieldSelector: string;
  private passwordFiledSelector: string;
  private submitLoginButtonSelector: string;

  constructor() {
    this.emailFieldSelector = '#email';
    this.passwordFiledSelector = '#passwd';
    this.submitLoginButtonSelector = '#SubmitLogin';
  }

  public login(email: string, password: string): Cypress.Chainable {
    cy.get('#email').type(email);
    cy.get('#passwd').type(password);
    return cy.get('#SubmitLogin > span').click();
  }
}
