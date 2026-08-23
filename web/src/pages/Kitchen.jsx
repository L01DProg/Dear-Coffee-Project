import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const viewOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/view/order-list",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Fetching Error");
        return;
      }

      console.log("FULL RESPONSE:", data);
      console.log("ORDERS:", data.order);

      setOrders(data.order || []);
    } catch (error) {
      console.log(error);
      setMessage("Unable to connect to server.");
    }
  };

  useEffect(() => {
    viewOrder();
  }, []);

  const newOrders = orders.filter((order) => order.status === "new");

  const preparingOrders = orders.filter(
    (order) => order.status === "preparing"
  );

  const readyOrders = orders.filter((order) => order.status === "ready");

  const changeStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: status } : order
      )
    );
  };

  return (
    <>
      <style>
        {`
          .kitchen-page {
            background: #F4F1EC;
            min-height: 100vh;
          }

          .kitchen-header {
            background: #fff;
          }

          .kitchen-column {
            min-height: 300px;
          }

          .orders-container {
            display: grid;
            gap: 1rem;
          }

          .order-card {
            width: 100%;
          }

          @media (max-width: 575.98px) {
            .kitchen-page {
              padding-left: 10px !important;
              padding-right: 10px !important;
            }

            .kitchen-header {
              padding: 14px !important;
            }

            .kitchen-title {
              font-size: 1.25rem !important;
            }

            .kitchen-column {
              padding: 14px !important;
              min-height: auto;
            }

            .status-title {
              font-size: 0.8rem !important;
            }

            .order-card-body {
              padding: 14px !important;
            }
          }

          @media (min-width: 576px) and (max-width: 991.98px) {
            .kitchen-column {
              min-height: 350px;
            }
          }

          @media (min-width: 992px) {
            .kitchen-column {
              min-height: calc(100vh - 150px);
            }
          }

          .text-break {
            overflow-wrap: anywhere;
          }
        `}
      </style>

      <div className="container-fluid py-3 py-md-4 px-2 px-sm-3 px-md-4 kitchen-page">
        <div className="kitchen-header rounded-4 shadow-sm p-3 p-md-4 mb-3 mb-md-4">
          <div className="d-flex justify-content-between align-items-center gap-3">
            <div className="min-width-0">
              <h3 className="fw-bold m-0 kitchen-title">Kitchen Display</h3>

              <small className="text-muted d-none d-sm-block">
                Manage incoming orders
              </small>
            </div>

            <button
              type="button"
              className="btn btn-light rounded-circle shadow-sm d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: "44px",
                height: "44px",
              }}
            >
              <i className="bi bi-volume-up fs-5"></i>
            </button>
          </div>
        </div>

        {message && (
          <div
            className="alert alert-danger text-center rounded-3"
            role="alert"
          >
            {message}
          </div>
        )}

        <div className="row g-3 g-md-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-white rounded-4 shadow-sm p-3 p-md-4 h-100 kitchen-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-danger m-0 status-title">
                  NEW ORDERS
                </h6>

                <span className="badge bg-danger rounded-pill px-3 py-2">
                  {newOrders.length}
                </span>
              </div>

              <div className="orders-container">
                {newOrders.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-inbox fs-2 d-block mb-2"></i>

                    <span>No Orders</span>
                  </div>
                ) : (
                  newOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      button="START"
                      btnClass= "btn-dark"
                      nextStatus="preparing"
                      onStatusChange={changeStatus}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-white rounded-4 shadow-sm p-3 p-md-4 h-100 kitchen-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-warning m-0 status-title">
                  PREPARING
                </h6>

                <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
                  {preparingOrders.length}
                </span>
              </div>

              <div className="orders-container">
                {preparingOrders.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-hourglass-split fs-2 d-block mb-2"></i>

                    <span>No Orders</span>
                  </div>
                ) : (
                  preparingOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      button="READY"
                      btnClass="btn-warning"
                      nextStatus="ready"
                      onStatusChange={changeStatus}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ================= READY ================= */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="bg-white rounded-4 shadow-sm p-3 p-md-4 h-100 kitchen-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-success m-0 status-title">READY</h6>

                <span className="badge bg-success rounded-pill px-3 py-2">
                  {readyOrders.length}
                </span>
              </div>

              <div className="orders-container">
                {readyOrders.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="bi bi-check-circle fs-2 d-block mb-2"></i>

                    <span>No Orders</span>
                  </div>
                ) : (
                  readyOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      button="DONE"
                      btnClass="btn-success"
                      nextStatus="completed"
                      onStatusChange={changeStatus}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
