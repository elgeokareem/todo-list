describe("Login", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.wait(3000);

    // Find a link with an href attribute containing "about" and click it
    cy.get("#login").click();

    cy.wait(3000);

    cy.get("#username").type("test@test.com");
    cy.get("#password").type("Wv5412656..");
    cy.get("button[type=submit]").click();

    cy.wait(3000);
    // The new url should include "/about"
    cy.url().should("include", "/dashboard");
  });
});
