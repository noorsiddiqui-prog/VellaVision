import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: String,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
    image: String,
  },
  { timestamps: true }
);

// ProductSchema.index({ name: 1 }, { unique: true });

const Product = mongoose.model("Product", ProductSchema);
export default Product;
