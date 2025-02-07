# Initial ideas

O desafio em sí é bem completo, tem muitas etapas nas quais preciso pensar para conseguir finalizar o app nos 3 dias

A primeira coisa que acho importante fazer é criar uma estrutura de documentação, para que no futuro o código possa ser re-trabalhado, e os devs que pegarem ele possam entender o porquê das decisões tomadas

Preciso pensar no fluxo do app, no documento é dito que:

```
Nesta aplicação o usuário pode:
- Se cadastrar para utilizar a plataforma.
- Realizar login e logout.
- Gerenciar sua lista de contatos.
- Realizar pesquisa de endereço como ajuda ao cadastro de contatos.
- Excluir a sua própria conta
```

Isso significa que preciso pensar em um fluxo de sign-in, com telas diferentes para o on-boarding e o login em sí
Uma página 'home' onde o mapa em sí vai estar localizado
Além de uma página para o perfil do usuário (alterar dados, etc)

```

A plataforma possui um sistema de ajuda para o preenchimento do endereço do contato, onde o
usuário pode informar alguns dados tais como, UF, cidade e um trecho do endereço e esse sistema
de ajuda apresenta então as possibilidades de endereço baseado na pesquisa, dessa forma o
usuário escolhe na lista qual o endereço lhe convém e tem os campos do formulário
correspondente preenchidos automaticamente.

```

Preciso também integrar uma barra de pesquisa como a do google maps, com suggestions de endereços, acho que a API já oferece isso

---

O app precisa rodar em uma base local, mencionam o localStorage do navegador em sí, mas acho que para o escopo do projeto seria limitado demais

Gostaria de usar uma base SQLite, talvez integrando com uma ORM
> Existe ORM pra localStorage?

---

Acho interessante pensar em adicionar uma base persistente em um servidor para os dados, mas não é do escopo inicial, melhor pensar nisso caso tenha tempo de sobra

Seria legal pensar em caching também, principalmente para os lookups da API no maps, daria para reduzir bastantes custos em um ambiente de prod

---
