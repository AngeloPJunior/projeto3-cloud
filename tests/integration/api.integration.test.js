import request from "supertest";
import app from "../../src/app.js";
import { sequelize, User, Product } from "../../src/db/index.js";
import bcrypt from "bcryptjs";

beforeAll(async () => {
  // Zera e recria as tabelas para o ambiente de teste
  await sequelize.sync({ force: true });

  // Cria usuário para login
  const senhaHash = await bcrypt.hash("123", 10);
  await User.create({
    nome: "Usuário Teste",
    email: "teste@example.com",
    senha_hash: senhaHash,
  });

  // Cria alguns produtos de exemplo
  await Product.bulkCreate([
    { titulo: "Watchmen", autor: "Alan Moore", tipo: "HQ", quantidade: 8 },
    { titulo: "O Hobbit", autor: "J.R.R. Tolkien", tipo: "LIVRO", quantidade: 5 },
  ]);
});

afterAll(async () => {
  await sequelize.close();
});

describe("API integration tests", () => {
  test("GET / deve retornar a página inicial (HTML)", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/html/);
  });

  test("POST /auth/login deve retornar token com credenciais válidas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "teste@example.com", senha: "123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toMatchObject({
      email: "teste@example.com",
      nome: "Usuário Teste",
    });
  });

  test("GET /produtos deve retornar lista de produtos", async () => {
  const res = await request(app).get("/produtos");

  expect(res.status).toBe(200);

  const body = res.body;
  expect(body).toHaveProperty("items");
  expect(Array.isArray(body.items)).toBe(true);
  expect(body.items.length).toBeGreaterThanOrEqual(2);
  expect(body.items[0]).toHaveProperty("titulo");
  expect(body.items[0]).toHaveProperty("tipo");
});

});
