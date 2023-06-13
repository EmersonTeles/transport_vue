describe('Get Best Transport', () => {
  it('visits the app root url', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.contains('h1', 'Nenhum dado selecionado.')
  })

  it('Try to submit with inputs empty', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.get('.v-btn__content').click()
    cy.contains('div', 'Insira os valores para realizar a análise.')
  })

  it('Shipping to Sao Paulo with 50kg', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.intercept('GET', '/transport?city=S%C3%A3o%20Paulo').as('getTransports')
    cy.get(
      ':nth-child(1) > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input'
    ).click()
    cy.get('.v-list-item:nth-child(1)').click()
    cy.get('#input-3').type('50')
    cy.get('.v-btn__content').click()
    cy.wait('@getTransports')
    cy.get('.BestTransport_options > :nth-child(1) > div > :nth-child(2)').contains(
      'Transportadora: LevoJa'
    )
    cy.get(':nth-child(2) > div > p').contains('R$ 104,50')
  })

  it('Shipping to Belo Horizonte with 101kg', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.get(
      ':nth-child(1) > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input'
    ).click()
    cy.get('.v-list-item:nth-child(2)').click()
    cy.get('#input-3').type('101')
    cy.get('.v-btn__content').click()

    cy.get(':nth-child(2) > div > p').contains('R$ 122,21')
    cy.get('.BestTransport_options > :nth-child(3) > div > :nth-child(2)').contains(
      'Transportadora: Expresso Oriente'
    )
  })
  it('Shipping to Belo Horizonte with no weight', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.get(
      ':nth-child(1) > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input'
    ).click()
    cy.get('.v-list-item:nth-child(2)').click()
    cy.get('.v-btn__content').click()
    cy.contains('div', 'Insira os valores para realizar a análise.')
  })
})
