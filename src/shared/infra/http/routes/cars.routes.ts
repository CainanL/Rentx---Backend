
import { CreateCarController } from "@modules/cars/useCase/createCars/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/createCarSpecification/CreateCarSpecificationController";
import { ListaAvailableCarsController } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsControle";
import { UploadCarImagesController } from "@modules/cars/useCase/uploadCarImage/UploadCarImagesController";
import { Router } from "express";
import multer from "multer";
import uploadConfig from '@config/upload';
import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listaAvailableCarsController = new ListaAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listaAvailableCarsController.handle);
carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarImagesController.handle)



export { carsRoutes };