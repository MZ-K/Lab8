describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/Part2-Cypress/');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-slider').then(function($el) {
      expect($el).to.have.value(75);
    });
  });

  it('Volume input changes when Slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#volume-number').then(function ($el) {
      expect($el).to.have.value(33);
    });
  });

  it('Volume audio element changes when Slider changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#horn-sound').then(function ($el) {
      expect($el).to.have.prop('volume', 0.33);
    });
  });

  it('Image and Sound sources changes when the Party Horn radio button is selected', () => {
    cy.get('#radio-party-horn').trigger('change');
    cy.get('#sound-image').then(function ($el) {
      expect($el).to.have.attr('src', './assets/media/images/party-horn.svg');
    });
    cy.get('#horn-sound').then(function ($el) {
      expect($el).to.have.attr('src', './assets/media/audio/party-horn.mp3');
    });
  });

  it('Volume Image changes when Volume increases', () => {
    
    cy.get('#volume-number').clear().type('25');
    cy.get('#volume-image').then(function ($el) {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg');
    });

    cy.get('#volume-number').clear().type('50');
    cy.get('#volume-image').then(function ($el) {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg');
    });

    cy.get('#volume-number').clear().type('75');
    cy.get('#volume-image').then(function ($el) {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg');
    });
    
  });

  it('Honk button is disabled when textbox input is empty or a non-number', () => {
    cy.get('#volume-number').clear().type('50');
    cy.get('#honk-btn').then(function ($el) {
      expect($el).to.not.have.attr('disabled', 'disabled');
    });

    cy.get('#volume-number').clear().type('qwerty');
    cy.get('#honk-btn').then(function ($el) {
      expect($el).to.have.attr('disabled', 'disabled');
    });

    cy.get('#volume-number').clear();
    cy.get('#honk-btn').then(function ($el) {
      expect($el).to.have.attr('disabled', 'disabled');
    });
  });

  it('Error is shown when a number outside the given range of the volume textbook input is typed', () => {
    cy.get('#volume-number').clear().type('101');
    cy.get('#party-horn-form').within(() => {
      cy.get('input:invalid').should('have.length', 1)
    });

    cy.get('#volume-number').clear().type('-1');
    cy.get('#party-horn-form').within(() => {
      cy.get('input:invalid').should('have.length', 1)
    });

    cy.get('#volume-number').clear().type('1000');
    cy.get('#party-horn-form').within(() => {
      cy.get('input:invalid').should('have.length', 1)
    });
  });
});
