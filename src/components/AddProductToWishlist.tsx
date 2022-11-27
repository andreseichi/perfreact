interface AddProductToWishlistProps {
  onAddToWishlist: () => void;
  onRequestClose: () => void;
}

export default function AddProductToWishlist({
  onAddToWishlist,
  onRequestClose,
}: AddProductToWishlistProps) {
  return (
    <span>
      Add to Wishlist?
      <button onClick={onAddToWishlist}>Yes</button>
      <button onClick={onRequestClose}>No</button>
    </span>
  );
}
