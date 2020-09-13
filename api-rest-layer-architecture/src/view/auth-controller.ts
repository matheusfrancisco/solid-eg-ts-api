import Auth from '../application/auth-service';
// #TODO create error to each layer
import { ServiceError } from '../service-error';
import { NextFunction, Request, Response } from 'express';

const buildErrorMessage = (message: string) => ({ error: message });

const buildAuthController = (authService: Auth) => ({
  post: async (req: any, res: any) => {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(400).json(buildErrorMessage('Parameters missing'));
      return;
    }
    try {
      const token = await authService.singIn(req.body.email, req.body.password);
      res.json({ token });
      res.status(201).end();
      return res;
    } catch (error) {
      const status = error.constructor.name === 'ServiceError' ? 400 : 500;
      res.status(status).json(buildErrorMessage(error.message));
    }
  },

  get: async (req: any, res: any, next: NextFunction) => {
    if (!req.headers) {
      res.status(400).json(buildErrorMessage('Parameters missing'));
      return;
    }
    try {
      const payload = (await authService.verify(req.headers['authorization'], req.url)) as Record<
        string,
        string
      >;
      if (payload) {
        req.body.email = payload.email;
        return next();
      } else {
        throw new ServiceError('Invalid endpoint order');
      }
    } catch (error) {
      const status = error.constructor.name === 'ServiceError' ? 400 : 500;
      res.status(status).json(buildErrorMessage(error.message));
    }
  },
});

export { buildAuthController, ServiceError };
