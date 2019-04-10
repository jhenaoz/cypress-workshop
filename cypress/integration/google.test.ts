describe('This is the first example of cypress', () => {
  it('should have a title', () => {
    cy.visit('https://www.google.com/')
    const title = cy.title();
    expect('Google').to.equal('Google');
  });
});
