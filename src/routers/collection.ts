import { Router } from "express";
import { collectionController } from "../controllers/collection";

export const collectionRouter = Router();
export const fieldRouter = Router();

collectionRouter.post("/", collectionController.createCollection);
collectionRouter.patch("/", collectionController.updateCollection);
collectionRouter.get("/", collectionController.getAllCollections);
collectionRouter.get("/:id", collectionController.getCollectionById);

fieldRouter.post("/", collectionController.createField);
fieldRouter.delete("/:id", collectionController.deleteField);
fieldRouter.get("/", collectionController.getAllFields);
