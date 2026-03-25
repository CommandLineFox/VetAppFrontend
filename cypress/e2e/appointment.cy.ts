describe('Appointment Management - Dashboard', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/appointment*').as('getAppointments');
        cy.intercept('POST', '**/appointment').as('createAppointment');
        cy.intercept('PUT', '**/appointment/*').as('updateAppointment');
        cy.intercept('DELETE', '**/appointment/*').as('deleteAppointment');
        cy.intercept('GET', '**/patient*').as('getPatients');
        cy.intercept('GET', '**/veterinarian*').as('getVeterinarians');

        cy.fixture('user').then((user) => {
            cy.loginAndSetup(user.validUser);
        });

        cy.visit('/');
        cy.wait('@getAppointments');
    });

    it('should create a new appointment from dashboard', () => {
        cy.get('[data-cy="table-create-btn"]').click();
        cy.wait(['@getPatients', '@getVeterinarians']);

        cy.get('[data-cy="appointment-date-input"]').should('be.visible').type('2026-05-20T10:30');

        cy.get('[data-cy="appointment-patient-select"]').click();
        cy.get('[role="listbox"] li').first().click();

        cy.get('[data-cy="appointment-veterinarian-select"]').click();
        cy.get('[role="listbox"] li').first().click();

        cy.get('[data-cy="appointment-description-input"]')
            .scrollIntoView()
            .type('Redovna vakcinacija');

        cy.get('[data-cy="appointment-form-submit"]')
            .scrollIntoView()
            .should('not.be.disabled')
            .click();

        cy.wait('@createAppointment');
        cy.wait('@getAppointments');
    });

    it('should delete an appointment from dashboard', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy^="table-row-"]').length > 0) {
                cy.get('[data-cy="table-row-0"] td').first().then(($td) => {
                    const patientName = $td.text().trim();

                    cy.get('[data-cy^="table-row-"]').first().within(() => {
                        cy.get('[data-cy^="delete-btn-"]').click();
                    });

                    cy.get('[data-cy="generic-modal-save-btn"]').should('be.visible').click();

                    cy.wait('@deleteAppointment');
                    cy.wait('@getAppointments');
                    cy.contains(patientName).should('not.exist');
                });
            }
        });
    });

    it('should filter appointments using the calendar', () => {
        cy.get('.MuiPickersDay-root').not('.Mui-selected').first().click();
        cy.get('table').should('be.visible');
    });

    it('should search for an appointment in the table', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy="table-row-0"]').length > 0) {
                cy.get('[data-cy="table-row-0"] td').first().then(($td) => {
                    const name = $td.text().trim();
                    cy.get('[data-cy="table-search-input"]').clear().type(name);
                    cy.wait('@getAppointments');
                    cy.get('table').should('contain', name);
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