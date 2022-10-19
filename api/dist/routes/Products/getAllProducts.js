"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("../../models/products"));
const router = (0, express_1.Router)();
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield products_1.default.find().populate("categories", "name")
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
            });
            return filteredProds;
        }).then(result => res.send(result));
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.default = router;
