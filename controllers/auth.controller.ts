import { NextFunction, Request, Response } from "express";
import express from "express";
import HttpException from "../exceptions/httpException";
import { AuthService } from "../services/auth.service";
import authenticationMiddleware from "../middleware/auth.middleware";

class AuthController {
  router: express.Router;

  constructor(private authService: AuthService) {
    this.router = express.Router();
    this.router.post("/login", this.login);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new HttpException(400, "Email and password are required");
      }
      const employee = await this.authService.login(email, password);
      res.status(200).json(employee);
    } catch (error) {
      console.log(error)
      next(error); //???
    }
  };
}

export default AuthController;
