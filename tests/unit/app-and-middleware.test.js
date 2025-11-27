// tests/unit/app-and-middleware.test.js
import { jest } from "@jest/globals";          // ⬅ ADICIONE ESTA LINHA
import app from "../../src/app.js";
import { notFound, errorHandler } from "../../src/middlewares/error.js";

describe("App básico", () => {
  test("deve carregar o app do Express", () => {
    expect(app).toBeDefined();
    expect(typeof app).toBe("function");
  });
});

describe("Middlewares de erro", () => {
  test("notFound deve retornar 404 com mensagem correta", () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    notFound(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Rota não encontrada" });
  });

  test("errorHandler deve retornar 500 com mensagem genérica", () => {
    const err = new Error("qualquer erro");
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro interno do servidor" });
  });
});
