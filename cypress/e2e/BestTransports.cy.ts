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
    cy.get(
      ':nth-child(1) > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input'
    ).click()
    cy.get('.v-list-item:nth-child(1)').click()
    cy.get('#input-3').type('50')
    cy.get('.v-btn__content').click()
  })

  it('Shipping to Belo Horizonte with 101kg', () => {
    cy.visit('http://127.0.0.1:5173/')
    cy.get(
      ':nth-child(1) > .v-input > .v-input__control > .v-field > .v-field__field > .v-field__input'
    ).click()
    cy.get('.v-list-item:nth-child(2)').click()
    cy.get('#input-3').type('101')
    cy.get('.v-btn__content').click()
  })
})
