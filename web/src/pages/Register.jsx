import { useState } from "react";
import BackgroundImage from "../assets/photo.avif";
import { useNavigate } from "react-router-dom";
import { AuthRegister } from "../function/AuthRegister";
import SuccessfulModal from "../components/SuccessfulModal";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-0"
      style={{ backgroundColor: "#f8f3ed" }}
    >
      <div className="row w-100 min-vh-100 g-0">
        <div
          className="col-lg-5 d-none d-lg-flex text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(45,27,15,.80),rgba(45,27,15,.80)),url(${BackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center w-100 p-4">
            <div className="fs-1 mb-2">☕</div>
            <h1 className="fw-bold" style={{ letterSpacing: "6px" }}>
              DEAR COFFEE
            </h1>
            <p className="text-center fs-5 mt-4">
              Create a new administrator or cashier account.
            </p>
          </div>
        </div>

        <div className="col-12 col-lg-7 d-flex justify-content-center align-items-center p-4">
          <div
            className="card border-0 shadow-lg w-100"
            style={{ maxWidth: "650px", borderRadius: "25px" }}
          >
            <div className="card-body p-4 p-md-5">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{
                  width: 80,
                  height: 80,
                  background: "#f3e7da",
                  fontSize: 32,
                }}
              >
                📝
              </div>

              <h2 className="text-center fw-bold" style={{ color: "#332217" }}>
                Create Account
              </h2>

              <p className="text-center text-secondary mb-4">
                Register a new staff account
              </p>

              <form
                onSubmit={(e) =>
                  AuthRegister(
                    e,
                    username,
                    email,
                    password,
                    confirmPassword,
                    showModal,
                    setMessage,
                    setLoading,
                    navigate,
                    setUsername,
                    setEmail,
                    setPassword,
                    setConfirmPassword,
                    setShowModal
                  )
                }
              >
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg"
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {message && <div className="alert alert-danger">{message}</div>}

                <button
                  type="submit"
                  className="btn btn-lg w-100 text-white fw-semibold mb-3"
                  disabled={loading}
                  style={{
                    backgroundColor: "#7b451f",
                    borderColor: "#7b451f",
                  }}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg w-100"
                  onClick={() => navigate("/")}
                >
                  ← Back to Login
                </button>
              </form>

              <div className="text-center text-secondary small mt-4">
                © 2026 Dear Coffee & More
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessfulModal
        showModal={showModal}
        setShowModal={setShowModal}
        navigate={navigate}
      />
    </div>
  );
}
