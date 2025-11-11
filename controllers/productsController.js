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
    const allProducts = await Products.find();

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//UPDATE:
export const updateProd = async (req, res) => {
  try {
    const { name } = req.body;

    const item = await Products.find(name);
    if (!item) {
      return res
        .status(404)
        .json({ message: "That products does not exist yet." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE
export const deleteProd = async (req, res) => {
  try {
    const { _id } = req.body;

    const doesProdExist = await Products.findById(_id);
    if (doesProdExist == null) {
      return res.status(404).json({ message: "That product does not exist" });
    }

    await doesProdExist.deleteOne();

    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
