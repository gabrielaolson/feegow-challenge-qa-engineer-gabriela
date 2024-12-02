const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home-page');
const { LoginPage } = require('../pages/login-page');
const { AgendamentoPage } = require('../pages/agendamentos-page');


test.describe('Teste', () => {
  let loginPage;
  let homePage;
  let agendamentosPage;


  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    agendamentosPage = new AgendamentoPage(page);

  });

test('2 Agendar uma consulta no mesmo dia', async ({ page }) => {
    test.fail();
    await test.step('Navegue até a home page e espere a página carregar', async() =>{
    await homePage.naveguePara();
    await homePage.esperandoPaginaCarregar();
  })

  await test.step('Faça o login', async () => {
    await homePage.entrarLoginPage();
    await loginPage.login();
  })
  
  await test.step('Procurar horários disponíveis', async () => {
    await agendamentosPage.buscarMedicos();

  })

  await test.step('Efetuar o agendamento da consulta', async () => {
    await agendamentosPage.agendarConsultaMesmoDia();

  })

});


test('2.2 Agendar uma consulta no dia posterior', async ({ page }) => {
    test.fail();
    await test.step('Navegue até a home page e espere a página carregar', async() =>{
    await homePage.naveguePara();
    await homePage.esperandoPaginaCarregar();
  })

  await test.step('Faça o login', async () => {
    await homePage.entrarLoginPage();
    await loginPage.login();
  })
  
  await test.step('Procurar horários disponíveis', async () => {
    await agendamentosPage.buscarMedicos();

  })

  await test.step('Efetuar o agendamento da consulta', async () => {
    await agendamentosPage.agendarConsultaComAntecedencia();

  })

});

});