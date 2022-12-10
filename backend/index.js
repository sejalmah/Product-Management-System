// importing express and mongoose
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// connect to mongo db server
mongoose.connect(
  "mongodb://localhost:27017/pms",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("connected to mongo db server");
  }
);

// this is schema
let productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  quantity: Number,
  color: String,
  desc: String,
  rating: Number,
});

let productModel = new mongoose.model("products", productSchema);

// use of middleware
app.use(express.json());
app.use(cors());
app.get("/products", async (req, res) => {
  let products = await productModel.find();
  res.send(products);
});

// app.get('/hello',(req,res)=>{
//     res.send("Second Request")
// })

app.post("/products", (req, res) => {
  let product = req.body;
  let proObj = new productModel(product);
  proObj.save();
  res.send({ message: "Pro-Created", product: proObj });
});

// creating & starting a server
app.listen(8000, () => {
  console.log("server is running");
});

// to delete a product
app.delete("/products/:id", async (req, res) => {
  await productModel.deleteOne({ _id: req.params.id });
  console.log(req.params.id);
  res.send({ message: "deleted" });
});

//to update a product
app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  await productModel.updateOne({ _id: id }, { $set: data });
  res.send({ message: "product updated" });
});
