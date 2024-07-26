'use client'
import * as React from "react";
import './globals.css';
import './main.css';
import CustomCursor from './CustomCursor';
import LoadingAnimation from './LoadingAnimation';
import { AnimatedBeamMultipleOutputDemo } from "./MarketplaceLogos";
import WordPullUp from "@/components/magicui/word-pull-up";
import TypingAnimation from "@/components/magicui/typing-animation";
import {Button} from "@nextui-org/react";
import { DockDemo } from "./DockDemo";
import ShimmerButton from "@/components/magicui/shimmer-button";
import { FlipWordsDemo } from "./components/MainWords";
import { OrbitingCirclesDemo } from "./components/Circles";
import { PlaceholdersAndVanishInputDemo } from "./components/PlaceHolder";
import { Analytics } from "@vercel/analytics/react";

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
  OLX: "https://seeklogo.com/images/O/olx-logo-20F1656D13-seeklogo.com.png",
};

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, rating, price, source, link }) => (
  <article className="flex flex-col justify-between pt-3 bg-white bg-opacity-100 rounded-md shadow h-[300px] w-[200px] sm:h-[350px] sm:w-[250px]">
    <div className="flex justify-between items-center px-2">
      <img src={marketplaceLogos[source] || ''} alt={source} className="w-6 h-6 rounded-full" />
      {/* <button className="text-gray-600 hover:text-gray-800">
        <img src="https://img.icons8.com/?size=100&id=83213&format=png&color=000000" alt="Share" className="w-4 h-4" />
      </button> */}
    </div>
    <img loading="lazy" src={imageSrc} alt={title} className="self-center max-w-full aspect-[1.59] w-[150px] h-[150px] object-contain mt-3 mb-2 sm:w-[200px] sm:h-[200px]" />
    <div className="flex flex-col px-2.5 pt-0.5 pb-2.5">
      <h3 className="text-xs mt-4 font-semibold leading-3 text-[#0B101B] sm:text-sm" style={{ height: '40px' }}>{title}</h3>
      <span className="text-sm font-bold text-[#0B101B] mt-1 sm:text-lg">{price}</span>
      <div className="flex gap-1.5 mt-2.5 text-[#0B101B]">
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-white justify-center px-1.5 py-1 text-xs leading-loose bg-gray-800 bg-opacity-90 rounded-md w-full text-center sm:text-sm sm:px-2 sm:py-1.5">
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

const FilterComponent = ({ currentFilter, onFilterChange }: { currentFilter: string, onFilterChange: (filter: string) => void }) => (
  <div className="flex flex-wrap justify-center gap-5 mt-[-70px] text-sm text-[#0B101B] font-onest sm:mt-[-50px] sm:text-base">
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
        <img src={logo} alt={key} className="w-6 h-6 rounded-[90px] mr-[6px] sm:w-8 sm:h-8 sm:mr-[8px]" /> {key}
      </button>
    ))}
  </div>
);

const Home: React.FC = () => {
  const [products, setProducts] = React.useState<ProductCardProps[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filter, setFilter] = React.useState("");

  const handleSearch = (query: string, marketplace?: string) => {
    setLoading(true);
  
    const fetchData = () => {
      fetch('https://backend-bazaar-63c016fe5404.herokuapp.com/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, marketplace }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: ProductCardProps[]) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setLoading(false);
          setTimeout(fetchData, 180000); // Попробовать снова через 10 секунд
        });
    };
  
    fetchData(); // Изначальный запрос
  };
  

  React.useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, filter);
    }
  }, [filter]);

  return (
    <div className="flex overflow-hidden relative flex-col justify-center py-10 w-full">
      <header className="flex items-center gap-3 text-2xl text-[#0B101B] font-unbounded self-start ml-[40px] sm:ml-[40px] sm:text-xl">
        <img loading="lazy" src="/black.png" alt="" className="w-11 sm:w-9" />
        <DockDemo/>
      </header>
      
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-2">
        
        <FlipWordsDemo/>
        <p className="mt-0 md:mt-4 scale-[0.9] md:scale-[1]  text-xl md:text-xl text-center text-[#0B101B] w-[340px] md:w-[1000px] leading-[25px] font-onest sm:text-lg sm:leading-[25px]">Ваш ИИ помощник для поиска лучших товаров за 3 минуты</p>
        <OrbitingCirclesDemo/>
        <PlaceholdersAndVanishInputDemo 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSearch(searchQuery, filter);
          }}
        />
        {/* <FilterComponent currentFilter={filter} onFilterChange={setFilter} /> */}
        <main className="flex flex-wrap justify-center gap-4 mt-4">
          {loading ? (
            <LoadingAnimation />
          ) : Array.isArray(products) && products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))
          ) : (
            <p className="text-[#0B101B] font-unbounded mt-[-60px] md:mt-[-60px]"></p>
          )}
        </main>
      </div>
      <CustomCursor />
      <Analytics />
    </div>
  );
}

export default Home;
