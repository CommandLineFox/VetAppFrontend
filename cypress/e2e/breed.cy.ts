describe('Breed Management', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/breed*').as('getBreeds');
        cy.intercept('POST', '**/breed').as('createBreed');
        cy.intercept('PUT', '**/breed/*').as('updateBreed');
        cy.intercept('DELETE', '**/breed/*').as('deleteBreed');
        cy.intercept('GET', '**/api/species*').as('getSpeciesOptions');

        cy.fixture('user').then((user) => {
            cy.loginAndSetup(user.validUser);
        });

        cy.visit('/breeds');
        cy.wait('@getBreeds');
    });

    it('should display the breeds table', () => {
        cy.get('table').should('be.visible');
        cy.get('[data-cy="table-pagination"]').should('be.visible');
    });

    it('should create a new breed', () => {
        const breedName = `Golden Retriever ${Date.now()}`;

        cy.get('[data-cy="table-create-btn"]').click();
        cy.wait('@getSpeciesOptions');

        cy.get('[data-cy="breed-species-select"]').click();
        cy.get('[role="listbox"] li').first().click();

        cy.get('[data-cy="breed-name-input"]').type(breedName);
        cy.get('button[type="submit"]').click();

        cy.wait('@createBreed');
        cy.wait('@getBreeds');

        cy.contains(breedName).should('be.visible');
    });

    it('should edit an existing breed', () => {
        const updatedBreedName = `Updated Breed ${Date.now()}`;

        cy.get('[data-cy^="table-row-"]').first().within(() => {
            cy.get('[data-cy^="edit-btn-"]').click();
        });

        cy.get('[data-cy="breed-name-input"]').clear().type(updatedBreedName);
        cy.get('button[type="submit"]').click();

        cy.wait('@updateBreed');
        cy.wait('@getBreeds');

        cy.contains(updatedBreedName).should('be.visible');
    });

    it('should filter breeds by name', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy="table-row-0"]').length > 0) {
                cy.get('[data-cy="table-row-0"] td').first().then(($td) => {
                    const breedToSearch = $td.text().trim();

                    cy.get('[data-cy="table-search-input"]').clear().type(breedToSearch);
                    cy.wait('@getBreeds');

                    cy.get('[data-cy="table-row-0"]').should('contain', breedToSearch);
                });
            } else {
                cy.log('Table is empty, skipping search test');
            }
        });
    });

    it('should delete a breed', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy^="table-row-"]').length > 0) {
                cy.get('[data-cy^="table-row-"]').first().then(($row) => {
                    const name = $row.find('td').first().text();

                    cy.wrap($row).find('[data-cy^="delete-btn-"]').click();
                    cy.get('[data-cy="generic-modal-save-btn"]').click();

                    cy.wait('@deleteBreed');
                    cy.wait('@getBreeds');

                    cy.contains(name).should('not.exist');
                });
            } else {
                cy.log('No breeds to delete');
            }
        });
    });

    afterEach(() => {
        cy.logout();
    });
});