import { FixedSizeList as List } from "react-window";

import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  onAddToWishList: (id: number) => void;
}

export function SearchResults({
  totalPrice,
  results,
  onAddToWishList,
}: SearchResultsProps) {
  const rowRenderer = ({ index, style }: { index: number; style: any }) => {
    return (
      <div key={results[index].id} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>Total Price: ${totalPrice}</h2>

      <List height={300} width={900} itemCount={results.length} itemSize={30}>
        {rowRenderer}
      </List>
    </div>
  );
}
