export default function CategoryFilter({ categories, category, setCategory }) {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-2">
      {categories.map((item) => (
        <button
          key={item}
          className="btn px-4"
          onClick={() => setCategory(item)}
          style={{
            backgroundColor: category === item ? "#7b451f" : "white",
            color: category === item ? "white" : "#7b451f",
            border: "1px solid #7b451f",
            borderRadius: "20px",
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
