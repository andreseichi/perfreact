import { FormEvent, useState } from "react";
import { SearchResults } from "./components/SearchResults";

type Results = {
  totalPrice: number;
  data: Array<DataFormatted>;
};

type Data = {
  id: number;
  price: number;
  title: string;
};

interface DataFormatted extends Data {
  priceFormatted: string;
}

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({ totalPrice: 0, data: [] });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data: Data[] = await response.json();

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    const products = data.map((product: any) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

  function handleAddToWishlist(id: number) {
    console.log(id);
  }

  return (
    <div className="App">
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishList={handleAddToWishlist}
      />
    </div>
  );
}

export default App;
