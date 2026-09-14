export const authentication = async (
  e,
  username,
  password,
  role,
  setMessage,
  setLoading,
  setUsername,
  setPassword,
  setRole,
  navigate
) => {
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

    const roles = role;

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