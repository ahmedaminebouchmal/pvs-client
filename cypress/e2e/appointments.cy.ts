describe('Appointments Management', () => {
  beforeEach(() => {
    cy.visit('/appointments')
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'GetAppointments') {
        req.reply({
          data: {
            appointments: [
              {
                id: 1,
                patientName: 'Hans Müller',
                doctorName: 'Dr. Schmidt',
                date: '2024-03-20',
                time: '10:00',
                status: 'Geplant'
              }
            ]
          }
        })
      }
    })
  })

  it('should display appointments list', () => {
    cy.contains('Termine').should('be.visible')
    cy.contains('Hans Müller').should('be.visible')
    cy.contains('Dr. Schmidt').should('be.visible')
  })

  it('should open and close new appointment form', () => {
    cy.contains('Termin vereinbaren').click()
    cy.contains('Termin vereinbaren').should('be.visible')
    
    // Check form fields
    cy.get('input[type="text"]').first().should('be.visible')
    cy.get('input[type="date"]').should('be.visible')
    cy.get('input[type="time"]').should('be.visible')
    
    // Close modal
    cy.contains('Abbrechen').click()
    cy.contains('Termin vereinbaren').should('not.exist')
  })

  it('should schedule new appointment', () => {
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'CreateAppointment') {
        req.reply({
          data: {
            createAppointment: {
              id: 2,
              patientName: 'Maria Schmidt',
              doctorName: 'Dr. Weber',
              date: '2024-03-21',
              time: '11:00',
              status: 'Geplant'
            }
          }
        })
      }
    })

    cy.contains('Termin vereinbaren').click()
    
    // Fill form
    cy.get('input[placeholder="Patient Name"]').type('Maria Schmidt')
    cy.get('input[placeholder="Doctor Name"]').type('Dr. Weber')
    cy.get('input[type="date"]').type('2024-03-21')
    cy.get('input[type="time"]').type('11:00')
    
    // Submit form
    cy.contains('Termin vereinbaren').click()
    
    // Verify success
    cy.contains('Maria Schmidt').should('be.visible')
    cy.contains('Dr. Weber').should('be.visible')
  })
})