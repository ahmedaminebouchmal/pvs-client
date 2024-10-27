describe('Billing Management', () => {
  beforeEach(() => {
    cy.visit('/billing')
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetBills') {
        req.reply({
          data: {
            bills: [
              {
                id: 1,
                patientName: 'Hans Müller',
                date: '2024-03-15',
                totalAmount: 150.00,
                status: 'Ausstehend',
                items: [
                  { description: 'Konsultation', amount: 150.00 }
                ]
              }
            ]
          }
        })
      }
    })
  })

  it('should display bills list', () => {
    cy.contains('Abrechnung').should('be.visible')
    cy.contains('Hans Müller').should('be.visible')
    cy.contains('150,00').should('be.visible')
  })

  it('should open and close new bill form', () => {
    cy.contains('Neue Rechnung erstellen').click()
    cy.contains('Neue Rechnung erstellen').should('be.visible')
    
    // Check form fields
    cy.get('input[type="text"]').first().should('be.visible')
    cy.get('input[type="date"]').should('be.visible')
    
    // Close modal
    cy.contains('Abbrechen').click()
    cy.contains('Neue Rechnung erstellen').should('not.exist')
  })

  it('should create new bill', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateBill') {
        req.reply({
          data: {
            createBill: {
              id: 2,
              patientName: 'Maria Schmidt',
              date: '2024-03-16',
              totalAmount: 200.00,
              status: 'Ausstehend',
              items: [
                { description: 'Untersuchung', amount: 200.00 }
              ]
            }
          }
        })
      }
    })

    cy.contains('Neue Rechnung erstellen').click()
    
    // Fill form
    cy.get('input[placeholder="Patient Name"]').type('Maria Schmidt')
    cy.get('input[type="date"]').type('2024-03-16')
    cy.get('input[placeholder="Description"]').type('Untersuchung')
    cy.get('input[placeholder="Amount"]').type('200')
    cy.get('select').select('Cash')
    
    // Submit form
    cy.contains('Create Bill').click()
    
    // Verify success
    cy.contains('Maria Schmidt').should('be.visible')
    cy.contains('200,00').should('be.visible')
  })
})