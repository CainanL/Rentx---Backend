import dayjs from 'dayjs';
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CreateRentalUseCase } from '@modules/rentals/useCase/createReal/CreateRentalUseCase';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepository: CarsRepository;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {

    const dayAdd24Hours = dayjs().add(1, 'day').toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepository = new CarsRepository()
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepository);
    });

    it('should be able to create a new rental', async ()=> {
        const rental = await createRentalUseCase.execute({
            car_id: '121212',
            user_id: '12345',
            expected_return_date: dayAdd24Hours
        });
    });

    it('should not be able to create a new rental if theres is another open to the same user', async ()=> {
        expect(async ()=>{    
            await createRentalUseCase.execute({
                car_id: '121212',
                user_id: '12345',
                expected_return_date: dayAdd24Hours
            });
    
            await createRentalUseCase.execute({
                car_id: '121212',
                user_id: '12345',
                expected_return_date: dayAdd24Hours
            });
    
        }).rejects.toBeInstanceOf(AppError);
    });


    it('should not be able to create a new rental if theres is another open to the same car', async ()=> {
        expect(async ()=>{    
            await createRentalUseCase.execute({
                car_id: '123',
                user_id: 'test',
                expected_return_date: dayAdd24Hours
            });
    
            await createRentalUseCase.execute({
                car_id: '321',
                user_id: 'test',
                expected_return_date: dayAdd24Hours
            });
    
        }).rejects.not.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new rental with invalid return time', async ()=> {
        expect(async ()=>{    
            await createRentalUseCase.execute({
                car_id: '123',
                user_id: 'test',
                expected_return_date: dayjs().toDate()
            });
    
        }).rejects.toBeInstanceOf(AppError);
    })

})