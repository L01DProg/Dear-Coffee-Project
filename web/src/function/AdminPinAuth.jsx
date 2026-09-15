export const AdminPinAuth = async ({
  e,
  pin,
  setPin,
  setMessage,
  setLoading,
  navigate,
}) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  try {
    const response = await fetch("http://127.0.0.1:8000/api/v1/admin-pin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        pin_number: pin,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Incorrect PIN");
      return;
    }

    localStorage.setItem("token", data.token);

    console.log("Admin token saved:", data.token);

    setPin("");
    navigate("/Admin");
  } catch (error) {
    console.error(error);
    setMessage("Unable to connect to server.");
  } finally {
    setLoading(false);
  }
};
