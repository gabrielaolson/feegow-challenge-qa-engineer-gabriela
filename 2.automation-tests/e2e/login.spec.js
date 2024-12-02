const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home-page');
const { LoginPage } = require('../pages/login-page');


test.describe('Teste', () => {
  let loginPage;
  let homePage;


  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

  });

test('1.3 Login no sistema de agendamento', async ({ page }) => {
    test.fail();
    await test.step('Navegue até a home page e espere a página carregar', async() =>{
    await homePage.naveguePara();
    await homePage.esperandoPaginaCarregar();
  })

  await test.step('Entre na tela de Login', async () => {
    await homePage.entrarLoginPage();
  })
  
  await test.step('Preencha os dados e faça o login', async () => {
    await loginPage.login();
  })

});

});