<img title="a title" alt="Alt text" src="https://media.licdn.com/dms/image/D4E16AQGjCVuzlCthvg/profile-displaybackgroundimage-shrink_200_800/0/1690574706700?e=2147483647&v=beta&t=zlY1Mc10yQ3gA9qiZ4sZ7m8PkE-HIu8Haa1fUyKb_fU">

# Onentreé Application
## Uma aplicação para gerenciar um sistema de gerenciamento de ingressos e locais de eventos com acesso de catracas de reconhecimento facial.

### Iniciando back-end com o Docker

_Lembre-se de conferir as variáveis de ambiente em .env_.

_Crie um arquivo .env e cole o conteúdo de .env.development dentro para que as migrações do banco de dados rodem_.

```
$ cd onentree-backend
$ docker-compose up --build
```

### Iniciando front-end

```
$ cd onentree-frontend
$ npm install
```

### Rodando aplicação em modo de desenvolvimento

```
$ npm run dev
```

Após esses passos seu app já está pronto para uso na porta padrão do Vite.
Você pode conferir todos os endpoints em ```http://localhost:3000/api``` onde o Swagger está rodando.


### Modelagem do banco de dados

<img title="a title" alt="Alt text" src="./modelagem/onentree-modelagem-dark.png">
<img title="a title" alt="Alt text" src="./modelagem/onentree-modelagem-light.png">
