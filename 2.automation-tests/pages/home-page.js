const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.welcome = page.locator('a', { hasText: 'Bem vindo ao agende.com' });
    this.entrar = page.locator('a', { hasText: 'Entrar' });

  }

  async naveguePara() {
    await this.page.goto('https://clinicaluz.com/agendamento');
  }

  async esperandoPaginaCarregar() {

    await expect(async () =>{
      await this.welcome.waitFor({ state: 'visible' });
      await expect(this.welcome).toBeVisible({timeout:20000});
  
    }).toPass()

  }
  async entrarLoginPage() {

    await expect(async () =>{
      await this.entrar.waitFor({ state: 'visible' });
      await this.entrar.click();
  
    }).toPass()

  }

};