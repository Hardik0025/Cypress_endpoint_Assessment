describe('Wikipedia Watchlist Tests', () => {
const username                      = 'your_username';
const password                      = 'your_password';

let articleTitle1;
let articleTitle2;
let sortedTitles                  = [];

it('Add and Remove articles from Wikipedia watchlist', () => {
      // Log in to Wikipedia
    cy.visit('https://en.wikipedia.org/wiki/Main_Page');
    cy.get('#pt-login-2').click();
    cy.get('#wpName1').type(username);
    cy.get('#wpPassword1').type(password);
    cy.get('#wpLoginAttempt').click();
    cy.wait(5000);

      // Add first random article to the watchlist
    cy.get('a').contains('Random article').click();
    cy.get('#firstHeading').then(($title) => {
        articleTitle1             = $title.text().trim();
        cy.log('First article title:', articleTitle1);
        sortedTitles.push(articleTitle1);
        cy.get('#ca-watch').click();
        cy.wait(5000);
    });

      // Add second random article to the watchlist
      cy.get('a').contains('Random article').click();
      cy.get('#firstHeading').then(($title) => {
      articleTitle2                 = $title.text().trim();
      cy.log('Second article title:', articleTitle2);
      sortedTitles.push(articleTitle2);
      cy.get('#ca-watch').click();
          cy.wait(5000);
      });

      // Sort the titles alphabetically
      sortedTitles.sort();
      const firstArticleToRemove    = sortedTitles[0];
      const secondArticleToVerify   = sortedTitles[1];

      // Navigate to the watchlist
      cy.get('#pt-watchlist-2').click();
      cy.wait(5000);
      cy.get('a').contains('View and edit watchlist').click();
      cy.contains('View and edit watchlist').should('exist');
      cy.wait(5000);

      // Find the first article title alphabetically and remove it
      cy.get('.oo-ui-multiselectWidget-group > :nth-child(1) > .oo-ui-inputWidget > .oo-ui-inputWidget-input').check();
      cy.wait(2000);
      cy.get('#ooui-php-9 > .oo-ui-inputWidget-input').click();

      // Verify the first article is removed from the watchlist
      cy.get('#pt-watchlist-2').click();
      cy.get('a').contains('View and edit watchlist').click();
      cy.get('.oo-ui-multiselectWidget-group > :nth-child(1) > .oo-ui-inputWidget > .oo-ui-inputWidget-input').should('not.contain', firstArticleToRemove);

      // Verify the second article is still present in the watchlist
      cy.get('.oo-ui-multiselectWidget-group > :nth-child(1) > .oo-ui-inputWidget > .oo-ui-inputWidget-input', { timeout: 5000 }).should('exist');

      // Verify that the second article is there
      cy.get('.oo-ui-multiselectWidget-group > :nth-child(1) > .oo-ui-inputWidget > .oo-ui-inputWidget-input').click();
      cy.get('.oo-ui-multiselectWidget-group > :nth-child(1) > .oo-ui-inputWidget > .oo-ui-inputWidget-input').should('exist');
      
      });
  });