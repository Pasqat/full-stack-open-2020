describe('Blog app', function () {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');

    const user = {
      username: 'pasqat',
      password: 'senzaniente'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);

    cy.visit('http://localhost:3000');
  });

  it('show the login', function () {
    cy.contains('Login to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('pasqat');
      cy.get('#password').type('senzaniente');
      cy.contains('login').click();

      cy.contains('logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('pasqat');
      cy.get('#password').type('wrong');
      cy.contains('login').click();

      cy.contains('wrong username or password');
    });
  });

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'pasqat', password: 'senzaniente' });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('Cypress');
      cy.get('#author').type('A new blog added by Cypress');
      cy.get('#url').type('http://bestsite.ever');
      cy.get('#saveButton').click();

      cy.contains('Cypress');
    });

    describe('like functionality', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first title',
          author: 'Cypress',
          url: 'localhost'
        });
        cy.createBlog({
          title: 'second title',
          author: 'Cypress',
          url: 'localhost'
        });
        cy.createBlog({
          title: 'third title',
          author: 'Cypress',
          url: 'localhost'
        });
      });
      it('A blog can be liked', function () {
        cy.contains('second').find('button').click();
        cy.contains('second').parent().find('button').contains('like').click();
      });

      it('the most liked is first in the list', function () {
        cy.contains('second').find('button').click();
        cy.contains('second').parent().find('button').contains('like').click();
        cy.visit('http://localhost:3000')
          .get('li')
          .then((lis) => {
            console.log('li', lis);
            cy.wrap(lis[0]).should('contain', 'second');
          });
      });
    });

    describe('A blog can be removed', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first title',
          author: 'Cypress',
          url: 'localhost'
        });
        cy.createBlog({
          title: 'second title',
          author: 'Cypress',
          url: 'localhost'
        });
        cy.createBlog({
          title: 'third title',
          author: 'Cypress',
          url: 'localhost'
        });
      });

      it('with succes from the user who added it', function () {
        cy.contains('second').find('button').click();
        cy.contains('second')
          .parent()
          .find('button')
          .contains('remove')
          .click();

        cy.get('blog-list');
        cy.should('not.contain', 'second');
      });
    });
  });
});
