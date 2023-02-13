/// <reference types="Cypress" />
describe('Site', () => {
  const password = Cypress.env("password");

  it('triggers alert if you want to bookmark without login', () => {
    cy.visit('http://localhost:5173/');
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.scrollTo(0,500)
    cy.scrollTo(0,0)
    cy.wait(1000)
    cy.get('[data-cy="bookmark"]').first().click({force:true}).then(()=>{
      expect(stub.getCall(0)).to.be.calledWith('Please log in to bookmark jokes') 
    })
  })
  it("should login with valid creds",()=>{
    cy.visit('http://localhost:5173/');
    cy.wait(1000)
    cy.get("a").first().click()
    cy.url().should("contain","/login")
    cy.get("input[type='email']").type("Tester@test.com")
    cy.get("input[type='password']").type(password)
    cy.get("input[type='button']").first().click()
    cy.url().should("contain","/my-jokes")

  })
  it("should not have bookmarked jokes",()=>{
    cy.visit('http://localhost:5173/login');
    cy.wait(1000)
    cy.get("input[type='email']").type("Tester@test.com")
    cy.get("input[type='password']").type(password)
    cy.get("input[type='button']").first().click()
    cy.url().should("contain","/my-jokes")
    cy.get("a").should("contain","Homepage")
  })
  it("should be able to bookmark jokes",()=>{
    cy.visit('http://localhost:5173/');
    cy.wait(1000)
    cy.get("a").first().click()
    cy.url().should("contain","/login")
    cy.get("input[type='email']").type("Tester@test.com")
    cy.get("input[type='password']").type(password)
    cy.get("input[type='button']").first().click()
    cy.url().should("contain","/my-jokes")
    cy.get("a").click();

    //select joke
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('[data-cy="bookmark"]').first().click({force:true})
    expect(stub).not.called

  })

  it("should remove bookmarked jokes",()=>{
    cy.visit('http://localhost:5173/login');
    cy.wait(1000)
    cy.get("input[type='email']").type("Tester@test.com")
    cy.get("input[type='password']").type(password)
    cy.get("input[type='button']").first().click()
    cy.get('[data-cy="bookmark"]').first().click();
    cy.get("a").should("contain","Homepage")
  })

  it("should be able to logout",()=>{
    cy.visit('http://localhost:5173/login');
    cy.wait(1000)
    cy.get("input[type='email']").type("Tester@test.com")
    cy.get("input[type='password']").type(password)
    cy.get("input[type='button']").first().click()
    cy.get("button").first().click();
    cy.url().should("include","/")//This might not be the best check in retorperspective
  })
})
