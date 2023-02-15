import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name: simpleName, description }: IRequest): Promise<void> {
    const name = simpleName.toUpperCase();

    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new Error(`Category ${name} already exists!`);
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
