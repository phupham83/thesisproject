describe("Unauthenticated", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3001/api/testing/reset")
        const user = {
            email:"testuser@gmail.com",
            name:"test user",
            number: "+447374758436",
            password:"test90" }
        cy.request("POST", "http://localhost:3001/api/testing/signup", user)
        cy.visit("http://localhost:3000")
    })
    it("front page can be opened", function() {
        cy.contains("Login")
    })
    describe("Login", function() {
        it("wrong email are rejected", function() {
            cy.contains("Login").click()
            cy.get("#email").type("wronguser@gmail.com")
            cy.get("#password").type("test90")
            cy.get("#login-button").click()
            cy.contains("Wrong user")
        })
        it("wrong passwords are rejected", function() {
            cy.contains("Login").click()
            cy.get("#email").type("testuser@gmail.com")
            cy.get("#password").type("wrong90")
            cy.get("#login-button").click()
            cy.contains("Wrong password")
        })
        it("user can login with correct credentials", function() {
            cy.contains("Login").click()
            cy.get("#email").type("testuser@gmail.com")
            cy.get("#password").type("test90")
            cy.get("#login-button").click()

            cy.contains("Hi test user")
        })
    })
    describe("Sign up", function() {
        it("email must be unique", function() {
            cy.contains("Sign up").click()
            cy.get("#email").type("testuser@gmail.com")
            cy.get("#name").type("test user")
            cy.get("#number").type("+447374758422")
            cy.get("#password").type("test90")
            cy.get("#signup-button").click()

            cy.contains("expected `email` to be unique")
        })
        it("email must be valid", function() {
            cy.contains("Sign up").click()
            cy.get("#email").type("testuser")
            cy.get("#name").type("test user")
            cy.get("#number").type("+447374758422")
            cy.get("#password").type("test90")
            cy.get("#signup-button").click()

            cy.contains("Invalid email")
        })
        it("phone number must be valid", function() {
            cy.contains("Sign up").click()
            cy.get("#email").type("testuser2@gmail.com")
            cy.get("#name").type("test user")
            cy.get("#number").type("+4473")
            cy.get("#password").type("test90")
            cy.get("#signup-button").click()

            cy.contains("Invalid phone number")
        })
        it("password must be valid", function() {
            cy.contains("Sign up").click()
            cy.get("#email").type("testuser2@gmail.com")
            cy.get("#name").type("test user")
            cy.get("#number").type("+447374758422")
            cy.get("#password").type("t")
            cy.get("#signup-button").click()

            cy.contains("longer then 3")
        })

        it("and a new user can be created", function(){
            cy.contains("Sign up").click()
            cy.get("#email").type("testuser2@gmail.com")
            cy.get("#name").type("test user")
            cy.get("#number").type("+447374758422")
            cy.get("#password").type("test90")
            cy.get("#signup-button").click()

            cy.contains("Email Verification")

        })
    })
})
describe("Authenticated", function() {
    before(function() {
        cy.request("POST", "http://localhost:3001/api/testing/reset")
        const user = {
            email:"testuser@gmail.com",
            name:"test user",
            number: "+447374758436",
            password:"test90" }
        cy.request("POST", "http://localhost:3001/api/testing/signup", user)
        cy.visit("http://localhost:3000")
    })
    describe("elements renders", function() {
        it("the budget renders", function() {
            cy.contains("Login").click()
            cy.get("#email").type("testuser@gmail.com")
            cy.get("#password").type("test90")
            cy.get("#login-button").click()
            cy.contains("Loading")
            setTimeout(cy.contains("16167"), 120000)
        })
        it("the overview renders", function() {
            cy.contains("Overview").click()
            setTimeout(cy.contains("1237"), 120000)
        })
        it("the accounts renders", function() {
            cy.contains("Accounts").click()
            setTimeout(cy.contains("Test Bank"), 120000)
        })
        it("the transactions renders", function() {
            cy.contains("Transactions").click()
            setTimeout(cy.contains("2021-8-4"), 120000)
        })
    })
    describe("time filter functions", function() {
        it("for Overview", function() {
            cy.contains("Overview").click()
            cy.get("select").select("This year")
            cy.contains("410")
        })
        it("for Transactions", function() {
            cy.contains("Transaction").click()
            cy.get("select").select("This year")
            cy.contains("2020-9-29").should("not.exist")
        })
    })
})