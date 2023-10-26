/// <reference types="cypress"/>

const toastersData = [
  {
    myArgum: {
      position: "top-right",
      title: "First title",
      content: "It's my first content",
      time: "1000", 
      type: "primary"
    },
    expected: {
      icon: "email",
      title: "First title",
      content: "It's my first content",
      color: "rgb(233, 29, 99)",
      position: {
        justifyContent: "flex-end",
        alignItems: "flex-start"
      }
    }
  },
  {
    myArgum: {
      position: "top-left",
      title: "Second title",
      content: "It's my second content",
      time: "1000", 
      type: "success"
    },
    expected: {
      icon: "checkmark",
      title: "Second title",
      content: "It's my second content",
      color: "rgb(96, 175, 32)",
      position: {
        justifyContent: "flex-start",
        alignItems: "flex-start"
      }
    }
  },
  {
    myArgum: {
      position: "bottom-left",
      title: "Third title",
      content: "It's my third content",
      time: "1000", 
      type: "info"
    },
    expected: {
      icon: "question-mark",
      title: "Third title",
      content: "It's my third content",
      color: "rgb(4, 149, 238)",
      position: {
        justifyContent: "flex-start",
        alignItems: "flex-end"
      }
    }
  },
  {
    myArgum: {
      position: "bottom-right",
      title: "Fourth title",
      content: "It's my fourth content",
      time: "1000", 
      type: "warning"
    },
    expected: {
      icon: "alert-triangle",
      title: "Fourth title",
      content: "It's my fourth content",
      color: "rgb(255, 159, 5)",
      position: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
      }
    }
  }
]

describe('Tests for toasters', () => {
  beforeEach('Steps to toaster menu', () => {
    cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/');
    cy.get('[alt="Material Dark Theme"]').click();
    cy.get('[title="Modal & Overlays"]').click();
    cy.get('[title="Toastr"]').click();
  });

 toastersData.forEach(({ myArgum, expected}) => {

  it(`Test for toasters, where we see position ${myArgum.position} and type ${myArgum.type}`, () => {

    cy.get('nb-card-header').should('include.text', 'Toaster configuration');
    cy.get('.mat-ripple.position-select.appearance-outline.size-medium.status-basic.shape-rectangle.nb-transition').click();
    cy.get(`[ng-reflect-value="${myArgum.position}"]`).click();
    cy.get(`[name="title"]`).clear().type(`${myArgum.title}`);
    cy.get('[name="content"]').clear().type(`${myArgum.content}`);
    cy.get('[name="timeout"]').clear().type(`${myArgum.time}`);
    cy.get('div.form-group button.select-button:contains("primary")').click();
    cy.get(`[ng-reflect-value="${myArgum.type}"]`).click();
    cy.get('nb-card-footer button:contains("Show toast")').click();
    cy.get('[ng-reflect-toast="[object Object]"]', )
      .then(toast => {
        expect(toast).to.contain(myArgum.title);
        expect(toast).to.contain(myArgum.content);
        expect(toast).to.contain(myArgum.title);
        expect(toast).to.have.css('background-color', `${expected.color}`);
        cy.wrap(toast).find(`g[data-name=${expected.icon}]`).should('exist');  
        cy.wrap(toast).parents('.toastr-overlay-container')
          .should('have.css', 'justify-content').and('eq', expected.position.justifyContent);
        cy.wrap(toast).parents('.toastr-overlay-container')
          .should('have.css','align-items').and('eq', expected.position.alignItems);


      })

    })
    
  })

})

