describe("Test wysyłki wiadomosci z widgeta tidio", () => {
  const widgetPageURL =
    "https://widget-v4.tidiochat.com/preview.html?code=o9xkhlt7a25ddvufsyhmbxkhrznig2wk";
  const panelPageURL = "https://www.tidio.com/panel";
  const customerEmail = "test@somed0main3.com";
  const userEmail = "test.quality.75759@gmail.com";
  const userPassword = "79GuNLTsahAKAfA";

  it("Wysyłka testowego message'a", () => {
    cy.visit(widgetPageURL);

    cy.iframe("#tidio-chat-iframe").as("tidioIfr"); //iframe command def - in /support/commands.js

    cy.get("@tidioIfr")
      .find("#button-body")
      .should("be.visible")
      .click();

    cy.get("@tidioIfr")
      .find("#new-message-textarea")
      .should("be.empty")
      .and("be.visible")
      .click()
      .type("Hello");

    cy.get("@tidioIfr")
      .find("button:last")
      .should("be.visible")
      .click();
    cy.debug();

    cy.get("@tidioIfr")
      .find("input[type='email']")
      .should("be.visible")
      .and("be.empty")
      .click()
      .type(customerEmail);

    cy.get("@tidioIfr", { timeout: 10000 })
      .find("button[type='submit']")
      .should("be.visible")
      .click();
    cy.wait(5000);
  });

  it("Sprawdzenie fakta otrzymania message'a", () => {
    cy.visit(panelPageURL);

    cy.get(".form__area--withInputs")
      .find("input[type='email']")
      .should("be.enabled")
      .click()
      .type(userEmail);

    cy.get(".form__area--withInputs")
      .find("input[type='password']")
      .should("be.enabled")
      .click()
      .type(userPassword);

    cy.get(".form__area")
      .find("button[type='submit']")
      .should("be.visible")
      .and("have.class", "form__button")
      .click();

    cy.get("a[data-test-id='conversations-section-button']")
      .find(".label")
      .should("have.class", "label-unread")
      .click();
  });
});
