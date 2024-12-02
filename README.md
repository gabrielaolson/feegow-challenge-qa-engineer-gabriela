
## Instruções para rodar os testes e2e e de api


## Setup
### Inslalar playwright**
`npm init playwright@latest`

nota: após a instalação ajustar configurações para que fiquem conforme o arquivo que está salvo no github.

### Inslalar ajv para teste de contrato**
`npm i ajv`

### Para os testes de api seguir instruções em**
`api/README.md`

**Comandos para rodar os testes**
  
### Para rodar todos os testes - pasta: raiz:

`npx playwright test`

### Rodar todos os testes dentro de uma pasta:

`npx playwright test 2.automation-tests/e2e/`

### Rodar um teste especifico:

`npx playwright test 2.automation-tests/e2e/example.spec.js`

### Rodar em UI mode:

`npx playwright test --ui`
