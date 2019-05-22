describe('This is the first example of cypress', () => {
  it('should have a title', () => {
    cy.server();
    cy.fixture('google-response').as('googleSearchResponse');
    cy.route('GET', '**/complete/search**', '@googleSearchResponse');

    cy.visit('https://www.google.com/');
    cy.get('input[aria-label="Buscar"]')
      .type('Cypress');

    cy.title().should('be.equal', 'Google');
  });
});
