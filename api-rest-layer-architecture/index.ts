import 'reflect-metadata';
import { AppFactory } from './src/app-factory';
import { factoryServer } from './server';

(async () => {
  const { customerController, authController } = await AppFactory.build();

  const server = factoryServer({
    customerController,
    authController,
  });

  server.listen(3000, () => {});
})();
