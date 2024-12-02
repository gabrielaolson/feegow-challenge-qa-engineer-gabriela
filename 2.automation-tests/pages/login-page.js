const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('#username');
    this.senhaField = page.locator('#password');
    this.entrarButton = page.getByRole('button', {name: 'Entrar'});
    this.bemVindo = page.locator('h1', {hasText: 'Bem-vindo usuário'});
  }

  async login(){
    await this.emailField.fill('test@test.com');
    await this.senhaField.fill('12345678');
    await expect(async () =>{
        await this.entrarButton.waitFor({ state: 'visible' });
        await this.entrarButton.click()
        await(expect(this.bemVindo).toBeVisible({timeout:20000}))
    
      }).toPass();
    
  }

};