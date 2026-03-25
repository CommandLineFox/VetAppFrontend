describe('Owner Management', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/owner*').as('getOwners');
        cy.intercept('POST', '**/owner').as('createOwner');
        cy.intercept('PUT', '**/owner/*').as('updateOwner');
        cy.intercept('DELETE', '**/owner/*').as('deleteOwner');

        cy.fixture('user').then((user) => {
            cy.loginAndSetup(user.validUser);
        });

        cy.visit('/owners');
        cy.wait('@getOwners');
    });

    it('should display the owners table', () => {
        cy.get('table').should('be.visible');
    });

    it('should create a new owner', () => {
        const uniqueId = Date.now().toString().slice(-6);
        const owner = {
            firstName: 'Petar',
            lastName: `Petrović ${uniqueId}`,
            jmbg: `1205990${uniqueId}`,
            email: `owner${uniqueId}@example.com`,
            phone: '0641234567',
            address: 'Ulica Breza 12'
        };

        cy.get('[data-cy="table-create-btn"]').click();

        cy.get('[data-cy="owner-first-name-input"]').type(owner.firstName);
        cy.get('[data-cy="owner-last-name-input"]').type(owner.lastName);
        cy.get('[data-cy="owner-jmbg-input"]').type(owner.jmbg);
        cy.get('[data-cy="owner-email-input"]').type(owner.email);
        cy.get('[data-cy="owner-phone-input"]').type(owner.phone);
        cy.get('[data-cy="owner-address-input"]').type(owner.address);

        cy.get('[data-cy="owner-form-submit"]').click();

        cy.wait('@createOwner');
        cy.wait('@getOwners');

        cy.contains(owner.lastName).should('be.visible');
    });

    it('should edit an existing owner', () => {
        const updatedPhone = '065999888';

        cy.get('[data-cy^="table-row-"]').first().within(() => {
            cy.get('[data-cy^="edit-btn-"]').click();
        });

        cy.get('[data-cy="owner-phone-input"]').clear().type(updatedPhone);
        cy.get('[data-cy="owner-form-submit"]').click();

        cy.wait('@updateOwner');
        cy.wait('@getOwners');

        cy.get('[data-cy="owner-form"]').should('not.exist');
    });

    it('should search for an owner by JMBG', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy="table-row-0"]').length > 0) {
                cy.get('[data-cy="table-row-0"] td').eq(2).then(($td) => {
                    const jmbg = $td.text().trim();

                    cy.get('[data-cy="table-search-input"]').clear().type(jmbg);
                    cy.wait('@getOwners');

                    cy.get('[data-cy="table-row-0"]').should('contain', jmbg);
                });
            }
        });
    });

    it('should delete an owner', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy^="table-row-"]').length > 0) {
                cy.get('[data-cy^="table-row-"]').first().then(($row) => {
                    const lastName = $row.find('td').eq(1).text();

                    cy.wrap($row).find('[data-cy^="delete-btn-"]').click();
                    cy.get('[data-cy="generic-modal-save-btn"]').click();

                    cy.wait('@deleteOwner');
                    cy.wait('@getOwners');

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