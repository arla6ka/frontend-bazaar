'use client'
import * as React from "react";
import './globals.css';
import './main.css';
import CustomCursor from './CustomCursor';

type ProductCardProps = {
  imageSrc: string;
  title: string;
  rating: number;
  price: string;
  source: string;
  link: string; // Добавьте link в ProductCardProps
};

const marketplaceLogos: { [key: string]: string } = {
  Kaspi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtf2w9aVENJQLyKNzBPhvhrwi0OJeYPxEeKw&s",
  Wildberries: "https://habrastorage.org/getpro/moikrug/uploads/company/100/004/679/1/logo/big_52d6473a9db6fc51ff16b12c9c83e8bb.jpg",
  Alfa: "https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/eqwvnydrxvng2vgzecn6",
};

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, rating, price, source, link }) => (
  <article className="flex flex-col pt-3 bg-gray-800 bg-opacity-20 rounded-md shadow h-[250px] w-[200px] hover:scale-105 transition-transform duration-300">
    <img loading="lazy" src={imageSrc} alt={title} className="self-center max-w-full aspect-[1.59] w-[150px] h-[150px] object-contain" />
    <div className="flex flex-col px-2.5 pt-0.5 pb-2.5 mt-3">
      <h3 className="text-xs font-semibold leading-3 text-white">{title}</h3>
      <div className="flex gap-1.5 mt-1.5">
        <div className="flex gap-px pr-16">
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              loading="lazy"
              src={`http://b.io/ext_${index + 6}-`}
              alt=""
              className="shrink-0 aspect-square w-[9px]"
            />
          ))}
        </div>

      </div>
      <div className="flex gap-1.5 mt-2.5 text-white">
        <span className="flex-1 text-xs font-bold">{price}</span>
        <a href={link} target="_blank" rel="noopener noreferrer" className="justify-center px-1.5 py-1 text-xs font-medium leading-loose bg-blue-700 rounded-md">
          Перейти на товар
        </a>
      </div>
      <div className="flex items-center mt-2">
        <img src={marketplaceLogos[source] || ''} alt={source} className="w-6 h-6 rounded-full mr-1" />
        <span className="text-xs text-white">{source}</span>
      </div>
    </div>
  </article>
);

const suggestions = [
  "Красные кроссовки",
  "Клавиатура HyperX",
  "Зарядка TypeC",
];

const MyComponent = ({ onSuggestionClick }: { onSuggestionClick: (suggestion: string) => void }) => (
  <div className="flex justify-center gap-2 mt-2 text-xs leading-5 text-neutral-200 w-full">
    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        onClick={() => onSuggestionClick(suggestion)}
        className="flex items-center justify-center px-[18px] py-2 bg-gray-800 bg-opacity-90 rounded-lg border border-[#1F2A37] text-center text-white cursor-pointer suggestion-card"
      >
        {suggestion}
      </div>
    ))}
  </div>
);

export default function Home() {
  const [products, setProducts] = React.useState<ProductCardProps[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSearch = (query: string) => {
    setLoading(true);
    fetch('http://localhost:5000/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data: ProductCardProps[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  return (
    <div className="flex overflow-hidden relative flex-col justify-center py-10 w-full">
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
        <header className="flex items-center gap-3 text-xl text-[#E0E0E0] font-unbounded self-start ml-8 ">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6e4d6bb0b642b484f620ad2debafe66b16dc6cc1c4ae39a69632db642b89943?apiKey=5ea96845361b4ac1907671ae2430d85d&" alt="bazaar.ai" className="w-9" />
          <h1 className="font-normal">bazaar.ai</h1>
        </header>
        <h2 className="mt-10 text-4xl font-normal text-[#E0E0E0] text-center font-unbounded">Находите лучшее,<br/>выбирайте умнее.</h2>
        <p className="mt-6 text-m text-center text-[#E0E0E0] max-w-md font-unbounded">Добро пожаловать в Bazaar!<br/>Ваш AI помощник для поиска<br/>лучших товаров и услуг.</p>
        <form
          className="flex mt-10 w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery) {
              handleSearch(searchQuery);
            }
          }}
        >
          <input
            type="text"
            className="flex-grow text-white px-4 py-2 text-sm bg-[#1F2A37] bg-opacity-50 rounded-lg mr-2 placeholder-[#E0E0E0]"
            placeholder="Введите желаемый товар или услугу"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="flex justify-center items-center p-2 bg-gray-800 bg-opacity-50 rounded-lg h-[37px] w-[37px]"
          >
            <img
              loading="lazy"
              src="https://img.icons8.com/?size=100&id=132&format=png&color=E0E0E0"
              className="w-5 aspect-square"
            />
          </button>
        </form>
        <MyComponent onSuggestionClick={setSearchQuery} />
        <nav className="flex mt-10 gap-5 text-sm text-[#E0E0E0] font-onest">
          <a  className="focus:underline focus:text-[#0FFFD4] flex items-center">
            Marketplaces:
          </a>
          {Object.entries(marketplaceLogos).map(([key, logo]) => (
            <a key={key}  className="focus:underline focus:text-[#0FFFD4] flex items-center">
              <img src={logo} alt={key} className="w-6 h-6 rounded-[7px] mr-[6px]" /> {key}
            </a>
          ))}
        </nav>

        <main className="flex flex-wrap justify-center gap-4 mt-8">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))
          ) : (
            <p className="text-white">No products found.</p>
          )}
        </main>
      </div>
      <CustomCursor />
    </div>
  );
}
