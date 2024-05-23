import { Request, Response } from "express";
import Collection, { ICollection } from "../models/collection/Collection";
import Field from "../models/collection/Field";

type CollectionCreateRequest = Request & {
  body: Omit<ICollection, "_id" | "status">;
};
type CollectionUpdateRequest = Request & { body: ICollection };

class CollectionController {
  async createCollection(req: CollectionCreateRequest, res: Response) {
    try {
      const {
        title,
        description,
        field,
        monobankJarLink,
        monobankJarWidgetId,
        dueDate,
        author,
      } = req.body;

      const newCollection = new Collection({
        title,
        description,
        field,
        monobankJarLink,
        monobankJarWidgetId,
        dueDate,
        author,
      });

      await newCollection.save();

      return res.json(newCollection);
    } catch (error) {
      res.status(400).json({ message: "sth went wrong" });
    }
  }

  async updateCollection(req: CollectionUpdateRequest, res: Response) {
    try {
      const { _id: collectionId, ...updateData } = req.body;

      const updatedCollection = await Collection.findByIdAndUpdate(
        collectionId,
        updateData,
        { new: true }
      );

      if (!updatedCollection) {
        return res.status(404).json({ message: "Collection not found" });
      }

      res.json(updatedCollection);
    } catch (error) {
      console.error("Error updating collection:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteCollection(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const deletedCollection = await Collection.findByIdAndDelete(id);

      if (!deletedCollection)
        return res.status(404).json({ message: "Collection not found" });

      res.json(deletedCollection);
    } catch (error) {
      res.status(400).json({ message: "sth went wrong" });
    }
  }

  async getCollectionById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const collection = await Collection.findById(id);

      if (!collection)
        return res.status(404).json({ message: "Collectioin not found" });

      res.json(collection);
    } catch (error) {}
  }

  async getAllCollections(req: Request, res: Response) {
    try {
      const collections = await Collection.find()
        .populate("author")
        .populate("field");

      res.json(collections);
    } catch (error) {
      res.status(400).json({ message: "sth went wrong" });
    }
  }

  async createField(req: Request & { body: { title: string } }, res: Response) {
    try {
      const { title } = req.body;

      const newField = new Field({ title });

      await newField.save();

      res.json(newField);
    } catch (error) {
      res.status(400).json({ message: "sth went wrong" });
    }
  }

  async deleteField(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deltedItem = await Field.findByIdAndDelete(id);

      res.json(deltedItem);
    } catch (error) {
      res.status(400).json({ message: "sth went wrong" });
    }
  }

  async getAllFields(req: Request, res: Response) {
    try {
      const fields = await Field.find();

      return res.json(fields);
    } catch (error) {
      res.status(400).json({ message: "sth went wrong" });
    }
  }
}

export const collectionController = new CollectionController();
