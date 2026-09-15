import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../assets/photo.avif";
import { AdminPinAuth } from "../function/AdminPinAuth";

export default function AdminPin() {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `linear-gradient(rgba(45,27,15,.75), rgba(45,27,15,.75)), url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{ maxWidth: "420px", width: "100%", borderRadius: "20px" }}
      >
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <div style={{ fontSize: "55px" }}>🛡️</div>
            <h2 className="fw-bold" style={{ color: "#6F4E37" }}>
              Admin PIN
            </h2>
            <p className="text-muted mb-0">Enter your 4-digit security PIN</p>
          </div>

          <form
            onSubmit={(e) =>
              AdminPinAuth({ e, pin, setPin, setMessage, setLoading, navigate })
            }
          >
            <div className="mb-3">
              <label className="form-label fw-semibold">4-Digit PIN</label>

              <input
                type="password"
                className="form-control form-control-lg text-center"
                placeholder="••••"
                maxLength="4"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                style={{ letterSpacing: "12px", fontSize: "28px" }}
                required
              />
            </div>

            {message && <div className="alert alert-danger">{message}</div>}

            <button
              type="submit"
              className="btn btn-lg w-100 text-white fw-bold mb-2"
              style={{ background: "#6F4E37" }}
              disabled={loading}
            >
              {loading ? "Verifying..." : "🔓 Sign In"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              onClick={() => navigate("/")}
            >
              ← Back to Login
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Dear Coffee Administrator Access
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
