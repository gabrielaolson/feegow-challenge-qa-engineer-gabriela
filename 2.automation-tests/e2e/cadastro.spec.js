const { test, expect } = require('@playwright/test');
const { CadastroPage } = require('../pages/cadastro-page');
const { HomePage } = require('../pages/home-page');


test.describe('Teste', () => {
  let cadastroPage;
  let homePage;



  test.beforeEach(async ({ page }) => {
      cadastroPage = new CadastroPage(page);
      homePage = new HomePage(page);

  });

  test('1 Criar novo cadastro no site de agendamentos', async ({ page }) => {
    test.fail();
    await test.step('Navegue até a home page e espere a página carregar', async() =>{
    await homePage.naveguePara();
    await homePage.esperandoPaginaCarregar();
  })

  await test.step('Entre na tela de Login', async () => {
    await homePage.entrarLoginPage();
  })
  
  await test.step('Entre na tela de Cadastro', async () => {
    await cadastroPage.iniciarCadastro();
  })

  await test.step('Preencha os dados do cadastro', async () => {
    await cadastroPage.insiraSeusDados();
  })

  await test.step('Finalizar o cadastro', async () => {
    await cadastroPage.criarCadastro();
  })


});


});