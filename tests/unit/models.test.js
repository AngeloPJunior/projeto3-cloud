// tests/unit/models.test.js
import { Product, User, Movement } from "../../src/db/index.js";

describe("Definição dos models", () => {
  test("Product deve ter campos básicos", () => {
    const attrs = Product.rawAttributes;

    expect(attrs).toHaveProperty("titulo");
    expect(attrs).toHaveProperty("tipo");
    expect(attrs).toHaveProperty("quantidade");
  });

  test("User deve ter campos básicos", () => {
    const attrs = User.rawAttributes;

    expect(attrs).toHaveProperty("nome");
    expect(attrs).toHaveProperty("email");
    expect(attrs).toHaveProperty("senha_hash");
  });

  test("Movement deve ter campos básicos", () => {
    const attrs = Movement.rawAttributes;

    expect(attrs).toHaveProperty("produtoId");
    expect(attrs).toHaveProperty("tipo");
    expect(attrs).toHaveProperty("quantidade");
  });
});
