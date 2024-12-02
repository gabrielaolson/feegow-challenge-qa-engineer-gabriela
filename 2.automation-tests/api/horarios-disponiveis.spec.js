const { test, expect } = require('@playwright/test');

test.describe('Teste', () => {
test('4.2 Verificar lista de consultas disponíveis para agendamento', async({request})=>{

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
      var formattedHorariosLivresTwo = formattedHorariosLivres.map(date => date.split(' ')[0]);
      console.log(formattedHorariosLivresTwo);

 
 })

});