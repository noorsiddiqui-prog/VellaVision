// seedProducts.js
import mongoose from "mongoose";
import Product from "../models/Product.js"; // Adjust path as necessary
import { dataProduct } from "./data.js"; // Adjust path as necessary

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Remove _id from products before inserting
    const productsWithoutId = dataProduct.map(({ _id, ...rest }) => rest);

    // Use bulkWrite for upsert (update or insert)
    const bulkOps = productsWithoutId.map((product) => ({
      updateOne: {
        filter: { name: product.name }, // You may choose another unique field if necessary
        update: { $set: product },
        upsert: true,
      },
    }));

    await Product.bulkWrite(bulkOps);
    console.log("Data inserted or updated successfully!");
  } catch (error) {
    console.error("Error inserting data:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

export default seedProducts;
