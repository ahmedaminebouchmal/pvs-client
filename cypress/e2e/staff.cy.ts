describe('Staff Management', () => {
  beforeEach(() => {
    cy.visit('/staff')
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetStaff') {
        req.reply({
          data: {
            staff: [
              {
                id: 1,
                name: 'Dr. Weber',
                role: 'Arzt',
                department: 'Kardiologie',
                contact: '+49123456789',
                status: 'Verfügbar'
              }
            ]
          }
        })
      }
    })
  })

  it('should display staff list', () => {
    cy.contains('Personalverwaltung').should('be.visible')
    cy.contains('Dr. Weber').should('be.visible')
    cy.contains('Kardiologie').should('be.visible')
  })

  it('should open and close new staff form', () => {
    cy.contains('Personal hinzufügen').click()
    cy.contains('Personal hinzufügen').should('be.visible')
    
    // Check form fields
    cy.get('input[type="text"]').first().should('be.visible')
    cy.get('select').should('have.length.at.least', 1)
    
    // Close modal
    cy.contains('Abbrechen').click()
    cy.contains('Personal hinzufügen').should('not.exist')
  })

  it('should add new staff member', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateStaff') {
        req.reply({
          data: {
            createStaff: {
              id: 2,
              name: 'Dr. Schmidt',
              role: 'Arzt',
              department: 'Pädiatrie',
              contact: '+49987654321',
              status: 'Verfügbar'
            }
          }
        })
      }
    })

    cy.contains('Personal hinzufügen').click()
    
    // Fill form
    cy.get('input[placeholder="Full Name"]').type('Dr. Schmidt')
    cy.get('select').first().select('Doctor')
    cy.get('select').eq(1).select('Pediatrics')
    cy.get('input[type="tel"]').type('+49987654321')
    cy.get('input[type="email"]').type('schmidt@example.com')
    
    // Submit form
    cy.contains('Add Staff Member').click()
    
    // Verify success
    cy.contains('Dr. Schmidt').should('be.visible')
    cy.contains('Pädiatrie').should('be.visible')
  })
})