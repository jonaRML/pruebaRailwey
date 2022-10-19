import { response, Router } from "express";

import ProductModel from "../../models/products";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    await ProductModel.find().populate("categories", "name")
      .then(products => {
        let filteredProds = products.map(item => {
          let container = { name: "", description: "", price: 0, stock: 0, image: "", available: true, favorite: true, categories: [""] };
          container.name = item.name;
          container.description = item.description;
          container.price = item.price;
          container.stock = item.stock;
          container.image = item.image;
          container.available = item.available;
          container.favorite = item.favorite;
          container.categories = item.categories[0].name;
          return container;
        })
        return filteredProds;
      }).then(result => res.send(result))
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

export default router;
