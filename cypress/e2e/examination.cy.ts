describe('Examination Management', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/examination*').as('getExaminations');
        cy.intercept('POST', '**/examination').as('createExamination');
        cy.intercept('PUT', '**/examination/*').as('updateExamination');
        cy.intercept('DELETE', '**/examination/*').as('deleteExamination');
        cy.intercept('GET', '**/patient*').as('getPatients');
        cy.intercept('GET', '**/veterinarian*').as('getVeterinarians');

        cy.fixture('user').then((user) => {
            cy.loginAndSetup(user.validUser);
        });

        cy.visit('/examinations');
        cy.wait('@getExaminations');
    });

    it('should create a new examination', () => {
        cy.get('[data-cy="table-create-btn"]').click();
        cy.wait(['@getPatients', '@getVeterinarians']);

        cy.get('[data-cy="examination-date-input"]').should('be.visible').type('2026-03-25T14:30');

        cy.get('[data-cy="examination-patient-select"]').click();
        cy.get('[role="listbox"] li').first().click();

        cy.get('[data-cy="examination-veterinarian-select"]').click();
        cy.get('[role="listbox"] li').first().click();

        cy.get('[data-cy="examination-anamnesis-input"]').type('Anamneza test');
        cy.get('[data-cy="examination-presentation-input"]').type('Klinicka slika test');
        cy.get('[data-cy="examination-diagnosis-input"]').type('Gastroenteritis');
        cy.get('[data-cy="examination-treatment-input"]').type('Terapija test');

        cy.get('[data-cy="examination-form-submit"]').should('not.be.disabled').click();

        cy.wait('@createExamination');
        cy.wait('@getExaminations');
        cy.contains('Gastroenteritis').should('be.visible');
    });

    it('should edit an existing examination diagnosis', () => {
        const updatedDiagnosis = `Dijagnoza ${Date.now()}`;

        cy.get('[data-cy^="table-row-"]').first().within(() => {
            cy.get('[data-cy^="edit-btn-"]').click();
        });

        cy.wait(['@getPatients', '@getVeterinarians']);

        cy.get('[data-cy="examination-diagnosis-input"]')
            .scrollIntoView()
            .should('be.visible')
            .clear()
            .type(updatedDiagnosis);

        cy.get('[data-cy="examination-form-submit"]').should('not.be.disabled').click();

        cy.wait('@updateExamination');
        cy.wait('@getExaminations');
        cy.contains(updatedDiagnosis).should('be.visible');
    });

    it('should search for an examination', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy="table-row-0"]').length > 0) {
                cy.get('[data-cy="table-row-0"] td').eq(2).then(($td) => {
                    const diagnosisText = $td.text().trim();
                    cy.get('[data-cy="table-search-input"]').clear().type(diagnosisText);
                    cy.wait('@getExaminations');
                    cy.get('[data-cy="table-row-0"]').should('contain', diagnosisText);
                });
            }
        });
    });

    it('should delete an examination', () => {
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy^="table-row-"]').length > 0) {
                cy.get('[data-cy^="table-row-"]').first().then(($row) => {
                    cy.wrap($row).find('[data-cy^="delete-btn-"]').click();
                    cy.get('[data-cy="generic-modal-save-btn"]').click();
                    cy.wait('@deleteExamination');
                    cy.wait('@getExaminations');
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