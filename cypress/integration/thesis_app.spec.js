describe("Thesis app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3001/api/testing/reset")
        const user = {
            username:"testuser",
            name:"test user",
            password:"test90" }
        cy.request("POST", "http://localhost:3001/api/users/", user)
        cy.visit("http://localhost:3000")
    })
    it("front page can be opened", function() {
        cy.contains("Login")
        cy.contains("Sign Up")
    })

    it("user can login", function() {
        cy.contains("Login").click()
        cy.get("#username").type("testuser")
        cy.get("#password").type("test90")
        cy.get("#login-button").click()

        cy.contains("testuser logged in")
    })

    it("a new user can be created and log in", function(){
        cy.contains("Sign Up").click()
        cy.get("#username").type("testuser2")
        cy.get("#name").type("test user")
        cy.get("#password").type("test90")
        cy.get("#signup-button").click()

        cy.contains("Login").click()
        cy.get("#username").type("testuser2")
        cy.get("#password").type("test90")
        cy.get("#login-button").click()

        cy.contains("testuser2 logged in")

    })
})