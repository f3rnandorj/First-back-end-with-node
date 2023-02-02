import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name: simpleName, description }: IRequest): void {
    const name = simpleName.toUpperCase();

    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error(`Category ${name} already exists!`);
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
