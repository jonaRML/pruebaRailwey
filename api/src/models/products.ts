import { Schema, model } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  available: boolean;
  categories: {
    [key: string]: any;
  };
  reviews: {
    [key: string]: any;
  };
  favorite: boolean;
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      required: true,
      type: String,
      default: "",
    },
    price: {
      required: true,
      type: Number,
    },
    stock: {
      required: true,
      type: Number,
      default: 0,
    },

    image: {
      required: true,
      type: String,
      default: "",
    },
    available: {
      type: Boolean,
    },
    favorite: {
      type: Boolean,
    },
    categories: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Categories",
      },
    ],
    reviews: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<IProduct>("Product", productSchema);
