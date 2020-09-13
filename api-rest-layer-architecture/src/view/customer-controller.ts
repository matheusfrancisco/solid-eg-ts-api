import CustomerService from '../application/customer-service';
// #TODO create error to each layer
import { ServiceError } from '../service-error';

const buildErrorMessage = (message: string) => ({ error: message });

const buildCustomerController = (customerService: CustomerService) => ({
  post: async (req: any, res: any) => {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(400).json(buildErrorMessage('Parameters missing'));
      return;
    }
    try {
      await customerService.createCustomer(req.body.email, req.body.password);
      res.json({ message: 'sucess' });
      res.status(201).end();
      return res;
    } catch (error) {
      const status = error.constructor.name === 'ServiceError' ? 400 : 500;
      res.status(status).json(buildErrorMessage(error.message));
    }
  },
  updateFullName: async (req: any, res: any) => {
    if (!req.body || !req.body.lastName || !req.body.firstName) {
      res.status(400).json(buildErrorMessage('Parameters missing'));
      return;
    }

    const customerUpdated = await customerService.updateFullName(
      req.body.email,
      req.body.firstName,
      req.body.lastName,
    );
    res.json({
      ...customerUpdated,
      success: true,
    });
    res.status(201).end();
    return res;
  },
  updateTaxpayerRegistry: async (req: any, res: any) => {
    if (!req.body || !req.body.cpf || !req.body.countryCode) {
      res.status(400).json(buildErrorMessage('Parameters missing'));
      return;
    }

    try {
      const customerUpdated = await customerService.updateTaxpayerRegistry(
        req.body.email,
        req.body.cpf,
        req.body.countryCode,
      );
      res.json({
        ...customerUpdated,
        success: true,
      });
      res.status(201).end();
      return res;
    } catch (error) {
      const status = error.constructor.name === 'ServiceError' ? 400 : 500;
      res.status(status).json(buildErrorMessage(error.message));
    }
  },
  updateAddress: async (req: any, res: any) => {
    if (
      !req.body ||
      !req.body.cep ||
      !req.body.address ||
      !req.body.city ||
      !req.body.number ||
      !req.body.state
    ) {
      res.status(400).json(buildErrorMessage('Parameters missing'));
      return;
    }
    try {
      const customerUpdated = await customerService.updateAddress(
        req.body.email,
        req.body.address,
        req.body.cep,
        req.body.city,
        req.body.number,
        req.body.state,
      );
      res.json({
        ...customerUpdated,
        success: true,
      });
      res.status(201).end();
      return res;
    } catch (error) {
      const status = error.constructor.name === 'ServiceError' ? 400 : 500;
      res.status(status).json(buildErrorMessage(error.message));
    }
  },
});

export { buildCustomerController, ServiceError };
