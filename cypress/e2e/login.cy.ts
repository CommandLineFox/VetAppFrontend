export {};

describe('Login Functionality', () => {
    beforeEach(() => {
        cy.fixture('user').as('userData');
        cy.visit('/login'); // Direktno na login
    });

    it('should display an error message for invalid credentials', function () {
        const { invalidUser } = this.userData;
        cy.login(invalidUser.licenseNumber, invalidUser.password);
        cy.contains('Invalid license number or password').should('be.visible');
    });

    it('should successfully login...', function () {
        const { validUser } = this.userData;
        cy.login(validUser.licenseNumber, validUser.password);
        cy.url().should('not.include', '/login');
    });
});