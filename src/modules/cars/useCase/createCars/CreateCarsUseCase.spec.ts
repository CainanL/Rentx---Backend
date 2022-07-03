import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarsUseCase } from "./CreateCarsUseCase"

let createCarUseCae: CreateCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCae = new CreateCarsUseCase(carsRepositoryInMemory);
    });

    it('should be able to create a new car', async () => {
        const car = await createCarUseCae.execute({
            name: 'Name Car',
            description: 'Description car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'Category'
        });

        expect(car).toHaveProperty('id');
    });

    it('should not be able to create a car with exists license plate', async () => {
        await createCarUseCae.execute({
            name: 'Car 1',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category'
        });
       
        await expect(createCarUseCae.execute({
                name: 'Car 2',
                description: 'Description Car',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 60,
                brand: 'Brand',
                category_id: 'category'
            })
       ).rejects.toEqual(new AppError('Car already exists!'));
    })

    it('should not be able to create a car with available true by default', async () => {
        const car = await createCarUseCae.execute({
            name: 'Car available',
            description: 'Description Car',
            daily_rate: 100,
            brand: 'Brand',
            category_id: 'category',
            fine_amount: 60,
            license_plate: 'ABCD-1234'
        });

        expect(car.available).toBe(true);
    });

})