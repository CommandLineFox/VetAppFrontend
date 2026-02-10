export {};

describe('Login Functionality', () => {

    beforeEach(() => {
        cy.fixture('user').as('userData');
        cy.visit('/');
    });

    it('should display an error message for invalid credentials', function () {
        const { invalidUser } = this.userData;

        cy.login(invalidUser.licenseNumber, invalidUser.password);

        cy.contains('Invalid license number or password').should('be.visible');

        cy.url().should('include', '/login');
    });

    it('should successfully login and redirect to the dashboard with valid credentials', function () {
        const { validUser } = this.userData;

        cy.login(validUser.licenseNumber, validUser.password);

        cy.url().should('not.include', '/login');
        cy.contains('Welcome').should('be.visible');

        cy.window().its('localStorage').invoke('getItem', 'token').should('exist');
    });
});