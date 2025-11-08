import Products from "../models/products.js";

// CREATE
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock, brand, rating } =
      req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ message: "Missing product details" });
    }

    // Create product document
    const productDetails = new Products({
      name,
      description,
      price,
      category,
      image,
      stock: stock || 0,
      brand: brand || "n/a",
      rating: rating || 0,
    });

    const productAdd = await productDetails.save();

    res.status(201).json({
      message: "Product successfully added",
      product: productAdd,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//READ:
export const getProducts = async (req, res) => {
  try {
    const allProducts = Products.find();

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
