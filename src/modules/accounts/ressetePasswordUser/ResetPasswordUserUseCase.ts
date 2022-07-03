import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../repositories/IUsersTokensRepository";
import {hash} from 'bcrypt';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {

    constructor(
        @inject('UsersTokensRepository')
        private usersTokenRepository: IUsersTokensRepository,

        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokenRepository.findByRefreshToken(token);

        if(!userToken){
            throw new AppError('Token invalid!')
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppError('Token expired!');
        }

        const user = await this.usersRepository.findById(userToken.id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);
        await this.usersTokenRepository.deleteById(userToken.user_id);
    }
}

export { ResetPasswordUserUseCase };