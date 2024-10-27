/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(email: string, password: string): Chainable<void>;
      clearGraphQLCache(): Chainable<void>;
      clearAuthData(): Chainable<void>;
      mockGraphQLResponse(operationName: string, response: any): Chainable<void>;
      waitForGraphQLResponse(operationName: string): Chainable<AUTWindow>;
    }
  }
}

// Authentication commands
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.window().then((win) => {
    // Clear any existing auth data
    win.localStorage.removeItem('auth-token');
    win.localStorage.removeItem('user-data');
  });

  // Visit login page and perform login
  cy.visit('/login');
  cy.get('[data-cy="email-input"]').type(email);
  cy.get('[data-cy="password-input"]').type(password);
  cy.get('[data-cy="login-button"]').click();

  // Wait for login response and token storage
  cy.intercept('POST', '/graphql', (req) => {
    return req.body.operationName === 'login';
  }).as('loginRequest');

  cy.wait('@loginRequest').then(() => {
    cy.window().its('localStorage')
      .invoke('getItem', 'auth-token')
      .should('exist');
  });
});

// GraphQL related commands
Cypress.Commands.add('clearGraphQLCache', () => {
  cy.window().then((win: any) => {
    // Clear Apollo Client cache
    if (win.__APOLLO_CLIENT__) {
      win.__APOLLO_CLIENT__.resetStore();
    }
    
    // Clear any stored GraphQL data
    win.localStorage.removeItem('apollo-cache-persist');
  });
});

// Authentication data cleanup
Cypress.Commands.add('clearAuthData', () => {
  cy.window().then((win) => {
    win.localStorage.removeItem('auth-token');
    win.localStorage.removeItem('user-data');
    win.localStorage.removeItem('apollo-cache-persist');
  });
  
  // Clear cookies if you're using them
  cy.clearCookies();
});

// Mock GraphQL responses for testing
Cypress.Commands.add('mockGraphQLResponse', (operationName: string, response: any) => {
  cy.intercept('POST', '/graphql', (req) => {
    if (req.body.operationName === operationName) {
      req.reply({
        statusCode: 200,
        body: {
          data: response
        }
      });
    }
  });
});

// Wait for GraphQL operations
Cypress.Commands.add('waitForGraphQLResponse', (operationName: string) => {
  cy.intercept('POST', '/graphql', (req) => {
    return req.body.operationName === operationName;
  }).as(`${operationName}Request`);
  
  return cy.wait(`@${operationName}Request`);
});

// This ensures the commands are added to the global Cypress namespace
export {};