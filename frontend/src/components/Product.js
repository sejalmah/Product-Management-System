import React, { Component } from "react";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productToUpdate: {},
      isModalvisible: false,
    };
    this.product = {};
  }

  componentDidMount() {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ products: data });
      });
  }
  
  readValue(property, value, what = "create") {
    if (what === "create") {
      this.product[property] = value;
    } else if (what === "update") {
      let proU = this.state.productToUpdate;
      proU[property] = value;
      this.setState({ productToUpdate: proU });
    }
  }

  getProductForUpdate(index) {
    this.setState({ isModalvisible: true });
    let product = this.state.products[index];
    this.setState({ productToUpdate: product });
  }

  updateProduct() {
    let id = this.state.productToUpdate._id;
    fetch("http://localhost:8000/products/" + id, {
      method: "PUT",
      body: JSON.stringify(this.state.productToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ isModalvisible: false });
        // let tempProducts = this.state.products;
        // tempProducts.push(data.product);
        // this.setState({ products: tempProducts });
      });
  }

  createProduct() {
    fetch("http://localhost:8000/products", {
      method: "POST",
      body: JSON.stringify(this.product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let tempProducts = this.state.products;
        tempProducts.push(data.product);
        this.setState({ products: tempProducts });
      });
  }

  deleteProduct(id, index) {
    fetch("http://localhost:8000/products/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        let tempProducts = this.state.products;
        tempProducts.splice(index, 1);
        this.setState({ products: tempProducts });
      });
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          {this.state.isModalvisible === true ? (
            <div className="modal_parent">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Update Product</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      defaultValue={this.state.productToUpdate.name}
                      onChange={(event) => {
                        this.readValue("name", event.target.value, "update");
                      }}
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      defaultValue={this.state.productToUpdate.price}
                      onChange={(event) => {
                        this.readValue("price", event.target.value, "update");
                      }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Color"
                      defaultValue={this.state.productToUpdate.color}
                      onChange={(event) => {
                        this.readValue("color", event.target.value, "update");
                      }}
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Quantity"
                      defaultValue={this.state.productToUpdate.quantity}
                      onChange={(event) => {
                        this.readValue(
                          "quantity",
                          event.target.value,
                          "update"
                        );
                      }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category"
                      defaultValue={this.state.productToUpdate.category}
                      onChange={(event) => {
                        this.readValue(
                          "category",
                          event.target.value,
                          "update"
                        );
                      }}
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Rating"
                      defaultValue={this.state.productToUpdate.rating}
                      onChange={(event) => {
                        this.readValue("rating", event.target.value, "update");
                      }}
                    />
                    {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    defaultValue={this.state.productToUpdate.desc}
                    onChange={(event) => {
                      this.readValue("desc", event.target.value, "update");
                    }}
                  /> */}
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.updateProduct();
                      }}
                    >
                      UPDATE
                    </button>
                    {/* </div> */}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="container products"> </div>
        </div>

        <h1>ALL PRODUCTS</h1>
        <div className="form_container">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={(event) => {
              this.readValue("name", event.target.value);
            }}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            onChange={(event) => {
              this.readValue("price", event.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Color"
            onChange={(event) => {
              this.readValue("color", event.target.value);
            }}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            onChange={(event) => {
              this.readValue("quantity", event.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            onChange={(event) => {
              this.readValue("category", event.target.value);
            }}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Rating"
            onChange={(event) => {
              this.readValue("rating", event.target.value);
            }}
          />
          {/* <input
            type="text"
            className="form-control"
            placeholder="Description"
            onChange={(event) => {
              this.readValue("desc", event.target.value);
            }}
          /> */}
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.createProduct();
            }}
          >
            CREATE
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>COLOR</th>
              <th>QUANTITY</th>
              <th>CATEGORY</th>
              <th>RATING</th>
              {/* <th>DESCRIPTION</th> */}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, index) => {
              return (
                <tr>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.color}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>{product.rating}</td>
                  {/* <td>{product.desc}</td> */}
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        this.getProductForUpdate(index);
                      }}
                    >
                      {" "}
                      Update
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        this.deleteProduct(product._id, index);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
