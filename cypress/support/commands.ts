/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
//  commands, please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
export {};

Cypress.Commands.add('login', (license: string, password: string) => {
    cy.get('[data-cy="license-input"]').type(license);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="login-button"]').click();
});

Cypress.Commands.add('loginAndSetup', (user: any) => {
    cy.session([user.licenseNumber, user.password], () => {
        cy.visit('/login');
        cy.login(user.licenseNumber, user.password);
        cy.url().should('not.include', '/login');
    });
});

Cypress.Commands.add('goToSpecies', () => {
    cy.get('[data-cy="nav-link-species"]').click();
    cy.url().should('include', '/species');
});

Cypress.Commands.add('logout', () => {
    cy.get('body').then(($body) => {
        if ($body.find('[data-cy="logout-button"]').length > 0) {
            cy.get('[data-cy="logout-button"]').click();
            cy.url().should('include', '/login');
        }
    });

    cy.window().then((win) => {
        win.localStorage.clear();
        win.sessionStorage.clear();
    });
});

declare global {
    namespace Cypress {
        interface Chainable {
            login(license: string, password: string): Chainable<void>;

            loginAndSetup(user: any): Chainable<void>;

            goToSpecies(): Chainable<void>;

            logout(): Chainable<void>;
        }
    }
}