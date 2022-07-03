import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {

    cars: Car[] = [];
    async create({ brand, name, description, daily_rate, category_id, fine_amount, license_plate, id }: ICreateCarsDTO): Promise<Car> {

        const car = new Car();

        Object.assign(car, {
            brand,
            name,
            description,
            daily_rate,
            category_id,
            fine_amount,
            license_plate,
            id
        });

        this.cars.push(car)
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {

        return this.cars.find(car => car.license_plate == license_plate);
    };

    async findAvailable(brand?: string, categories_id?: string, name?: string): Promise<Car[]> {
        const all = this.cars.filter((car) => {
            if (
                car.available === true ||
                ((brand && car.brand === brand) ||
                    (categories_id && car.category_id === categories_id) ||
                    (name && car.name === name))
            ) {
                return car;
            }
            return null;
        });
        return all;
    };

    async findById(id): Promise<Car>{
        return this.cars.find( car => car.id == id);
    };

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex(car => car.id == id);
        this.cars[findIndex].available = available;
    }
}

export { CarsRepositoryInMemory };