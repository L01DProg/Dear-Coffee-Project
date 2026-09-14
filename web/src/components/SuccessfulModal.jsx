export default function SuccessfulModal({ showModal, setShowModal, navigate }) {
  if (!showModal) return null;

  setTimeout(() => {
    setShowModal(false);
    navigate("/");
  }, 3000);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center">
          <div className="modal-body p-5">
            <div
              className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-3"
              style={{
                width: "70px",
                height: "70px",
                fontSize: "35px",
              }}
            >
              ✓
            </div>

            <h3 className="fw-bold">Registration Successful!</h3>

            <p className="text-muted">
              Your account has been successfully created.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
