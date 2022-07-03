

import { CreateRentalController } from '@modules/rentals/useCase/createReal/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCase/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController';
import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();



rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.post('/devolution/:id', ensureAuthenticated, ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUserController.handle)


export { rentalRoutes };