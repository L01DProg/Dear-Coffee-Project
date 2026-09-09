import { useState } from "react";
import BackgroundImage from "../assets/photo.avif";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const authentication = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Incorrect credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      let roles = role;
      setUsername("");
      setPassword("");
      setRole("");

      if (roles === "Cashier") {
        navigate("/kitchen");
      }
    } catch (err) {
      console.error(err);
      setMessage("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-0"
      style={{
        backgroundColor: "#f8f3ed",
      }}
    >
      <div className="row w-100 min-vh-100 g-0">
        <div
          className="col-lg-5 d-none d-lg-flex text-white position-relative overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(45,27,15,.80),
                rgba(45,27,15,.80)
              ),
              url(${BackgroundImage})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center w-100 p-4">
            <div className="fs-1 mb-2">☕</div>

            <h1
              className="fw-bold mb-1 text-center"
              style={{
                letterSpacing: "6px",
              }}
            >
              DEAR COFFEE
            </h1>

            <div
              className="fw-semibold text-center"
              style={{
                letterSpacing: "6px",
              }}
            >
              COFFEE & MORE
            </div>

            <div
              className="my-4"
              style={{
                width: "70px",
                height: "3px",
                backgroundColor: "#d29b5b",
              }}
            />

            <p
              className="text-center fs-5 mb-0"
              style={{
                lineHeight: "1.6",
                color: "#f5e9dc",
              }}
            >
              Manage your coffee shop
              <br />
              with ease.
            </p>
          </div>
        </div>

        <div
          className="
            col-12
            col-lg-7
            d-flex
            flex-column
            justify-content-center
            align-items-center
            px-3
            px-sm-4
            px-md-5
            py-4
            py-lg-5
          "
        >
          <div className="d-lg-none text-center mb-4">
            <div
              className="mb-1"
              style={{
                fontSize: "35px",
              }}
            >
              ☕
            </div>

            <h1
              className="fw-bold mb-1"
              style={{
                color: "#332217",
                letterSpacing: "4px",
                fontSize: "24px",
              }}
            >
              DEAR COFFEE
            </h1>

            <div
              className="fw-semibold"
              style={{
                color: "#7b451f",
                letterSpacing: "3px",
                fontSize: "10px",
              }}
            >
              COFFEE & MORE
            </div>
          </div>

          <div
            className="card border-0 shadow-lg w-100"
            style={{
              maxWidth: "620px",
              borderRadius: "25px",
            }}
          >
            <div
              className="
                card-body
                p-3
                p-sm-4
                p-md-5
              "
            >
              <div
                className="
                  rounded-circle
                  d-flex
                  align-items-center
                  justify-content-center
                  mx-auto
                  mb-3
                  mb-md-4
                "
                style={{
                  width: "75px",
                  height: "75px",
                  backgroundColor: "#f3e7da",
                  fontSize: "28px",
                }}
              >
                🔒
              </div>

              <h2
                className="
                  text-center
                  fw-bold
                  mb-1
                "
                style={{
                  color: "#332217",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                }}
              >
                Welcome Back!
              </h2>

              <p className="text-center text-secondary mb-4">
                Sign in to your admin account
              </p>

              <form onSubmit={authentication}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Username</label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">👤</span>

                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">🔒</span>

                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
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
                  <label className="form-label fw-semibold">Role</label>

                  <div className="input-group">
                    <span className="input-group-text bg-white">🛡️</span>

                    <select
                      className="form-select form-select-lg"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="">Position</option>
                      <option value="Admin">Administrator</option>

                      <option value="Cashier">Cashier</option>
                    </select>
                  </div>
                </div>

                <div
                  className="
                    d-flex
                    flex-column
                    flex-sm-row
                    justify-content-between
                    align-items-start
                    align-items-sm-center
                    gap-2
                    mb-4
                  "
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember"
                    />

                    <label
                      className="form-check-label text-secondary"
                      htmlFor="remember"
                    >
                      Remember me
                    </label>
                  </div>

                  <button
                    type="button"
                    className="
                      btn
                      btn-link
                      text-decoration-none
                      p-0
                    "
                    style={{
                      color: "#7b451f",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                {message && (
                  <div className="alert alert-danger">⚠️ {message}</div>
                )}

                <button
                  type="submit"
                  className="
                    btn
                    btn-lg
                    w-100
                    text-white
                    fw-semibold
                    mb-2
                  "
                  disabled={loading}
                  style={{
                    backgroundColor: "#7b451f",
                    borderColor: "#7b451f",
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="
                          spinner-border
                          spinner-border-sm
                          
                        "
                        role="status"
                      ></span>
                      Signing in...
                    </>
                  ) : (
                    <>→ &nbsp; Sign In</>
                  )}
                </button>
              </form>

              <div
                className="
                  d-flex
                  align-items-center
                  gap-3
                  my-4
                "
              >
                <hr className="flex-grow-1" />

                <span className="text-secondary small">OR</span>

                <hr className="flex-grow-1" />
              </div>

              <button
                type="button"
                className="
                  btn
                  btn-outline-secondary
                  btn-lg
                  w-100
                "
                style={{
                  color: "#75421f",
                  borderColor: "#d7c8ba",
                }}
              >
                🛡️ &nbsp; Sign in with Admin PIN
              </button>

              <div
                className="
                  text-center
                  text-secondary
                  small
                  mt-4
                "
              >
                🛡️ &nbsp; Secure access for Dear Coffee administrators only
              </div>
            </div>
          </div>

          <div
            className="
              text-secondary
              small
              mt-3
              mt-md-4
              text-center
            "
          >
            © 2026 Dear Coffee & More.
            <span className="d-none d-sm-inline"> All rights reserved.</span>
            <span className="d-sm-none d-block">All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
