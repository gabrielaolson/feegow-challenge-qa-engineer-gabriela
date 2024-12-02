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



test('3 Erro ao tentar cancelar consulta com menos de 12 horas de antecedência', async ({ page }) => {
    test.fail();
    await test.step('Navegue até a home page e espere a página carregar', async() =>{
    await homePage.naveguePara();
    await homePage.esperandoPaginaCarregar();
  })

  await test.step('Faça o login', async () => {
    await homePage.entrarLoginPage();
    await loginPage.login();
  })

  await test.step('Esperar passar mais de 5 minutos para o teste não falhar(bug)', async () => {
    await page.waitForTimeout(360000);
  })
  
  await test.step('Cancelar a consulta', async () => {
    await agendamentosPage.cancelarConsultaDia();

  })

});


test('3.2 Cancelar uma consulta com antecedência -  mais de 12 horas', async ({ page }) => {
    test.fail();
    await test.step('Navegue até a home page e espere a página carregar', async() =>{
    await homePage.naveguePara();
    await homePage.esperandoPaginaCarregar();
  })



  await test.step('Faça o login', async () => {
    await homePage.entrarLoginPage();
    await loginPage.login();
  })
  
  

  await test.step('Cancelar consulta', async () => {
    await agendamentosPage.cancelarConsultaFutura();

  })

});

test('5 Botão cancelar deve estar inativo/oculto para uma consulta que o horário já passou/andamento', async ({ page }) => {
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

await test.step('Verificar se botão está inativo e mensagem de aviso aparece ao usuário', async () => {
  await agendamentosPage.buttonCanceledIsInactive();

})

});

test.skip('6 Cancelar uma consulta arressem marcada (menos de 5 minutos) com antecedência -  mais de 12 horas', async ({ page }) => {
    await test.step('Navegue até a home page e espere a página carregar', async() =>{
    await homePage.naveguePara();
    await homePage.esperandoPaginaCarregar();
  })


  await test.step('Faça o login', async () => {
    await homePage.entrarLoginPage();
    await loginPage.login();
  })


  await test.step('Procurar horários disponíveis e marcar consulta', async () => {
    await agendamentosPage.buscarMedicos();
    await agendamentosPage.agendarConsultaComAntecedencia();

  })
  
  await test.step('Cancelar consulta', async () => {
    await agendamentosPage.cancelarConsultaFutura();
  })

});
});