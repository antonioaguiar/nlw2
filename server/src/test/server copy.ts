import express from "express";

const app = express();
app.use(express.json());

//Métodos
//GET     - RECUPERAR INFORMAÇÃO
//POST    - CRIAR UMA NOVA INFORMAÇÃO
//PUT     - ATUALIZAR
//DELETE  - DELETAR UMA INFORMAÇÃO

//Corpo da mensagem
//BODY, dados para a criação de registros
//* adicionar app.use(express.json()) para o body ser utilizado como json */

//Parametros
//Route params: identifica o recurso que quero
//exemplo:  "/users/:id"
//Query params: identifica no url o nome do parâmetro
//exemplo:  /users?id=120&uf=MT

//Recursos

//rotas
app.get("/", (req, resp) => {
  resp.send("<h1>Bem vindo a minha home page</h1>");
});
//users
app.get("/users", (req, resp) => {
  const users = [
    { name: "Antonio Aguiar", age: 50 },
    { name: "Gustavo Aguiar", age: 10 },
  ];
  return resp.json(users);
});

//route parms
app.get("/users/:age", (req, resp) => {
  var age = req.params["age"];
  console.log("Age..:" + age);

  return resp.json(age);
});

//query parms
app.get("/user", (req, resp) => {
  var age = req.query["id"];
  var uf = req.query["uf"];

  console.log("Consultando por ..:" + age + ", " + uf);

  return resp.json({ message: "Ok" });
});

app.post("/users", (req, resp) => {
  console.log(req.body);
  const users = req.body;
  return resp.json({ user: users["name"], message: "Registrado com sucesso!" });
});

app.listen(3000);
