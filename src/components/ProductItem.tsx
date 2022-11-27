import { memo, useState, lazy, Suspense } from "react";

const AddProductToWishlist = lazy(() => {
  return import("./AddProductToWishlist");
});

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>${product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Add to favorites
      </button>
      {isAddingToWishlist && (
        <Suspense fallback={<span>Loading...</span>}>
          <AddProductToWishlist
            onAddToWishlist={() => onAddToWishlist(product.id)}
            onRequestClose={() => setIsAddingToWishlist(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
