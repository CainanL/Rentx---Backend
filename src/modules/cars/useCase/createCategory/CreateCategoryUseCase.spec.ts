import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRespositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', ()=>{

    beforeAll(()=>{
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    // it('should be able to create a new category', async ()=> {
        
    //     const category = {
    //         name: 'Category test',
    //         description: 'Category description test'
    //     }

    //     await createCategoryUseCase.execute({
    //         name: category.name,
    //         description: category.description
    //     });

    //     const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    //     console.log(categoryCreated);

    //     expect(categoryCreated).toHaveProperty('id');
    // });

    it('should not be able to create a new category with name exists', async ()=> {

        const category = {
            name: 'Category test',
            description: 'Category description test'
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });
        
        await expect(createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        ).rejects.toEqual(new AppError('Category already exists!'))

    });

})