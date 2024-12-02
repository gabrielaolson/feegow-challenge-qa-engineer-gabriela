const { expect } = require('@playwright/test');

exports.CadastroPage = class CadastroPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.facaSeuCadastro = page.locator('a', { hasText: 'Faça seu cadastro!' });
    this.cadastroPage = page.locator('div', {hasText: 'Crie uma Conta'});
    this.emailField = page.getByRole('email', {name: 'email'});
    this.verifiqueEmailField = page.getByRole('email', {name: 'email_verify'});
    this.senhaField = page.getByRole('password', {name: 'password'});
    this.criarCadastro = page.getByRole('button', {name: 'signup'} );
    this.cadastroCriado = page.locator('h1', {hasText: 'Cadastro criado com Sucesso!'});


  }
  async iniciarCadastro(){
    await expect(async () =>{
      await this.facaSeuCadastro.waitFor({ state: 'visible' });
      await this.cadastroPage.waitFor({ state: 'visible' });
      await expect(this.cadastroPage).toBeVisible({timeout:20000});
  
    }).toPass();
  }

  async insiraSeusDados(){
    await this.emailField.fill('test@test.com');
    await this.verifiqueEmailField.fill('test@test.com');
    await this.senhaField.fill('12345678');
  }

  async criarCadastro(){
    await expect(async () =>{
      await this.criarCadastro.click();
      await expect(this.cadastroCriado.toBeVisible({timeout: 2000}));
    }).toPass();
  }

};