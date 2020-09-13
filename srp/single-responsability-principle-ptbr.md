
# Singly Responsibility Principles (SRP) - Principio da Responsabilidade Única

Um módulo deve ser responsável por um, e apenas um, ator.

O que é módulo? 
R; Pode ser uma arquivo ou um conjunto de funções coesas e estrutura de dados.

```typescript
class Employee {
  constructor(empl: IEmployee) {

  }
  calculatePay() {}
  reportHours() {}
  save() {}
}
//Esse codigo tem 3 atores  e viola o SRP 
const CFO = new Employee(...);
const COO = new Employee(...);
const CTO = new Employee(...);

// calcular pagamento calculatePay é um metodo especifico do CFO
// report de horas é  usado pelo pessoal COO RH
// e uma metodo de database é usado pelo CTO


// outro problema é que 
// calculatePay --> regularHours
// reportHours --> regularHours
// Agora, suponha que a equipe do CFO decida que a forma como as horas não extras são calculadas precisa ser ajustada. Em contraste, a equipe do COO em RH não quer esse ajuste específico porque usa horas não extras para uma finalidade diferente.

// Esses problemas ocorrem porque colocamos o código do qual diferentes atores dependem em estreita proximidade. O SRP diz para separar o código do qual os diferentes atores dependem.

//Solution

// Talvez a maneira mais óbvia de resolver o problema seja separar os dados das funções. As três classes compartilham o acesso a EmployeeData, que é uma estrutura de dados simples sem métodos. Cada classe contém apenas o código-fonte necessário para sua função específica. As três classes não podem se conhecer. Assim, qualquer duplicação acidental é evitada.

// Ajuda a nivel de arquitetura para validar os limites da aplicação
```


# Referencias

* Clean Architecture - Robert C. Martin
