describe('Species Management', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/species*').as('getSpecies');
        cy.intercept('POST', '**/species').as('createSpecies');
        cy.intercept('PUT', '**/species/*').as('updateSpecies');
        cy.intercept('DELETE', '**/species/*').as('deleteSpecies');

        cy.fixture('user').then((user) => {
            cy.loginAndSetup(user.validUser);
        });

        cy.visit('/species');
        cy.wait('@getSpecies');
    });

    it('should display the table with data', () => {
        cy.get('table').should('be.visible');

        cy.get('[data-cy="table-pagination"]').should('be.visible');

        cy.get('body').then(($body) => {
            const hasRows = $body.find('[data-cy^="table-row-"]').length > 0;
            if (hasRows) {
                cy.get('[data-cy^="table-row-"]').first().should('be.visible');
            } else {
                cy.get('[data-cy="table-no-data"]').should('be.visible');
            }
        });
    });

    it('should create a new species', () => {
        const uniqueName = `Dog-${Date.now()}`;

        cy.get('[data-cy="table-create-btn"]').click();

        cy.get('[data-cy="species-name-input"]').type(uniqueName);
        cy.get('[data-cy="species-form-submit"]').click();

        cy.wait('@createSpecies');
        cy.wait('@getSpecies');

        cy.get('[data-cy="species-form"]').should('not.exist');
        cy.contains(uniqueName).should('be.visible');
    });

    it('should edit an existing species', () => {
        const uniqueSuffix = Date.now().toString();
        const updatedName = `Updated-${uniqueSuffix}`;

        cy.get('[data-cy^="table-row-"]').first().within(() => {
            cy.get('[data-cy^="edit-btn-"]').click();
        });

        cy.get('[data-cy="species-name-input"]').clear().type(updatedName);
        cy.get('[data-cy="species-form-submit"]').click();

        cy.wait('@updateSpecies');
        cy.wait('@getSpecies');

        cy.get('[data-cy="species-form"]').should('not.exist');
        cy.contains(updatedName).should('be.visible');
    });

    it('should delete a species', () => {
        cy.get('[data-cy^="table-row-"]').first().then(($row) => {
            const speciesName = $row.find('td').first().text();

            cy.wrap($row).find('[data-cy^="delete-btn-"]').click();

            cy.get('[data-cy="generic-modal-title"]').should('contain', 'Delete');
            cy.get('[data-cy="generic-modal-save-btn"]').click();

            cy.wait('@deleteSpecies');
            cy.wait('@getSpecies');

            cy.get('[data-cy="generic-modal"]').should('not.exist');
            cy.contains(speciesName).should('not.exist');
        });
    });

    it('should search for a species', () => {
        cy.intercept('GET', '**/species*').as('getSpeciesSearch');

        cy.get('[data-cy="table-search-input"]').clear().type('Do');

        cy.wait('@getSpeciesSearch');

        cy.get('[data-cy="table-row-0"]')
            .should('be.visible')
            .and('contain', 'Dog');
    });

    afterEach(() => {
        cy.logout();
    });
});