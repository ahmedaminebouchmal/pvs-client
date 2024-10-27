describe('Patients Management', () => {
  beforeEach(() => {
    cy.visit('/patients')
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetPatients') {
        req.reply({
          data: {
            patients: [
              {
                id: 1,
                firstName: 'Hans',
                lastName: 'Müller',
                email: 'hans@example.com',
                phone: '+49123456789',
                lastVisit: '2024-03-15'
              }
            ]
          }
        })
      }
    })
  })

  it('should display patients list', () => {
    cy.contains('Patienten').should('be.visible')
    cy.contains('Hans Müller').should('be.visible')
    cy.contains('hans@example.com').should('be.visible')
  })

  it('should open and close new patient form', () => {
    cy.contains('Neuen Patienten hinzufügen').click()
    cy.contains('Neuen Patienten hinzufügen').should('be.visible')
    
    // Check form fields
    cy.get('input[type="text"]').first().should('be.visible')
    cy.get('input[type="email"]').should('be.visible')
    
    // Close modal
    cy.contains('Abbrechen').click()
    cy.contains('Neuen Patienten hinzufügen').should('not.exist')
  })

  it('should add new patient', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreatePatient') {
        req.reply({
          data: {
            createPatient: {
              id: 2,
              firstName: 'Maria',
              lastName: 'Schmidt',
              email: 'maria@example.com'
            }
          }
        })
      }
    })

    cy.contains('Neuen Patienten hinzufügen').click()
    
    // Fill form
    cy.get('input[placeholder="Vorname"]').type('Maria')
    cy.get('input[placeholder="Nachname"]').type('Schmidt')
    cy.get('input[type="email"]').type('maria@example.com')
    cy.get('input[type="tel"]').type('+49987654321')
    
    // Submit form
    cy.contains('Patient hinzufügen').click()
    
    // Verify success
    cy.contains('Maria Schmidt').should('be.visible')
  })
})