'use client'
import * as React from "react";
import './globals.css';
import './main.css';
import CustomCursor from './CustomCursor';
import LoadingAnimation from './LoadingAnimation';

type ProductCardProps = {
  imageSrc: string;
  title: string;
  rating: number;
  price: string;
  source: string;
  link: string;
};

const marketplaceLogos: { [key: string]: string } = {
  Kaspi: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtf2w9aVENJQLyKNzBPhvhrwi0OJeYPxEeKw&s",
  Wildberries: "https://habrastorage.org/getpro/moikrug/uploads/company/100/004/679/1/logo/big_52d6473a9db6fc51ff16b12c9c83e8bb.jpg",
  Alfa: "https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/eqwvnydrxvng2vgzecn6",
};

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, rating, price, source, link }) => (
  <article className="flex flex-col justify-between pt-3 bg-white bg-opacity-100 rounded-md shadow h-[300px] w-[200px] ">
    <div className="flex justify-between items-center px-2">
      <img src={marketplaceLogos[source] || ''} alt={source} className="w-6 h-6 rounded-full" />
      <button className="text-gray-600 hover:text-gray-800">
        <img src="https://img.icons8.com/?size=100&id=83213&format=png&color=000000" alt="Share" className="w-4 h-4" />
      </button>
    </div>
    <img loading="lazy" src={imageSrc} alt={title} className="self-center max-w-full aspect-[1.59] w-[150px] h-[150px] object-contain mt-3 mb-2" />
    <div className="flex flex-col px-2.5 pt-0.5 pb-2.5">
      <h3 className="text-xs mt-4 font-semibold leading-3 text-[#0B101B]" style={{ height: '40px' }}>{title}</h3>
      <span className="text-sm font-bold text-[#0B101B] mt-1">{price}</span>
      <div className="flex gap-1.5 mt-2.5 text-[#0B101B]">
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-white justify-center px-1.5 py-1 text-xs leading-loose bg-gray-800 bg-opacity-90 rounded-md w-full text-center">
          Перейти на товар
        </a>
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
  <div className="flex justify-center gap-2 mt-2 text-xs leading-5 text-neutral-200 w-full ">
    {suggestions.map((suggestion, index) => (
      <div
        key={index}
        onClick={() => onSuggestionClick(suggestion)}
        className="flex items-center justify-center px-[18px] py-2 bg-white bg-opacity-50 rounded-lg border text-center text-gray-800 cursor-pointer suggestion-card hover:scale-105 transition-transform duration-300"
      >
        {suggestion}
      </div>
    ))}
  </div>
);

const FilterComponent = ({ currentFilter, onFilterChange }: { currentFilter: string, onFilterChange: (filter: string) => void }) => (
  <div className="flex justify-center gap-5 mt-4 text-sm text-[#0B101B] font-onest">
    <button
      onClick={() => onFilterChange('')}
      className={`flex items-center ${currentFilter === '' ? ' underline' : ''}`}
    >
      All Marketplaces
    </button>
    {Object.entries(marketplaceLogos).map(([key, logo]) => (
      <button
        key={key}
        onClick={() => onFilterChange(key)}
        className={`flex items-center ${currentFilter === key ? ' underline' : ''}`}
      >
        <img src={logo} alt={key} className="w-6 h-6 rounded-[90px] mr-[6px]" /> {key}
      </button>
    ))}
  </div>
);

export default function Home() {
  const [products, setProducts] = React.useState<ProductCardProps[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleSearch = (query: string, marketplace?: string) => {
    setLoading(true);
    fetch('http://localhost:5000/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, marketplace }),
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

  React.useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, filter);
    }
  }, [filter]);

  return (
    <div className="flex overflow-hidden relative flex-col justify-center py-10 w-full">
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
        <header className="flex items-center gap-3 text-2xl text-[#0B101B] font-unbounded self-start ml-8 ">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6e4d6bb0b642b484f620ad2debafe66b16dc6cc1c4ae39a69632db642b89943?apiKey=5ea96845361b4ac1907671ae2430d85d&" alt="bazaar.ai" className="w-11" />
          <h1 className="font-normal">bazaar.ai</h1>
        </header>
        <h2 className="mt-[60px] text-4xl font-normal text-[#0B101B] text-center font-unbounded">Находите лучшее,<br/>выбирайте умнее.</h2>
        <p className="mt-6 text-m text-center text-[#0B101B] max-w-md font-unbounded">Добро пожаловать в Bazaar!<br/>Ваш ИИ помощник для<br/>поиска лучших товаров.</p>
        <form
          className="flex mt-[40px] w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery) {
              handleSearch(searchQuery, filter);
            }
          }}
        >
          <input
            type="text"
            className="flex-grow border text-gray-800 px-4 py-2 text-sm bg-white bg-opacity-50 rounded-lg mr-2 placeholder-gray-800"
            placeholder="Введите желаемый товар или услугу"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="flex border justify-center items-center p-2 bg-white bg-opacity-50 rounded-lg h-[37px] w-[37px]"
          >
            <img
              loading="lazy"
              src="https://img.icons8.com/?size=100&id=132&format=png&color=1E1F24"
              className="w-5 aspect-square"
            />
          </button>
        </form>
        <MyComponent onSuggestionClick={setSearchQuery} />
        <FilterComponent currentFilter={filter} onFilterChange={setFilter} />
        <p className="mt-10 text-lg text-center text-[#0B101B] font-unbounded">Лучшие предложения от ИИ</p>
        <div className="flex justify-center mt-2">
          <img src="https://img.icons8.com/ios-filled/50/000000/down--v1.png" alt="down arrow" className="w-5 h-5 animate-bounce" />
        </div>
        <main className="flex flex-wrap justify-center gap-4 mt-10">
          {loading ? (
            <LoadingAnimation />
          ) : Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))
          ) : (
            <p className="text-[#0B101B] font-unbounded"></p>
          )}
        </main>
      </div>
      <CustomCursor />
    </div>
  );
}
