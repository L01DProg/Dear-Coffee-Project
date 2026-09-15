export const AddProductFunction = async ({
  e,
  productName,
  category,
  image,
  sizes,
  setLoading,
  setMessage,
  resetForm,
  onClose,
}) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");

  try {
    const formData = new FormData();

    formData.append("name", productName);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    sizes.forEach((item, index) => {
      formData.append(`sizes[${index}][size]`, item.size);
      formData.append(`sizes[${index}][price]`, item.price);
      formData.append(`sizes[${index}][stock]`, item.stock);
    });

    const response = await fetch("http://127.0.0.1:8000/api/product/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Failed to add product");
      return;
    }

    setMessage(data.message);
    resetForm();
    onClose();
  } catch (error) {
    console.log(error);
    setMessage("Unable to connect to server.");
  } finally {
    setLoading(false);
  }
};
