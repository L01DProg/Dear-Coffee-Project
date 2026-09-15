import { useState } from "react";
import { AddProductFunction } from "../function/AddProductFunction";

export default function AddProduct({ show, onClose }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [sizes, setSizes] = useState([
    {
      size: "",
      price: "",
      stock: "",
    },
  ]);

  const addSize = () => {
    setSizes([
      ...sizes,
      {
        size: "",
        price: "",
        stock: "",
      },
    ]);
  };

  const removeSize = (index) => {
    if (sizes.length === 1) return;
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const updateSize = (index, field, value) => {
    const updated = [...sizes];
    updated[index][field] = value;
    setSizes(updated);
  };

  const resetForm = () => {
    setProductName("");
    setCategory("");
    setImage(null);
    setMessage("");
    setSizes([
      {
        size: "",
        price: "",
        stock: "",
      },
    ]);
  };

  const closeModal = () => {
    resetForm();
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          <div
            className="modal-header text-white"
            style={{ background: "#6F4E37" }}
          >
            <h5 className="modal-title fw-bold">☕ Add New Product</h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={closeModal}
            ></button>
          </div>

          <form
            onSubmit={(e) =>
              AddProductFunction({
                e,
                productName,
                category,
                image,
                sizes,
                setLoading,
                setMessage,
                resetForm,
                onClose,
              })
            }
          >
            <div className="modal-body p-3 p-md-4">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Product Name</label>

                  <input
                    type="text"
                    className="form-control"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    maxLength={25}
                    required
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">Category</label>

                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Coffee">Coffee</option>
                    <option value="Non-Coffee">Non-Coffee</option>
                    <option value="Tea">Tea</option>
                    <option value="Pastry">Pastry</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Product Image
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    accept=".jpg,.jpeg,.png,.svg"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>

              <hr className="my-4" />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Product Sizes</h5>

                <button
                  type="button"
                  className="btn btn-sm text-white"
                  style={{ background: "#6F4E37" }}
                  onClick={addSize}
                >
                  + Add Size
                </button>
              </div>

              {sizes.map((item, index) => (
                <div className="card border mb-3" key={index}>
                  <div className="card-body">
                    <div className="row g-3 align-items-end">
                      <div className="col-md-4">
                        <label className="form-label">Size</label>

                        <select
                          className="form-select"
                          value={item.size}
                          onChange={(e) =>
                            updateSize(index, "size", e.target.value)
                          }
                          required
                        >
                          <option value="">Select</option>
                          <option value="Small">Small</option>
                          <option value="Medium">Medium</option>
                          <option value="Large">Large</option>
                        </select>
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Price</label>

                        <input
                          type="number"
                          className="form-control"
                          value={item.price}
                          onChange={(e) =>
                            updateSize(index, "price", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label">Stock</label>

                        <input
                          type="number"
                          className="form-control"
                          value={item.stock}
                          onChange={(e) =>
                            updateSize(index, "stock", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="col-md-2">
                        <button
                          type="button"
                          className="btn btn-outline-danger w-100"
                          onClick={() => removeSize(index)}
                          disabled={sizes.length === 1}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {message && <div className="alert alert-danger">{message}</div>}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn text-white"
                style={{ background: "#6F4E37" }}
                disabled={loading}
              >
                {loading ? "Saving..." : "☕ Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
