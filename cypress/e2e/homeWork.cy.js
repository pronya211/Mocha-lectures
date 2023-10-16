describe('multiple search tests', () => {

  const searchTerms = [
    {
      testData: {
        email: "testuser1@gmail.com",
        password: "testpassword1"
      }
    },
    {
      testData: {
        email: "testuser2@gmail.com",
        password: "testpassword2"
      }
    },
    {
      testData: {
        email: "testuser3@gmail.com",
        password: "testpassword3"
      }
    },
    {
      testData: {
        email: "testuser4@gmail.com",
        password: "testpassword4"
      }
    },
    {
      testData: {
        email: "testuser5@gmail.com",
        password: "testpassword5"
      }
    }
  ]

  searchTerms.forEach(searchTerm => {
    it(`Fill form with email ${searchTerm.testData.email} and password ${searchTerm.testData.password}`, () => {
      cy.visit('https://sanitarskyi-ngx-admin.herokuapp.com/');

      cy.get('[alt="Material Dark Theme"]').click();
      cy.get('.menu-title.ng-tns-c141-9').click();
      cy.get('.menu-title.ng-tns-c141-11').click();
      cy.get('[id="inputEmail1"]').type(searchTerm.testData.email);
      cy.get('[id="inputPassword2"]').type(searchTerm.testData.password);
    })
  })

})

