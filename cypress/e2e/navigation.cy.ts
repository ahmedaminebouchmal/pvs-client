describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate through all main routes', () => {
    // Check Dashboard
    cy.contains('h1', 'Dashboard').should('be.visible')
    cy.contains('Gesamtpatienten').should('be.visible')

    // Navigate to Patients
    cy.contains('Patienten').click()
    cy.url().should('include', '/patients')
    cy.contains('h1', 'Patienten').should('be.visible')

    // Navigate to Appointments
    cy.contains('Termine').click()
    cy.url().should('include', '/appointments')
    cy.contains('h1', 'Termine').should('be.visible')

    // Navigate to Staff
    cy.contains('Personal').click()
    cy.url().should('include', '/staff')
    cy.contains('h1', 'Personalverwaltung').should('be.visible')

    // Navigate to Billing
    cy.contains('Abrechnung').click()
    cy.url().should('include', '/billing')
    cy.contains('h1', 'Abrechnung').should('be.visible')
  })

  it('should toggle sidebar', () => {
    // Check if sidebar is visible
    cy.get('aside').should('be.visible')
    
    // Click toggle button
    cy.get('button').contains('chevron-left').click()
    
    // Check if sidebar is hidden
    cy.get('aside').should('have.class', '-translate-x-64')
    
    // Click toggle button again
    cy.get('button').contains('chevron-right').click()
    
    // Check if sidebar is visible again
    cy.get('aside').should('not.have.class', '-translate-x-64')
  })
})