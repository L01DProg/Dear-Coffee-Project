export default function ProductCard({ product, onAdd }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div
        className="card h-100 border-0 shadow-sm"
        style={{
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{
            height: "210px",
            objectFit: "cover",
          }}
        />

        <div className="card-body d-flex flex-column">
          <span className="small fw-semibold mb-2" style={{ color: "#9a6338" }}>
            {product.category}
          </span>

          <h5 className="card-title fw-bold" style={{ color: "#332217" }}>
            {product.name}
          </h5>

          <p className="card-text text-secondary small">
            {product.description}
          </p>

          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold fs-5" style={{ color: "#7b451f" }}>
                ₱{product.price}
              </span>

              <span className="text-muted small">Regular</span>
            </div>

            <button
              className="btn w-100 text-white fw-semibold"
              style={{
                backgroundColor: "#7b451f",
                borderRadius: "10px",
              }}
              onClick={() => onAdd?.(product)}
            >
              + Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
