import ProductCard from "./ProductCard";

export default function ProductList({ products, onAdd }) {
  return (
    <div className="row g-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAdd={onAdd} />
      ))}
    </div>
  );
}
