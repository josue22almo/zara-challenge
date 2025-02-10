/// <reference types="cypress" />

describe('Marvel characters', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  describe('Home screen', () => {
    it('See 50 marvel characters', () => {
      checkNumberOfVisibleCharacters(50)
    })
  
    it('Like a character', () => {
      checkNumberOfFavorites(0)
  
      toggleCharacterLike(0)
  
      checkNumberOfFavorites(1)
  
      toggleCharacterLike(0)
  
      checkNumberOfFavorites(0)
    })
  
    it('See favorites', () => {
      toggleCharacterLike(0)
      toggleCharacterLike(1)
  
      seeFavorites()
  
      cy.get('[data-testid^="character-card-"]').should('have.length', 2)
    })
  
    it('See all characters after clicking the app logo', () => {
      toggleCharacterLike(0)
      toggleCharacterLike(1)
  
      seeFavorites()
      
      checkNumberOfVisibleCharacters(2)
  
      clickLogo()
  
      checkNumberOfVisibleCharacters(50)
    })

    it("Filter characters by name", () => {
      searchCharacter('Adam Warlock')

      checkNumberOfVisibleCharacters(1)
    })

    it('Keep favorites after reloading the page', () => {
      toggleCharacterLike(0)
      toggleCharacterLike(1)
      toggleCharacterLike(2)

      checkNumberOfFavorites(3)

      cy.reload()

      checkNumberOfFavorites(3)

      visitCharacter(0)

      toggleCharacterLike(0)

      cy.reload()

      checkNumberOfFavorites(2)

      checkCharacterLike(0, true)

      clickLogo()

      checkNumberOfFavorites(2)
    })
  })

  describe('Character screen', () => {
    it('See character details', () => {
      searchCharacter('Adam Warlock')

      visitCharacter(0)

      cy.get('[data-testid="character-name"]').should('have.text', 'Adam Warlock')

      cy.get('[data-testid="character-description"]')
        .should('have.text', 'Adam Warlock is an artificially created human who was born in a cocoon at a scientific complex called The Beehive.')
    })

    it('Toggle like and unlike', () => {
      searchCharacter('Adam Warlock')

      visitCharacter(0)
      
      checkCharacterLike(0, false)

      toggleCharacterLike(0)

      checkCharacterLike(0, true)

      checkNumberOfFavorites(1)
    })

    it('See the character appearances, less than 20', () => {
      searchCharacter('Adam Warlock')

      visitCharacter(0)
      
      checkCharacterAppearancesLessThan(20)
    })
  })


  describe('Toggle mode', () => {
    it('Toggle dragon ball mode and see 50 characters', () => {
      checkMode('Marvel')

      toggleMode()

      checkMode('Dragon Ball')

      checkNumberOfVisibleCharacters(50)

      toggleMode()

      checkMode('Marvel')

      checkNumberOfVisibleCharacters(50)
    })
  })
})

function checkCharacterAppearancesLessThan(numberOfAppearances: number) {
  cy.get('[data-testid^="appearance-card-"]').should('have.length.lt', numberOfAppearances)
}

function searchCharacter(name: string) {
  cy.get('[data-testid="search-wrapper"]').type(name)
}

function checkMode(mode: 'Marvel' | 'Dragon Ball') {
  getModeSwitch().should('have.text', mode)
}

function toggleMode() {
  getModeSwitchButton().click()
}

function getModeSwitch() {
  return cy.get('[data-testid="header-mode-switch"]')
}

function getModeSwitchButton() {
  return cy.get('[data-testid="header-mode-switch-button"]')
}

function toggleCharacterLike(index: number) {
  cy.get('[data-testid^="character-favorite-button-"]').eq(index).click()
}

function checkCharacterLike(index: number, isLiked: boolean) {
  cy.get('[data-testid^="character-favorite-button-"]')
    .eq(index)
    .get('[data-testid="heart-icon"]')
    .should('have.class', isLiked ? 'fill-[var(--primary)]' : 'stroke-white stroke-2')
}

function visitCharacter(index: number) {
  cy.get('[data-testid^="character-card-"]').eq(index).click()
}

function seeFavorites() {
  getFavoritesIcon().click()
}

function checkNumberOfFavorites(numberOfFavorites: number) {
  getFavoritesIcon().should('contain.text', numberOfFavorites)
}

function checkNumberOfVisibleCharacters(numberOfCharacters: number) {
  cy.get('[data-testid^="character-card-"]').should('have.length', numberOfCharacters)
}

function getFavoritesIcon() {
  return cy.get('[data-testid="header-favorites-icon"]')
}

function clickLogo() {
  cy.get('[data-testid="app-icon-link"]').click()
}
