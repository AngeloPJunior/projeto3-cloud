describe("Jest Sanity Check", () => {
  test("Jest deve ser capaz de rodar um teste básico", () => {
    expect(typeof expect).toBe("function");
  });
});

