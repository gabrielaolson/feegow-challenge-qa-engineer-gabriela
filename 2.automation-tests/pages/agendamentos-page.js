const { expect } = require('@playwright/test');

exports.AgendamentoPage = class AgendamentoPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.searchEspecialidade = page.getByRole('text', {name:'especialidade'});
    this.searchCidade = page.getByRole('text', {name: 'cidade'});
    this.searchButton = page.getByRole('button', {name: 'Pesquisar'});
    this.resultados = page.locator('h1', {hasText: 'Resultados da procura'});
    this.medico = page.locator('h1', {hasText: 'Dr.x'});
    this.dateDropdown = '#dia';
    this.selectHorario = page.selectOption('#horario', '13:00');
    this.confirmarButton = page.getByLabel('button', {name: 'Confirmar'});
    this.mensagemConf = page.locator('h1', {hasText: 'Consulta confirmada'});
    this.buttonConsultasAgendadas = page.getByRole('button', {name:'Consultas Agendadas'})
    this.cancelarConsulta = page.getByRole('button', {name: 'Cancelar consulta'});
    this.message = page.locator('.message-cancel')

  }

  async buscarMedicos() {

    await expect(async () =>{
        await this.searchEspecialidade.fill('Clínico geral');
        await this.searchCidade.fill('Rio de Janeiro');
        await this.searchButton.click();
        await expect(this.resultados).toBeVisible({timeout:20000});
  
    }).toPass()

  }

  async retornaHorariosDisponiveis() {
    var currentDate = new Date();
    
    await expect(async () =>{        
      await this.medico.waitFor({ state: 'visible' });
      const dates = await this.page.$$eval('.date-appointment-selector', elements =>
        elements.map(el => el.textContent.trim())
       );
       var formattedHorariosLivres = dates.map(date => date.split('T')[0]);

       var formattedHorariosLivresTwo = formattedHorariosLivres.map(date => date.split(' ')[0]);
       console.log(formattedHorariosLivresTwo);
       await expect(formattedHorariosLivresTwo.length).toBeGreaterThan(0)

    }).toPass()

    return formattedHorariosLivres;

  }

  async agendarConsulta() {
    var currentDate = new Date();
    
    await expect(async () =>{        
      await this.medico.waitFor({ state: 'visible' });
      await this.page.selectOption(this.dateDropdown, {value: currentDate}).click();
      await this.selectHorario.click();
      await this.confirmarButton.click();
      await expect(this.mensagemConf).toBeVisible({timeout: 2000});

  
    }).toPass()

  }
  async agendarConsultaComAntecedencia() {
    var date = new Date();
    date.setDate(currentDate.getDate() + 1); 

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    var formattedDate = `${year}-${month}-${day}`; 

    await expect(async () =>{
      await this.medico.waitFor({ state: 'visible' });
      await this.page.selectOption(this.dateDropdown, {value: formattedDate}).click();
      await this.selectHorario.click();
      await this.confirmarButton.click();
      await expect(this.mensagemConf).toBeVisible({timeout: 2000});

  
    }).toPass()

  }

  async cancelarConsultaDia() {
    var currentDate = new Date();
    
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    var formattedDate = `${month}-${day}`; 

    await expect(async () =>{
      await this.buttonConsultasAgendadas.click();
      await expect(this.page.locator('h1').toHaveText(formattedDate));
      await this.cancelarConsulta.first().click();

    }).toPass()

  }

  async cancelarConsultaFutura() {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1); 
    
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    var formattedDate = `${month}-${day}`; 

    await expect(async () =>{
      await this.buttonConsultasAgendadas.click();
      await expect(this.page.locator('h1').toHaveText(formattedDate));
      await this.cancelarConsulta.first().click();

    }).toPass()

  }
  async buttonCanceledIsInactive() {
    await this.cancelarConsulta.isEnabled();
    await expect(isEnabled).toBe(false);
    await expect(this.message).toHaveText('Consultas só podem ser canceladas com até 12h de antecedência');

  }
};