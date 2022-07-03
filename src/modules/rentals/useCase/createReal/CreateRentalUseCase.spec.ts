import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Rental', () => {

    const dayAdd24Hours = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    });

    it('should be able to create a new rental', async () => {

        const car = await carsRepositoryInMemory.create({
            name: 'Test',
            description: 'Car Test',
            daily_rate: 100,
            license_plate: 'test',
            fine_amount: 40,
            category_id: '1234',
            brand: 'brand'
        });

        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id: '12345',
            expected_return_date: dayAdd24Hours
        });
    });

    it('should not be able to create a new rental if theres is another open to the same user', async () => {

       await rentalsRepositoryInMemory.create({
            car_id: '1111',
            expected_return_date: dayAdd24Hours,
            user_id: '12345'
        })

        await expect(createRentalUseCase.execute({
            car_id: '121212',
            user_id: '12345',
            expected_return_date: dayAdd24Hours
        })).rejects.toEqual(new AppError('Theres a rental in progress fro user'));
    });


    it('should not be able to create a new rental if theres is another open to the same car', async () => {
        
        await createRentalUseCase.execute({
            car_id: 'test',
            user_id: '12345',
            expected_return_date: dayAdd24Hours
        });
        
        await expect(createRentalUseCase.execute({
                car_id: '321',
                user_id: 'test',
                expected_return_date: dayAdd24Hours
            })

        ).rejects.toEqual(new AppError('Car is unavailable'))
    });

    it('should not be able to create a new rental with invalid return time', async () => {
        await expect(createRentalUseCase.execute({
                car_id: '123',
                user_id: 'test',
                expected_return_date: dayjs().toDate()
            })

        ).rejects.toEqual(new AppError('Invalid return time!'));
    })

})