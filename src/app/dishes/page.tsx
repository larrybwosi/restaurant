'use client';
import { useState } from 'react';
import { StarIcon, ShoppingCartIcon, PlusCircleIcon, MinusCircleIcon, HeartIcon } from 'lucide-react';
import { useCart } from '@/lib/context/store';

interface DishType {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    image: string;
    category: string;
    dietary: string[];
}

const DishesPage = () => {
  const dishes = [
    {
      id: '1',
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon fillet, grilled to perfection with lemon herb butter, served with seasonal vegetables and wild rice.",
      price: 24.99,
      rating: 4.8,
      image: "/api/placeholder/400/300",
      category: "Main Course",
      dietary: ["Gluten-Free", "High Protein"]
    },
    {
      id: '2',
      name: "Truffle Mushroom Risotto",
      description: "Creamy Arborio rice slow-cooked with wild mushrooms, finished with black truffle oil and aged Parmesan cheese.",
      price: 19.95,
      rating: 4.6,
      image: "/api/placeholder/400/300",
      category: "Main Course",
      dietary: ["Vegetarian"]
    },
    {
      id: '3',
      name: "Wagyu Beef Burger",
      description: "Premium Wagyu beef patty on a brioche bun with caramelized onions, aged cheddar, truffle aioli, and house pickles.",
      price: 22.50,
      rating: 4.9,
      image: "/api/placeholder/400/300",
      category: "Main Course",
      dietary: []
    },
    {
      id: '4',
      name: "Mediterranean Mezze Platter",
      description: "Selection of hummus, baba ganoush, tabbouleh, falafel, olives, and warm pita bread.",
      price: 16.95,
      rating: 4.7,
      image: "/api/placeholder/400/300",
      category: "Appetizer",
      dietary: ["Vegetarian", "Vegan options available"]
    },
    {
      id: '5',
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten center, served with vanilla bean ice cream and fresh berries.",
      price: 10.95,
      rating: 4.9,
      image: "/api/placeholder/400/300",
      category: "Dessert",
      dietary: ["Vegetarian"]
    },
    {
      id: '6',
      name: "Thai Green Curry",
      description: "Aromatic green curry with bamboo shoots, bell peppers, and your choice of chicken or tofu, served with jasmine rice.",
      price: 18.50,
      rating: 4.5,
      image: "/api/placeholder/400/300",
      category: "Main Course",
      dietary: ["Gluten-Free", "Vegan options available"]
    }
  ];
  const { addItem , items } = useCart()
  console.log('items:', items);

  const addToCart = (dish: DishType) => {
    // if (isInCart(dish.id)) {
    //   return;
    // }
    console.log('Adding to cart:', dish);
    addItem({ id: dish.id, name: dish.name, price: dish.price, quantity: 1 });
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill={i < Math.floor(rating) ? 'currentColor' : 'none'} 
      />
    ));
  };

  const CategoryFilter = ({ category, isActive, onClick }: {category: string, isActive: boolean, onClick: () => void}) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
        ${isActive 
          ? 'bg-indigo-600 text-white' 
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
        }`
      }
    >
      {category}
    </button>
  );

  const DishCard = ({ dish }: {dish: DishType}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    
    return (
      <div 
        className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={dish.image} 
            alt={dish.name} 
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          <button 
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600'
            } transition-colors duration-200`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <HeartIcon 
              className="w-5 h-5" 
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center space-x-1">
              {renderStars(dish.rating)}
              <span className="text-white text-sm ml-1">{dish.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-800">{dish.name}</h3>
            <span className="font-bold text-indigo-600">${dish.price.toFixed(2)}</span>
          </div>
          
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">{dish.description}</p>
          
          {dish.dietary.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {dish.dietary.map((item, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded-full">
                  {item}
                </span>
              ))}
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-xs text-gray-500 italic">{dish.category}</span>
            <button 
              onClick={() => addToCart(dish)}
              className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition-colors duration-200"
            >
              <ShoppingCartIcon className="w-4 h-4" />
              <span className="text-sm">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with cart summary */}
      <header className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Our Menu</h1>
          <div className="flex items-center space-x-2">
            <button className="relative p-2">
              <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Category filter */}
        <div className="flex overflow-x-auto pb-4 hide-scrollbar space-x-2 mb-8">
          <CategoryFilter category="All" isActive={true} onClick={() => {}}/>
          <CategoryFilter category="Main Course" isActive={false} onClick={() => {}} />
          <CategoryFilter category="Appetizer" isActive={false} onClick={() => {}} />
          <CategoryFilter category="Dessert" isActive={false} onClick={() => {}} />
          <CategoryFilter category="Beverages" isActive={false} onClick={() => {}} />
        </div>
        
        {/* Dishes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dishes.map(dish => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </main>
      
      {/* Apply some global styles */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default DishesPage;