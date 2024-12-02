const { test, expect } = require('@playwright/test');


let updateDate = new Date;


test.describe('Teste', () => {


 test('6.1 Cancelar uma consulta que foi criada em menos de 5 minutos', async({request})=>{

    const responseAgendamento = await request.post('http://localhost:8080/api/appointments',{
        data: {
            "doctor_id": "1", 
            "patient_id": "2", 
            "appointment_date": updateDate, 
        }
    
       });

       await expect(responseAgendamento.status()).toBe(201);
       const responseData = await responseAgendamento.json();
       var id = responseData.id;
       console.log(id);
    

      

    const response = await request.post('http://localhost:8080/api/appointments',{
     data: {
        "id": id,
         "doctor_id": "1", 
         "patient_id": "2",
         "appointment_date": updateDate,
         "status": "cancelled"
     }
 
    });

    expect(response.status()).toBe(201);
 
 })
});