const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');

let updateDate = new Date;
let responseBody;
test.describe('Teste', () => {
test('2.1 Agendar nova consulta no mesmo dia', async({request})=>{
    const response = await request.post('http://localhost:8080/api/appointments',{
     data: {
         "doctor_id": "1", 
         "patient_id": "2", 
         "appointment_date": updateDate, 
     }
 
    });

    expect(response.status()).toBe(201);
    responseBody = await response.json();

 
 })

 test('2.2.1 Agendar nova consulta no dia posterior', async({request})=>{
    updateDate.setDate(updateDate.getDate() + 1); 
    const response = await request.post('http://localhost:8080/api/appointments',{
     data: {
         "doctor_id": "1", 
         "patient_id": "2", 
         "appointment_date": updateDate, 
     }
 
    });

    expect(response.status()).toBe(201);

 
 })

 test('Validar contrato agendamento', async({request}) =>{
  
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
