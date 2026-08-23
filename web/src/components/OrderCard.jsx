export default function OrderCard({
  order,
  button,
  btnClass,
  nextStatus,
  onStatusChange,
}) {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between">
          <h5 className="fw-bold">{order.order_number}</h5>

          <small className="text-muted">{order.items?.length || 0} items</small>
        </div>

        <hr />

        <div>
          {order.items?.length > 0 ? (
            order.items.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-start mb-3"
              >
                <div>
                  <div className="fw-semibold">{item.product?.name}</div>

                  <small className="text-muted">
                    Size: {item.product_size?.size}
                  </small>
                </div>

                <div className="text-end">
                  <div className="fw-bold">{item.quantity}x</div>

                  <small className="text-muted">₱{item.price}</small>
                </div>
              </div>
            ))
          ) : (
            <div className="text-muted">No items</div>
          )}
        </div>

        <hr />

        <button
          type="button"
          className={`btn ${btnClass} text-white fw-bold mt-3 rounded-3 w-100`}
          onClick={() => onStatusChange(order.id, nextStatus)}
        >
          {button}
        </button>
      </div>
    </div>
  );
}
