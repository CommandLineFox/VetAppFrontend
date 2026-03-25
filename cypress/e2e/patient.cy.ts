describe('Patient Management', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/patient*').as('getPatients');
        cy.intercept('POST', '**/patient').as('createPatient');
        cy.intercept('PUT', '**/patient/*').as('updatePatient');
        cy.intercept('DELETE', '**/patient/*').as('deletePatient');
        cy.intercept('GET', '**/owner*').as('getOwners');
        cy.intercept('GET', '**/breed*').as('getBreeds');

        cy.fixture('user').then((user) => {
            cy.loginAndSetup(user.validUser);
        });

        cy.visit('/patients');
        cy.wait('@getPatients');
    });

    it('should display the patients table', () => {
        cy.get('table').should('be.visible');
    });

    it('should create a new patient', () => {
        const patientName = `Rex ${Date.now()}`;

        cy.get('[data-cy="table-create-btn"]').click();
        cy.wait(['@getOwners', '@getBreeds']);

        cy.get('[data-cy="patient-name-input"]').type(patientName);

        cy.get('[data-cy="patient-owner-select"]').should('not.have.class', 'Mui-disabled').click();
        cy.get('[role="listbox"] li').first().click();

        cy.get('[data-cy="patient-breed-select"]').should('not.have.class', 'Mui-disabled').click();
        cy.get('[role="listbox"] li').first().click();

        cy.get('[data-cy="patient-birthdate-input"]').type('2023-01-01');

        cy.get('[data-cy="patient-gender-select"]').click();
        cy.get('[data-cy="gender-option-female"]').click();

        cy.get('[data-cy="patient-carton-input"]').type('12345');

        cy.get('[data-cy="patient-passport-input"]').type('RS12312312');

        cy.get('[data-cy="patient-microchip-input"]').type('111122211111111');

        cy.get('[data-cy="patient-form-submit"]').should('not.be.disabled').click();


        cy.wait('@createPatient');
        cy.wait('@getPatients');

        cy.contains(patientName).should('be.visible');
    });

    it('should edit an existing patient name', () => {
        const updatedName = `Max ${Date.now()}`;

        cy.get('[data-cy^="table-row-"]').first().within(() => {
            cy.get('[data-cy^="edit-btn-"]').click();
        });

        cy.wait(['@getOwners', '@getBreeds']);

        cy.get('[data-cy="patient-name-input"]').clear().type(updatedName);
        cy.get('[data-cy="patient-form-submit"]').should('not.be.disabled').click();

        cy.wait('@updatePatient');
        cy.wait('@getPatients');

        cy.contains(updatedName).should('be.visible');
    });

    it('should search for a patient by name', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy="table-row-0"]').length > 0) {
                cy.get('[data-cy="table-row-0"] td').first().then(($td) => {
                    const name = $td.text().trim();
                    cy.get('[data-cy="table-search-input"]').clear().type(name);
                    cy.wait('@getPatients');
                    cy.get('[data-cy="table-row-0"]').should('contain', name);
                });
            }
        });
    });

    it('should delete a patient', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy^="table-row-"]').length > 0) {
                cy.get('[data-cy^="table-row-"]').first().then(($row) => {
                    const name = $row.find('td').first().text();
                    cy.wrap($row).find('[data-cy^="delete-btn-"]').click();
                    cy.get('[data-cy="generic-modal-save-btn"]').click();
                    cy.wait('@deletePatient');
                    cy.wait('@getPatients');
                    cy.contains(name).should('not.exist');
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