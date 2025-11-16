describe("Basic Page Tests", () => {

  it("Home page loads", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".home").should("exist");  
  });

  it("Cart page loads", () => {
    cy.visit("http://localhost:5173/cart");
    cy.contains("Cart").should("exist");  
  });


  it("Product Detail page loads", () => {
    cy.visit("http://localhost:5173/product/1"); 
    cy.get(".product-title").should("exist"); 
    cy.get(".product-price").should("exist");  
  });
});
