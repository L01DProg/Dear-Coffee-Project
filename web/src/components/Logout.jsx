export default function Logout({ navigate }) {
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <button type="button" className="btn bg-dark text-white" onClick={handleLogout}>
      <i className="bi bi-box-arrow-right me-2"></i>
      Logout
    </button>
  );
}
