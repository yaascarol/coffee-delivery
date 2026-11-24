import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const shots = "docs/screenshots";
test.beforeAll(async () => {
  await mkdir(shots, { recursive: true });
});
test("compra completa, persistência, validação e screenshots", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("https://viacep.com.br/ws/**", (route) =>
    route.fulfill({
      json: {
        logradouro: "Rua de Exemplo",
        bairro: "Centro",
        localidade: "São Paulo",
        uf: "SP",
      },
    }),
  );
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Nossos cafés" }),
  ).toBeVisible();
  await expect(page.locator("article")).toHaveCount(14);
  await page.evaluate(() => document.fonts.ready);
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map(async (image) => {
        const img = image as HTMLImageElement;
        img.loading = "eager";
        await img.decode();
      }),
    );
  });
  await page.screenshot({ path: `${shots}/home-desktop.png`, fullPage: true });
  await page
    .getByRole("button", { name: "Aumentar Expresso Tradicional", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Adicionar Expresso Tradicional ao carrinho",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", {
      name: "Adicionar Expresso Tradicional ao carrinho",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("link", { name: "Carrinho com 4 unidades" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("link", { name: "Carrinho com 4 unidades" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Carrinho com 4 unidades" }).click();
  await expect(page.locator(".item")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Diminuir Expresso Tradicional" })
    .click();
  await expect(page.getByText("R$ 33,20", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Confirmar pedido" }).click();
  await expect(page.getByText("Selecione a forma de pagamento")).toBeVisible();
  await expect(page.getByLabel("CEP", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page.getByLabel("CEP", { exact: true }).fill("01001000");
  await expect(page.getByLabel("Rua", { exact: true })).toHaveValue(
    "Rua de Exemplo",
  );
  await page.getByLabel("Número", { exact: true }).fill("123");
  await page
    .getByLabel("Complemento (opcional)", { exact: true })
    .fill("Apto de demonstração");
  await page.getByText("Cartão de crédito", { exact: true }).click();
  await page.screenshot({
    path: `${shots}/checkout-desktop.png`,
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: `${shots}/checkout-mobile.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Ativar modo escuro" }).click();
  await page.screenshot({
    path: `${shots}/checkout-mobile-dark.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Confirmar pedido" }).click();
  await expect(page).toHaveURL(/\/success$/);
  await expect(page.getByText("Rua de Exemplo, 123")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Carrinho com 0 unidades" }),
  ).toBeVisible();
  await page.screenshot({
    path: `${shots}/success-mobile-dark.png`,
    fullPage: true,
  });
  await page.reload();
  await expect(page.getByText("Rua de Exemplo, 123")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Ativar modo claro" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Ativar modo claro" }).click();
  await page.screenshot({
    path: `${shots}/success-mobile.png`,
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: `${shots}/success-desktop.png`,
    fullPage: true,
  });
  await page.getByRole("link", { name: "Voltar para o catálogo" }).click();
  await page.locator("img").evaluateAll(async (images) => {
    await Promise.all(
      images.map(async (image) => {
        const img = image as HTMLImageElement;
        img.loading = "eager";
        await img.decode();
      }),
    );
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${shots}/home-mobile.png`, fullPage: true });
  await page.getByRole("button", { name: "Ativar modo escuro" }).click();
  await page.screenshot({
    path: `${shots}/home-mobile-dark.png`,
    fullPage: true,
  });
  await expect(page.locator("img")).toHaveCount(16);
  expect(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every(
          (img) =>
            (img as HTMLImageElement).complete &&
            (img as HTMLImageElement).naturalWidth > 0,
        ),
      ),
  ).toBe(true);
  expect(errors).toEqual([]);
});
test("estados vazios, remoção, tema e larguras", async ({ page }) => {
  await page.goto("/success");
  await expect(
    page.getByRole("heading", { name: "Nenhum pedido por aqui ainda" }),
  ).toBeVisible();
  await page.goto("/checkout");
  await expect(
    page.getByRole("heading", { name: "Seu carrinho está esperando um café" }),
  ).toBeVisible();
  await page.goto("/");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page
    .getByRole("button", { name: "Adicionar Latte ao carrinho", exact: true })
    .click();
  await page.getByRole("link", { name: "Carrinho com 1 unidades" }).click();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page
    .getByRole("button", { name: "Remover Latte", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Seu carrinho está esperando um café" }),
  ).toBeVisible();
  await page.goto("/");
  await page.evaluate(() =>
    localStorage.setItem("coffee-delivery:cart:v1", "corrompido"),
  );
  await page.reload();
  await expect(
    page.getByRole("link", { name: "Carrinho com 0 unidades" }),
  ).toBeVisible();
});
test("CEP inexistente, indisponível e respostas antigas", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Adicionar Latte ao carrinho", exact: true })
    .click();
  await page.goto("/checkout");
  await page.route("https://viacep.com.br/ws/**", (route) =>
    route.fulfill({ json: { erro: true } }),
  );
  await page.getByLabel("CEP", { exact: true }).fill("99999999");
  await expect(page.getByText(/CEP não encontrado/)).toBeVisible();
  await page.unroute("https://viacep.com.br/ws/**");
  await page.route("https://viacep.com.br/ws/**", (route) => route.abort());
  await page.getByLabel("CEP", { exact: true }).fill("01001000");
  await expect(page.getByText(/Não foi possível consultar/)).toBeVisible();
  await page.getByLabel("Rua", { exact: true }).fill("Rua manual");
  await expect(page.getByLabel("Rua", { exact: true })).toHaveValue(
    "Rua manual",
  );
  await page.unroute("https://viacep.com.br/ws/**");
  await page.route("https://viacep.com.br/ws/**", async (route) => {
    const old = route.request().url().includes("20040002");
    if (old) await new Promise((resolve) => setTimeout(resolve, 1500));
    await route
      .fulfill({
        json: {
          logradouro: old ? "Rua antiga" : "Rua atual",
          bairro: "Centro",
          localidade: "São Paulo",
          uf: "SP",
        },
      })
      .catch(() => {});
  });
  await page.getByLabel("CEP", { exact: true }).fill("20040002");
  await page.waitForTimeout(500);
  await page.getByLabel("CEP", { exact: true }).fill("01001000");
  await expect(page.getByLabel("Rua", { exact: true })).toHaveValue(
    "Rua atual",
  );
  await page.waitForTimeout(1600);
  await expect(page.getByLabel("Rua", { exact: true })).toHaveValue(
    "Rua atual",
  );
});
