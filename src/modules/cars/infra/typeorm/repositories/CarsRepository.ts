import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor(){
        this.repository = getRepository(Car);
    }

    async create({brand, license_plate, fine_amount, category_id, daily_rate, description, name, id }: ICreateCarsDTO): Promise<Car> {

        const car = this.repository.create({            
            brand,
            category_id,            
            daily_rate,
            description,
            fine_amount, 
            license_plate,
            name,
            id
        })

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        
       const car = await this.repository.findOne({license_plate});

       return car;
    }


    
    async findAvailable(brand?: string, categories_id?: string, name?: string): Promise<Car[]> {
        
        const carsQuery = await this.repository
        .createQueryBuilder('c')
        .where('available = :available', {available: true});

        if(brand){
            carsQuery.andWhere('c.brand = :brand', {brand})
        }

        if(name){
            carsQuery.andWhere('c.name = :name', {name})
        }

        if(categories_id){
            carsQuery.andWhere('c.categories_id = :categories_id', {categories_id})
        }

        const cars = await carsQuery.getMany();
        
        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository.createQueryBuilder()
        .update()
        .set({available})
        .where('id = :id')
        .setParameters({id})
        .execute()
    }

}

export { CarsRepository };