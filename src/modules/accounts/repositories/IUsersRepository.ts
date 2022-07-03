
import { User } from "../infra/typeorm/entities/Users";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export {IUsersRepository};