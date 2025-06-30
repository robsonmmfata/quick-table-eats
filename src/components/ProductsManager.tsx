
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProductModal } from './ProductModal';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  active: boolean;
  stock?: number;
  sales?: number;
}

export const ProductsManager = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['Lanches', 'Acompanhamentos', 'Bebidas', 'Pizzas', 'Sobremesas'];

  useEffect(() => {
    // Mock data
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Hambúrguer Clássico',
        description: 'Pão brioche, hambúrguer 180g, queijo, alface, tomate, molho especial',
        price: 24.90,
        image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop',
        category: 'Lanches',
        active: true,
        stock: 25,
        sales: 45
      },
      {
        id: 2,
        name: 'Hambúrguer Bacon',
        description: 'Pão brioche, hambúrguer 180g, queijo, bacon crocante, alface, tomate',
        price: 28.90,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
        category: 'Lanches',
        active: true,
        stock: 18,
        sales: 32
      },
      {
        id: 3,
        name: 'Batata Frita Grande',
        description: 'Porção generosa de batata frita crocante temperada com ervas',
        price: 12.90,
        image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=200&fit=crop',
        category: 'Acompanhamentos',
        active: true,
        stock: 50,
        sales: 78
      },
      {
        id: 4,
        name: 'Refrigerante Lata',
        description: 'Coca-Cola, Pepsi ou Guaraná - 350ml gelado',
        price: 6.90,
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=200&fit=crop',
        category: 'Bebidas',
        active: false,
        stock: 0,
        sales: 15
      },
      {
        id: 5,
        name: 'Pizza Margherita',
        description: 'Molho de tomate artesanal, mussarela de búfala, manjericão fresco',
        price: 42.90,
        image: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de6a2?w=300&h=200&fit=crop',
        category: 'Pizzas',
        active: true,
        stock: 12,
        sales: 28
      }
    ];
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && product.active) ||
                         (statusFilter === 'inactive' && !product.active);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleToggleStatus = (productId: number) => {
    setProducts(prev => prev.map(product =>
      product.id === productId ? { ...product, active: !product.active } : product
    ));
    toast({
      title: "Status alterado",
      description: "Status do produto atualizado com sucesso."
    });
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    toast({
      title: "Produto removido",
      description: "Produto removido com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
          <p className="text-gray-600">Controle seu cardápio e produtos</p>
        </div>
        <Button onClick={handleAddProduct} className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-sm text-gray-600">Total de Produtos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{products.filter(p => p.active).length}</div>
            <p className="text-sm text-gray-600">Produtos Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{products.filter(p => (p.stock || 0) < 10).length}</div>
            <p className="text-sm text-gray-600">Estoque Baixo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {products.reduce((sum, p) => sum + (p.sales || 0), 0)}
            </div>
            <p className="text-sm text-gray-600">Vendas Totais</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Categorias</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={product.active ? "default" : "secondary"}>
                  {product.active ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              {(product.stock || 0) < 10 && (
                <div className="absolute top-2 left-2">
                  <Badge variant="destructive">Estoque Baixo</Badge>
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <div className="text-sm text-gray-500">
                    Estoque: {product.stock || 0}
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  Vendas: {product.sales || 0} unidades
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(product.id)}
                  >
                    {product.active ? (
                      <EyeOff className="h-4 w-4 mr-1" />
                    ) : (
                      <Eye className="h-4 w-4 mr-1" />
                    )}
                    {product.active ? 'Desativar' : 'Ativar'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhum produto encontrado</p>
          <p className="text-sm text-gray-400">Tente ajustar os filtros ou adicione novos produtos</p>
        </div>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};
