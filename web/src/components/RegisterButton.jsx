export default function RegisterButton(navigate) {
  <button
    type="button"
    className="btn btn-outline-secondary btn-lg w-100 fw-semibold"
    onClick={() => navigate("/register")}
  >
    📝 &nbsp; Register
  </button>;
}
