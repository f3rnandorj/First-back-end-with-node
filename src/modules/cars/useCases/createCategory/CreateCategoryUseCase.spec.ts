import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    const name = category.name.toUpperCase();

    await createCategoryUseCase.execute({
      name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(name);

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description Test",
      };

      const name = category.name.toUpperCase();

      await createCategoryUseCase.execute({
        name,
        description: category.description,
      });

      await createCategoryUseCase.execute({
        name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
