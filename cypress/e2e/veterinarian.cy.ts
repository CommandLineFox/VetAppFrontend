describe('Veterinarian Management', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/veterinarian*').as('getVeterinarians');
        cy.intercept('POST', '**/veterinarian').as('createVeterinarian');
        cy.intercept('PUT', '**/veterinarian/*').as('updateVeterinarian');
        cy.intercept('DELETE', '**/veterinarian/*').as('deleteVeterinarian');

        cy.fixture('user').then((user) => {
            cy.loginAndSetup(user.validUser);
        });

        cy.visit('/veterinarians');
        cy.wait('@getVeterinarians');
    });

    it('should display the veterinarians table', () => {
        cy.get('table').should('be.visible');
    });

    it('should create a new veterinarian', () => {
        const uniqueId = Date.now();
        const vet = {
            firstName: 'John',
            lastName: `Doe ${uniqueId}`,
            license: `500`,
            email: `vet${uniqueId}@test.com`,
            password: 'Password123'
        };

        cy.get('[data-cy="table-create-btn"]').click();

        cy.get('[data-cy="vet-first-name-input"]').type(vet.firstName);
        cy.get('[data-cy="vet-last-name-input"]').type(vet.lastName);
        cy.get('[data-cy="vet-license-input"]').type(vet.license);
        cy.get('[data-cy="vet-email-input"]').type(vet.email);
        cy.get('[data-cy="vet-password-input"]').type(vet.password);

        cy.get('[data-cy="vet-permissions-select"]').click();
        cy.get('[role="listbox"] li').first().click();
        cy.get('body').click(0, 0);

        cy.get('[data-cy="vet-form-submit"]').click();

        cy.wait('@createVeterinarian');
        cy.wait('@getVeterinarians');

        cy.contains(vet.lastName).should('be.visible');
    });

    it('should edit an existing veterinarian', () => {
        const updatedName = `Updated ${Date.now()}`;

        cy.get('[data-cy^="table-row-"]').first().within(() => {
            cy.get('[data-cy^="edit-btn-"]').click();
        });

        cy.get('[data-cy="vet-last-name-input"]').clear().type(updatedName);
        cy.get('[data-cy="vet-form-submit"]').click();

        cy.wait('@updateVeterinarian');
        cy.wait('@getVeterinarians');

        cy.contains(updatedName).should('be.visible');
    });

    it('should search for a veterinarian', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy="table-row-0"]').length > 0) {
                cy.get('[data-cy="table-row-0"] td').eq(1).then(($td) => {
                    const lastName = $td.text().trim();
                    cy.get('[data-cy="table-search-input"]').clear().type(lastName);
                    cy.wait('@getVeterinarians');
                    cy.get('[data-cy="table-row-0"]').should('contain', lastName);
                });
            }
        });
    });

    it('should delete a veterinarian', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy^="table-row-"]').length > 0) {
                cy.get('[data-cy^="table-row-"]').first().then(($row) => {
                    const lastName = $row.find('td').eq(1).text();
                    cy.wrap($row).find('[data-cy^="delete-btn-"]').click();
                    cy.get('[data-cy="generic-modal-save-btn"]').click();
                    cy.wait('@deleteVeterinarian');
                    cy.wait('@getVeterinarians');
                    cy.contains(lastName).should('not.exist');
                });
            }
        });
    });

    afterEach(() => {
        cy.get('body').then(($body) => {
            if ($body.find('.MuiDialog-container').length > 0) {
                cy.get('body').type('{esc}');
            }
        });
        cy.logout();
    });
});