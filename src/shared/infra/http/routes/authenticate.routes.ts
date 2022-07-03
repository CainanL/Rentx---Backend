import { AuthenticateUserController } from "@modules/accounts/useCase/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCase/refreshToken/RefreshTokenController";
import { Router } from "express";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post('/session', authenticateUserController.handle);
authenticateRoutes.post('/refresh-token', refreshTokenController.handle);


export { authenticateRoutes };