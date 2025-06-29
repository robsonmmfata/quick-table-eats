
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CartDrawer } from '@/components/CartDrawer';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Search, 
  MapPin, 
  Clock, 
  Phone,
  Star,
  Users
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Menu = () => {
  const { restaurantSlug, tableId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);

  // Mock data - em produção viria da API
  const restaurant = {
    name: 'Burger House',
    description: 'Os melhores hambúrgueres da cidade',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 99999-9999',
    rating: 4.8,
    deliveryTime: '30-45 min',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop'
  };

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Hambúrguer Clássico',
      description: 'Pão brioche, hambúrguer 180g, queijo, alface, tomate, molho especial',
      price: 24.90,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop',
      category: 'Lanches'
    },
    {
      id: 2,
      name: 'Hambúrguer Bacon',
      description: 'Pão brioche, hambúrguer 180g, queijo, bacon crocante, alface, tomate',
      price: 28.90,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
      category: 'Lanches'
    },
    {
      id: 3,
      name: 'Batata Frita',
      description: 'Porção de batata frita crocante temperada',
      price: 12.90,
      image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=200&fit=crop',
      category: 'Acompanhamentos'
    },
    {
      id: 4,
      name: 'Coca-Cola',
      description: 'Refrigerante Coca-Cola 350ml gelado',
      price: 6.90,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop',
      category: 'Bebidas'
    },
    {
      id: 5,
      name: 'Pizza Margherita',
      description: 'Molho de tomate, mussarela, manjericão fresco, azeite',
      price: 38.90,
      image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de6a2?w=300&h=200&fit=crop',
      category: 'Pizzas'
    }
  ];

  const categories = ['Todos', 'Lanches', 'Acompanhamentos', 'Bebidas', 'Pizzas'];

  useEffect(() => {
    // Simular carregamento dos produtos
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const getItemQuantity = (productId: number) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header do Restaurante */}
      <div className="bg-white shadow-sm">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-2xl font-bold">{restaurant.name}</h1>
            <p className="text-sm opacity-90">{restaurant.description}</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{restaurant.phone}</span>
              </div>
            </div>
            
            {tableId && (
              <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                <Users className="h-4 w-4" />
                <span>Mesa {tableId}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Busca e Filtros */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {filteredProducts.map((product) => {
            const quantity = getItemQuantity(product.id);
            
            return (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{product.name}</h3>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-green-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        {quantity > 0 ? (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromCart(product.id)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addToCart(product)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addToCart(product)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Adicionar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Botão do Carrinho */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 z-50">
            <Button
              onClick={() => setCartOpen(true)}
              className="w-full h-14 text-lg shadow-lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Ver Carrinho ({getTotalItems()}) - R$ {getTotalPrice().toFixed(2)}
            </Button>
          </div>
        )}

        {/* Drawer do Carrinho */}
        <CartDrawer
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          onUpdateQuantity={(productId, quantity) => {
            if (quantity === 0) {
              setCart(cart.filter(item => item.id !== productId));
            } else {
              setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity } : item
              ));
            }
          }}
          tableNumber={tableId ? parseInt(tableId) : undefined}
          restaurant={restaurant}
        />
      </div>
    </div>
  );
};

export default Menu;
