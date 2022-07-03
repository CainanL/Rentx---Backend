import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";




class CategoriesRepositoryInMemory implements ICategoriesRepository{

    categories: Category[] = [];


    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name == name);
        return category;
    }

    async list(): Promise<Category[]> {
        const list = this.categories;
        return list;
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(
            category,
            {
                name, describe
            }
        )

        this.categories.push(category);
    }
}

export {CategoriesRepositoryInMemory};