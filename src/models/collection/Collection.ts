import { Schema, model } from "mongoose";

export enum CollectionStatus {
  PUBLISHED = "published",
  PENDING = "pending",
  CLOSED = "closed",
  REJECTED = "rejected",
}

export interface ICollection {
  title: string;
  description: string;
  field: string;
  dueDate: Date;
  status: CollectionStatus;
  author: string;
  monobankJarWidgetId: string;
  monobankJarLink: string;
  rejectReason: string | null;
  _id: string;
}

const Collection = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  field: {
    type: Schema.Types.ObjectId,
    ref: "Field",
    required: true,
  },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(CollectionStatus),
    default: CollectionStatus.PENDING,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  monobankJarWidgetId: { type: String, required: true },
  monobankJarLink: { type: String, required: true },
  rejectReason: { type: String },
});

export default model("Fee", Collection);
