import { useState } from "react";
import products from "../data/Products";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";

export default function Menu() {
  const [category, setCategory] = useState("All");

  const categories = ["All", "Coffee", "Iced", "Frappe", "Pastry"];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const handleAddToOrder = (product) => {
    console.log("Added to order:", product);
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f3ed",
        minHeight: "100vh",
      }}
    >
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#2d1b0f",
        }}
      >
        <div className="container">
          <a
            className="navbar-brand text-white fw-bold"
            href="#"
            style={{
              letterSpacing: "3px",
            }}
          >
            ☕ DEAR COFFEE
          </a>

          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menuNavbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  Menu
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white" href="#">
                  My Order
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="py-5 text-center text-white"
        style={{
          background:
            "linear-gradient(rgba(45,27,15,.82),rgba(45,27,15,.82)), url(https://images.unsplash.com/photo-1445116572660-236099ec97a0)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="fs-1">☕</div>

          <h1 className="display-5 fw-bold">Our Menu</h1>

          <p className="lead mb-0">Freshly brewed. Made with love.</p>
        </div>
      </div>

      <div className="container py-4">
        <CategoryFilter
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div className="container pb-5">
        <ProductList products={filteredProducts} onAdd={handleAddToOrder} />
      </div>

      <footer
        className="text-white text-center py-4"
        style={{
          backgroundColor: "#2d1b0f",
        }}
      >
        <div className="container">
          <h5 className="fw-bold">☕ DEAR COFFEE</h5>

          <p className="mb-0 small">
            Your favorite coffee, made fresh every day.
          </p>
        </div>
      </footer>
    </div>
  );
}
