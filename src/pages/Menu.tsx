
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";

const Menu = () => {
  const { tableId } = useParams();
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    {
      id: 1,
      name: "Hambúrguer Clássico",
      category: "Lanches",
      price: 24.90,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Pão brioche, hambúrguer 180g, queijo, alface, tomate",
    },
    {
      id: 2,
      name: "Batata Frita",
      category: "Acompanhamentos",
      price: 12.90,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
      description: "Porção individual de batata frita crocante",
    },
    {
      id: 3,
      name: "Coca-Cola Lata",
      category: "Bebidas",
      price: 6.90,
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      description: "Coca-Cola lata 350ml gelada",
    },
    {
      id: 4,
      name: "Pizza Margherita",
      category: "Pizzas",
      price: 38.90,
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400&h=300&fit=crop",
      description: "Molho de tomate, mussarela, manjericão fresco",
    },
  ];

  const categories = ["Todos", "Lanches", "Acompanhamentos", "Bebidas", "Pizzas"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Restaurante Demo</h1>
              <p className="text-sm text-gray-600">Mesa {tableId}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              Cardápio Digital
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo!</h2>
          <p>Faça seu pedido diretamente pelo cardápio digital. Seus itens serão enviados diretamente para a cozinha.</p>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:flex">
                <div className="md:w-32 md:h-32 h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="flex-1 p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold text-green-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <Button
                        onClick={() => addToCart(product)}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Adicionar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <Button
            onClick={() => setShowCart(true)}
            className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Ver Carrinho ({getCartItemsCount()}) - R$ {getCartTotal().toFixed(2)}
          </Button>
        </div>
      )}

      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        setCart={setCart}
        tableId={tableId}
      />
    </div>
  );
};

export default Menu;
