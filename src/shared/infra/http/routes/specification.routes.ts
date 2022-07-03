import { CreateSpecificationController } from '@modules/cars/useCase/createSpecification/createSpecificationController';
import {Router} from 'express';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';


const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post('/', createSpecificationController.handle);

export {specificationRoutes};