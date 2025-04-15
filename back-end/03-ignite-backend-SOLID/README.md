# App

Gympass style App.

## RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [x] Deve ser possivel obter seu historico de check-ins;
- [x] Deve ser possivel buscar academias proximas (até 10km);
- [x] Deve ser possivel o usuario procurar academias pelo nome;
- [x] Deve ser possivel o usuario realizar check0in em uma academia;
- [x] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## RNs (Regra de negócio)

- [x] o usuario não deve poder se cadastrar com um e-mail duplicado;
- [x] o usuario não pode fazer 2 check-ins no mesmo dia;
- [x] O usuario nào pode fazer check-in se não estiver perto(100m) da academia;
- [x] O Check-on so pode ser validado ate 20 minutos apos criado;
- [x] O Check-on so pode ser validado por administradores;
- [x] A academia so pode ser cadastrada por administradores;

## RNFs (Requisitos não funcionais)

- [x] A senha do usauario precisa estar criptografado
- [x] Os dados da aplicação precisam estar persistido em um banco PostgressSQL;
- [x] Todas listas de dados precisa estar paginados com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT(JSON Web Token);
