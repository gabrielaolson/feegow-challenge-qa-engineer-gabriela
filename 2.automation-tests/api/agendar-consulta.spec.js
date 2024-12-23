const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');



test.describe('Teste', () => {
test('2.1 Agendar nova consulta no mesmo dia', async({request})=>{
    const updateDate = new Date().toISOString();
    const response = await request.post('http://localhost:8080/api/appointments',{
     data: {
         "doctor_id": "1", 
         "patient_id": "2", 
         "appointment_date": updateDate, 
     }
 
    });
    console.log(updateDate);
    const text = await response.text();
    console.log(text)
    expect(response.status()).toBe(201);
    


 })

 test('2.2.1 Agendar nova consulta no dia posterior', async({request})=>{
    const updateDate = new Date();  
    updateDate.setDate(updateDate.getDate() + 1); 
    console.log(updateDate);
    const response = await request.post('http://localhost:8080/api/appointments',{
     data: {
         "doctor_id": "1", 
         "patient_id": "2", 
         "appointment_date": updateDate, 
     }
 
    });

    await expect(response.status()).toBe(201);

 
 })

 test('Validar contrato agendamento', async({request}) =>{

    const updateDate = new Date();
    const response = await request.post('http://localhost:8080/api/appointments',{
        data: {
            "doctor_id": "1", 
            "patient_id": "2", 
            "appointment_date": updateDate, 
        }
    
       });
   
       expect(response.status()).toBe(201);
       const responseBody = await response.json();
   
  
    const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#", 
        "type": "object",
        "properties": {
          "doctor_id": { "type": "string" },
          "patient_id": { "type": "string" },
          "appointment_date": { "type": "string" },
          "updated_at": { "type": "string" },
          "created_at": { "type": "string" },
          "id": { "type": "number" }
        },
        "required": ["doctor_id", "patient_id", "appointment_date", "id"]
      };
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    await expect(valid).toBe(true);

    if (!valid) {
        console.error(validate.errors);
      } else {
        console.log('Dados válidos!');
      }
 })


});
