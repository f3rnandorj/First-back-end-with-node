import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationsService } from "../modules/cars/services/CreateSpecificationsService";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationsService(
    specificationsRepository
  );

  createSpecificationService.execute({ name, description });

  return res.status(201).json();
});

export { specificationsRoutes };
