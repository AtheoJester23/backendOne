import Products from "../models/products.js";

//Get Specific Product:
export const findProd = async (req, res, next) => {
  let retrievedData;
  try {
    retrievedData = await Products.findById(req.params.id);

    if (retrievedData == null) {
      return res.status(404).json({ message: "That product does not exist." });
    }

    req.products = retrievedData;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  next();
};
