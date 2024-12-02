const { test, expect } = require('@playwright/test');

test.describe('Teste', () => {
let timestamp = Date.now();
let email = `test${timestamp}@test.com`
let password = '123456'
test('1.2 Criar novo cadastro no site de agendamentos', async({request})=>{
    test.fail();
    const response = await request.post('http://localhost:8080/api/cadastro',{
     data: {
         "email": email,
         "verify_email": email,
         "password": password
     }
 
    });
    expect(response.status()).toBe(201);
 
 })

});