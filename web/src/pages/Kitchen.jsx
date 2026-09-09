import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";

import {
  newOrders,
  preparingOrders,
  readyOrders,
  changeStatus,
} from "../function/ChangeStatus";
import Logout from "../components/Logout";

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

      setOrders(data.order || []);
    } catch (error) {
      console.log(error);
      setMessage("Unable to connect to server.");
    }
  };

  useEffect(() => {
    viewOrder();
  }, []);

  const newOrderList = newOrders(orders);
  const preparingOrderList = preparingOrders(orders);
  const readyOrderList = readyOrders(orders);

  return (
    <>
      <style>{`
        .kitchen-page{
          background:#F4F1EC;
          min-height:100vh;
        }

        .kitchen-header{
          background:#fff;
        }

        .kitchen-column{
          min-height:300px;
        }

        .orders-container{
          display:grid;
          gap:1rem;
        }
      `}</style>

      <div className="container-fluid py-4 kitchen-page">
        <div className="kitchen-header rounded-4 shadow-sm p-4 mb-4 sticky-top">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="fw-bold m-0">Kitchen Display</h3>
              <small className="text-muted">Manage incoming orders</small>
            </div>
            <Logout />
          </div>
        </div>

        {message && (
          <div className="alert alert-danger text-center">{message}</div>
        )}

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100 kitchen-column">
              <div className="d-flex justify-content-between mb-3">
                <h6 className="fw-bold text-danger">NEW ORDERS</h6>
                <span className="badge bg-danger rounded-pill">
                  {newOrderList.length}
                </span>
              </div>

              <div className="orders-container">
                {newOrderList.length === 0 ? (
                  <div className="text-center text-muted py-4">No Orders</div>
                ) : (
                  newOrderList.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      button="START"
                      btnClass="btn-dark"
                      nextStatus="preparing"
                      onStatusChange={(id, status) =>
                        changeStatus(id, status, setOrders)
                      }
                    />
                  ))
                )}
              </div>
            </div>
          </div>

         
          <div className="col-lg-4">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100 kitchen-column">
              <div className="d-flex justify-content-between mb-3">
                <h6 className="fw-bold text-warning">PREPARING</h6>
                <span className="badge bg-warning text-dark rounded-pill">
                  {preparingOrderList.length}
                </span>
              </div>

              <div className="orders-container">
                {preparingOrderList.length === 0 ? (
                  <div className="text-center text-muted py-4">No Orders</div>
                ) : (
                  preparingOrderList.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      button="READY"
                      btnClass="btn-warning"
                      nextStatus="ready"
                      onStatusChange={(id, status) =>
                        changeStatus(id, status, setOrders)
                      }
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          
          <div className="col-lg-4">
            <div className="bg-white rounded-4 shadow-sm p-4 h-100 kitchen-column">
              <div className="d-flex justify-content-between mb-3">
                <h6 className="fw-bold text-success">READY</h6>
                <span className="badge bg-success rounded-pill">
                  {readyOrderList.length}
                </span>
              </div>

              <div className="orders-container">
                {readyOrderList.length === 0 ? (
                  <div className="text-center text-muted py-4">No Orders</div>
                ) : (
                  readyOrderList.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      button="DONE"
                      btnClass="btn-success"
                      nextStatus="completed"
                      onStatusChange={(id, status) =>
                        changeStatus(id, status, setOrders)
                      }
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
