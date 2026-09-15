export default function Main() {
  return (
    <>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">Dashboard Overview</h2>

        <p className="text-muted mb-0">
          Welcome to your Dear Coffee administration panel.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="row g-3 g-xl-4 mb-4">
        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-2">Today's Sales</p>

                  <h4 className="fw-bold mb-0">₱12,580</h4>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#f5f1eb",
                  }}
                >
                  ₱
                </div>
              </div>

              <small className="text-success">+12% today</small>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-2">Orders</p>

                  <h4 className="fw-bold mb-0">48</h4>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#f5f1eb",
                  }}
                >
                  #
                </div>
              </div>

              <small className="text-success">+8% today</small>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-2">Products</p>

                  <h4 className="fw-bold mb-0">32</h4>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#f5f1eb",
                  }}
                >
                  ☕
                </div>
              </div>

              <small className="text-muted">Available products</small>
            </div>
          </div>
        </div>

        <div className="col-6 col-xl-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-muted small mb-2">Employees</p>

                  <h4 className="fw-bold mb-0">6</h4>
                </div>

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "#f5f1eb",
                  }}
                >
                  ♙
                </div>
              </div>

              <small className="text-muted">Staff accounts</small>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="d-flex justify-content-between align-items-center p-3 p-md-4 border-bottom">
            <div>
              <h5 className="fw-bold mb-1">Recent Orders</h5>

              <small className="text-muted">Latest customer orders</small>
            </div>

            <button
              className="btn btn-sm btn-outline-dark"
            >
              View All
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-3 px-md-4">Order</th>

                  <th>Customer</th>

                  <th>Status</th>

                  <th className="pe-3 pe-md-4">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="px-3 px-md-4 fw-semibold">#000101</td>

                  <td>John</td>

                  <td>
                    <span className="badge bg-warning text-dark">
                      Preparing
                    </span>
                  </td>

                  <td className="pe-3 pe-md-4">₱250</td>
                </tr>

                <tr>
                  <td className="px-3 px-md-4 fw-semibold">#000102</td>

                  <td>Maria</td>

                  <td>
                    <span className="badge bg-success">Ready</span>
                  </td>

                  <td className="pe-3 pe-md-4">₱180</td>
                </tr>

                <tr>
                  <td className="px-3 px-md-4 fw-semibold">#000103</td>

                  <td>Kevin</td>

                  <td>
                    <span className="badge bg-info text-dark">New</span>
                  </td>

                  <td className="pe-3 pe-md-4">₱320</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
