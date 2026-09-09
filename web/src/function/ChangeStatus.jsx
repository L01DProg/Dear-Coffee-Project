export const newOrders = (orders) =>
  orders.filter((order) => order.status === "new");

export const preparingOrders = (orders) =>
  orders.filter((order) => order.status === "preparing");

export const readyOrders = (orders) =>
  orders.filter((order) => order.status === "ready");

export const changeStatus = async (id, status, setOrders) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/view/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: status,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return;
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: status } : order
      )
    );
  } catch (error) {
    console.log("Status update error:", error);
  }
};
