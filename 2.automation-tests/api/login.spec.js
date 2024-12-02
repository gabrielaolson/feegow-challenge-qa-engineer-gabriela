const { test, expect } = require('@playwright/test');

test.describe('Teste', () => {

let email = `test@test.com`
let password = '123456'

test('1.3.1 Login no sistema de agendamentos e conferência do Token', async({request})=>{
    test.fail();
    const loginData = {
        email: 'email'
    }
    const response = await request.post('http://localhost:3000/api/login',{
     data: {
         "email": email,
         "password": password
     }
    });
    
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('token'); 
 
 })

});