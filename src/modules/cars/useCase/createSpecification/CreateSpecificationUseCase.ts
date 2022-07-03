import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRespository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {

    constructor(
        @inject('SpecificationRepository')
        private specificationsRepository: ISpecificationRepository
    ) { }

    execute({ name, description }: IRequest): void {

        const specificationAlreadyExists = this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new AppError('Specification already exists!');
        }

        this.specificationsRepository.create({
            name,
            description
        })
    }
}

export { CreateSpecificationUseCase };