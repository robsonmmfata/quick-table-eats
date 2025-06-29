
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import { ProductModal } from "@/components/ProductModal";

export const ProductsManager = () => {
  const [showProductModal, setShowProductModal] = useState(false);

  const products = [
    {
      id: 1,
      name: "Hambúrguer Clássico",
      category: "Lanches",
      price: "R$ 24,90",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop",
      description: "Pão brioche, hambúrguer 180g, queijo, alface, tomate",
      status: "ativo",
    },
    {
      id: 2,
      name: "Batata Frita",
      category: "Acompanhamentos",
      price: "R$ 12,90",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop",
      description: "Porção individual de batata frita crocante",
      status: "ativo",
    },
    {
      id: 3,
      name: "Coca-Cola Lata",
      category: "Bebidas",
      price: "R$ 6,90",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop",
      description: "Coca-Cola lata 350ml gelada",
      status: "ativo",
    },
    {
      id: 4,
      name: "Pizza Margherita",
      category: "Pizzas",
      price: "R$ 38,90",
      image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=300&h=200&fit=crop",
      description: "Molho de tomate, mussarela, manjericão fresco",
      status: "inativo",
    },
  ];

  const categories = ["Todos", "Lanches", "Acompanhamentos", "Bebidas", "Pizzas"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
          <p className="text-gray-600">Cadastre e organize os produtos do seu cardápio</p>
        </div>
        <Button onClick={() => setShowProductModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video rounded-t-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <Badge 
                  className={product.status === "ativo" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                  }
                >
                  {product.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">
                  {product.price}
                </span>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
      />
    </div>
  );
};
