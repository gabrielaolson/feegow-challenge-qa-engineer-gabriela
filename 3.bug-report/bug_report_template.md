# Bug Report

## Título do Bug
[Descreva brevemente o problema,: "UI - Erro ao cancelar consulta criada nos últimos 5 minutos"]

---

## Descrição
**Resumo**: [Consulta criada nos últimos 5 minutos não pode ser cancelada]

**Impacto**: [O usuário não pode cancelar consulta que foi arressem agendada]

---

## Passos para Reproduzir


1. [Passo 1: Usuário já cadastrado faz login no sistema (url: 'https://clinicaluz.com)]
2. [Passo 2: Acessa a página de agendamento de consultas]
3. [Passo 3: Cria uma nova consulta nova com mais de 12h de antecedência]
4. [Passo 4: Mensagem de consulta criada com sucesso aparece]
5. [Passo 5: Clique em cancelar a consulta]

---

## Comportamento Esperado
[O sistema deve permitir o cancelamento de uma consulta imediatamente após a criação]

---

## Comportamento Atual
[Mensagem de erro foi exibida: erro - por favor tente mais tarde]

---

## Ambiente de Teste
- **Dispositivo**: [ Desktop e Mobile ]
- **Sistema Operacional**: [macOS ]
- **Navegador**: [Google Chrome, Edge, Firefox, Safari ]
- **Ambiente**: [ Staging ]

---

## Evidências


---

## Critérios de Aceitação
- [Critério 1: Permitir que uma consulta seja cancelada imediatamente após a criação desde que esteja faltando ao menos 12h até o horário do agendamento]


---

## Observações Adicionais
[ A API de cancelamento está funcionando sem problemas]