<content>describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should require minimum 12 characters for password', () => {
    // Try short password
    cy.get('input[type="password"]').type('short')
    cy.contains('button', 'Anmelden').click()
    cy.contains('Das Passwort muss mindestens 12 Zeichen lang sein').should('be.visible')
  })

  it('should show error for incorrect password', () => {
    cy.get('input[type="password"]').type('wrongpassword12')
    cy.contains('button', 'Anmelden').click()
    cy.contains('Ungültiges Passwort').should('be.visible')
  })

  it('should login successfully with correct password', () => {
    cy.get('input[type="password"]').type('PVSHolding2024!')
    cy.contains('button', 'Anmelden').click()
    cy.url().should('include', '/')
  })

  it('should redirect to login when accessing protected route', () => {
    cy.visit('/patients')
    cy.url().should('include', '/login')
  })

  it('should logout successfully', () => {
    // Login first
    cy.get('input[type="password"]').type('PVSHolding2024!')
    cy.contains('button', 'Anmelden').click()

    // Click logout
    cy.contains('button', 'Abmelden').click()

    // Should redirect to login
    cy.url().should('include', '/login')

    // Should not be able to access protected route
    cy.visit('/patients')
    cy.url().should('include', '/login')
  })
})</content>