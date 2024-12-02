const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home-page');
const { LoginPage } = require('../pages/login-page');
const { AgendamentoPage } = require('../pages/agendamentos-page');

test.describe('Teste', () => {
    let loginPage;
    let homePage;
    let agendamentosPage;
    let formattedHorariosLivresTwo = []; 
  
    test.beforeEach(async ({ page }) => {
      homePage = new HomePage(page);
      loginPage = new LoginPage(page);
      agendamentosPage = new AgendamentoPage(page);
  
    });
    
test('4.1 Verificar lista de consultas disponíveis para agendamento - API', async({request})=>{
    test.fail();
    const response = await request.get('http://localhost:8080/api/appointments');
    expect(response.status()).toBe(200);
    const responseData = await response.json();
    const horariosLivres = [];

    responseData.forEach(item => {
        if ((item.status === "pending") || (item.status === "cancelled")){
            horariosLivres.push(item.appointment_date);
            
        }
            
      });

      const formattedHorariosLivres = horariosLivres.map(date => date.split('T')[0]);
      formattedHorariosLivresTwo = formattedHorariosLivres.map(date => date.split(' ')[0]);
      console.log(formattedHorariosLivresTwo);
 
 })

 test('4 Buscar horários disponíveis na UI e comparar com a lista obtida na API', async ({ page }) => {
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
    const horariosUi = await agendamentosPage.retornaHorariosDisponiveis();

  })

  await test.step('Comparar resultado do GET com as datas achadas na UI', async () => {
    const areEqualDate = horariosUi.every(date => formattedHorariosLivres.includes(date));
    expect(areEqualDate).toBe(true);

  })

});

});
