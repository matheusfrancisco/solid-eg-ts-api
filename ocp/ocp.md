# Open closed principle

Uma classe deve estar fechada para modificação e aberta para extensão, uma vez que você tem uma classe A e todos seus testes unitários
estão passando você não  "deve" modificar aquela classe e sim estender ela para novas funcionalidades.


Aberto para extensão

Isso significa que o comportamento do módulo pode ser estendido. Conforme os requisitos do aplicativo mudam, podemos estender o módulo com novos comportamentos que satisfaçam essas mudanças. Em outras palavras, podemos mudar o que o módulo faz.

Fechado para modificação

Estender o comportamento de um módulo não resulta em mudanças no código fonte ou binário do módulo. A versão binária executável do módulo, quer esteja em uma biblioteca vinculável, uma DLL ou um arquivo .EXE, permanece intocada.

exemplos: Plugins