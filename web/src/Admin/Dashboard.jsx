import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import Main from "./main";
import AddProduct from "../components/AddProduct";
import products from "../data/Products";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";

export default function Admin() {
  const navigate = useNavigate();

  const [page, setPage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [category, setCategory] = useState("All");

  const menuItems = [
    { name: "dashboard", label: "Dashboard" },
    { name: "products", label: "Products" },
    { name: "orders", label: "Orders" },
    { name: "users", label: "Users" },
  ];

  const categories = ["All", "Coffee", "Iced", "Frappe", "Pastry"];

  const changePage = (pageName) => {
    setPage(pageName);
    setMenuOpen(false);
  };

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <div
      className="container-fluid p-0"
      style={{
        background: "#f5f1eb",
        minHeight: "100vh",
      }}
    >
      <nav
        className="navbar navbar-dark sticky-top px-3 px-md-4 py-3 shadow-sm"
        style={{ background: "#6F4E37" }}
      >
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-light d-lg-none me-2"
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              ☰
            </button>

            <span className="navbar-brand text-white fw-bold mb-0">
              ☕ <span className="d-none d-sm-inline">Dear Coffee </span>
              Admin
            </span>
          </div>

          <Logout navigate={navigate} />
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          <aside
            className="col-lg-2 d-none d-lg-block bg-dark text-white p-3"
            style={{
              minHeight: "calc(100vh - 72px)",
              position: "sticky",
              top: "72px",
            }}
          >
            <div className="mb-4">
              <small className="text-secondary fw-bold">ADMIN MENU</small>
            </div>

            <div className="d-flex flex-column gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  className={`btn text-start py-2 px-3 ${
                    page === item.name
                      ? "btn-warning text-dark"
                      : "btn-outline-light"
                  }`}
                  onClick={() => changePage(item.name)}
                >
                  <span className="me-3">{item.icon}</span>

                  {item.label}
                </button>
              ))}
            </div>

            <div className="border-top border-secondary mt-4 pt-4">
              <small className="text-secondary">
                Dear Coffee Management System
              </small>
            </div>
          </aside>

          {menuOpen && (
            <div className="col-12 d-lg-none bg-dark p-3">
              <div className="d-grid gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    className={`btn text-start ${
                      page === item.name
                        ? "btn-warning text-dark"
                        : "btn-outline-light"
                    }`}
                    onClick={() => changePage(item.name)}
                  >
                    <span className="me-3">{item.icon}</span>

                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <main className="col-12 col-lg-10">
            <div className="p-3 p-sm-4 p-xl-5">
              {page === "dashboard" && <Main />}

              {page === "products" && (
                <>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                    <div>
                      <h2 className="fw-bold mb-1">Products</h2>

                      <p className="text-muted mb-0">
                        Manage your coffee products.
                      </p>
                    </div>

                    <button
                      className="btn text-white"
                      style={{
                        background: "#6F4E37",
                      }}
                      onClick={() => setAddProductModal(true)}
                    >
                      + Add Product
                    </button>
                  </div>

                  <div className="mb-4">
                    <CategoryFilter
                      categories={categories}
                      category={category}
                      setCategory={setCategory}
                    />
                  </div>

                  <ProductList
                    products={filteredProducts}
                    onAdd={(product) => {
                      console.log("Selected product:", product);
                    }}
                  />
                </>
              )}

              {page === "orders" && (
                <>
                  <div className="mb-4">
                    <h2 className="fw-bold mb-1">Order Management</h2>

                    <p className="text-muted mb-0">
                      Monitor and manage customer orders.
                    </p>
                  </div>

                  <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="px-3 px-md-4">Order</th>

                            <th>Items</th>

                            <th>Status</th>

                            <th className="pe-3">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className="px-3 px-md-4 fw-semibold">
                              #000121
                            </td>

                            <td>2 Items</td>

                            <td>
                              <span className="badge bg-info text-dark">
                                New
                              </span>
                            </td>

                            <td>
                              <button className="btn btn-sm btn-warning">
                                Prepare
                              </button>
                            </td>
                          </tr>

                          <tr>
                            <td className="px-3 px-md-4 fw-semibold">
                              #000122
                            </td>

                            <td>1 Item</td>

                            <td>
                              <span className="badge bg-warning text-dark">
                                Preparing
                              </span>
                            </td>

                            <td>
                              <button className="btn btn-sm btn-success">
                                Ready
                              </button>
                            </td>
                          </tr>

                          <tr>
                            <td className="px-3 px-md-4 fw-semibold">
                              #000123
                            </td>

                            <td>3 Items</td>

                            <td>
                              <span className="badge bg-success">Ready</span>
                            </td>

                            <td>
                              <button className="btn btn-sm btn-dark">
                                Complete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {page === "users" && (
                <>
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                    <div>
                      <h2 className="fw-bold mb-1">Employee Accounts</h2>

                      <p className="text-muted mb-0">Manage employee access.</p>
                    </div>

                    <button
                      className="btn text-white w-100"
                      style={{
                        background: "#6F4E37",
                      }}
                    >
                      + Add User
                    </button>
                  </div>

                  <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th className="px-3 px-md-4">Username</th>

                            <th>Role</th>

                            <th>Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className="px-3 px-md-4 fw-semibold">Lloyd</td>

                            <td>Admin</td>

                            <td>
                              <span className="badge bg-success">Active</span>
                            </td>
                          </tr>

                          <tr>
                            <td className="px-3 px-md-4 fw-semibold">Sarah</td>

                            <td>Cashier</td>

                            <td>
                              <span className="badge bg-success">Active</span>
                            </td>
                          </tr>

                          <tr>
                            <td className="px-3 px-md-4 fw-semibold">
                              Michael
                            </td>

                            <td>Cashier</td>

                            <td>
                              <span className="badge bg-secondary">
                                Offline
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>

      <AddProduct
        show={addProductModal}
        onClose={() => setAddProductModal(false)}
      />
    </div>
  );
}
