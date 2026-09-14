export const AuthRegister = async (
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
) => {
  e.preventDefault();

  setMessage("");

  if (password !== confirmPassword) {
    setMessage("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Registration failed.");
      return;
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    setShowModal(true);
  } catch (err) {
    console.error(err);
    setMessage("Unable to connect to server.");
  } finally {
    setLoading(false);
  }
};
