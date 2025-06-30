
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  TrendingDown,
  Search,
  Filter,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  minStock: number;
  cost: number;
  supplier: string;
  lastUpdated: string;
  status: 'normal' | 'low' | 'critical';
}

export const InventoryManager = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: 'Carne Bovina',
      category: 'Carnes',
      quantity: 15,
      unit: 'kg',
      minStock: 10,
      cost: 25.50,
      supplier: 'Açougue Central',
      lastUpdated: '2024-06-29',
      status: 'normal'
    },
    {
      id: 2,
      name: 'Pão de Hambúrguer',
      category: 'Panificados',
      quantity: 5,
      unit: 'pacotes',
      minStock: 20,
      cost: 8.50,
      supplier: 'Padaria do Bairro',
      lastUpdated: '2024-06-28',
      status: 'critical'
    },
    {
      id: 3,
      name: 'Queijo Mussarela',
      category: 'Laticínios',
      quantity: 8,
      unit: 'kg',
      minStock: 5,
      cost: 18.00,
      supplier: 'Laticínios São Paulo',
      lastUpdated: '2024-06-29',
      status: 'low'
    },
    {
      id: 4,
      name: 'Batata',
      category: 'Legumes',
      quantity: 25,
      unit: 'kg',
      minStock: 15,
      cost: 4.50,
      supplier: 'Hortifruti Verde',
      lastUpdated: '2024-06-29',
      status: 'normal'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    category: 'Carnes',
    unit: 'kg',
    status: 'normal'
  });

  const { toast } = useToast();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800">Crítico</Badge>;
      case 'low':
        return <Badge className="bg-yellow-100 text-yellow-800">Baixo</Badge>;
      case 'normal':
        return <Badge className="bg-green-100 text-green-800">Normal</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const updateItemStatus = (item: InventoryItem): InventoryItem => {
    let status: 'normal' | 'low' | 'critical' = 'normal';
    
    if (item.quantity <= item.minStock * 0.5) {
      status = 'critical';
    } else if (item.quantity <= item.minStock) {
      status = 'low';
    }
    
    return { ...item, status };
  };

  const filteredInventory = inventory
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.cost || !newItem.minStock) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...inventory.map(i => i.id)) + 1;
    const item: InventoryItem = {
      id: newId,
      name: newItem.name!,
      category: newItem.category!,
      quantity: newItem.quantity!,
      unit: newItem.unit!,
      minStock: newItem.minStock!,
      cost: newItem.cost!,
      supplier: newItem.supplier || '',
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'normal'
    };

    const updatedItem = updateItemStatus(item);
    setInventory([...inventory, updatedItem]);
    setNewItem({ category: 'Carnes', unit: 'kg', status: 'normal' });
    setIsAddModalOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Item adicionado ao estoque!"
    });
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setInventory(inventory.map(item => 
      item.id === id 
        ? updateItemStatus({ ...item, quantity: newQuantity, lastUpdated: new Date().toISOString().split('T')[0] })
        : item
    ));
  };

  const handleDeleteItem = (id: number) => {
    setInventory(inventory.filter(item => item.id !== id));
    toast({
      title: "Sucesso",
      description: "Item removido do estoque!"
    });
  };

  const categories = [...new Set(inventory.map(item => item.category))];
  const totalItems = inventory.length;
  const criticalItems = inventory.filter(item => item.status === 'critical').length;
  const lowStockItems = inventory.filter(item => item.status === 'low').length;
  const totalValue = inventory.reduce((acc, item) => acc + (item.quantity * item.cost), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Gestão de Estoque</h2>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Item no Estoque</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nome do Item *</Label>
                <Input
                  value={newItem.name || ''}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Ex: Carne Bovina"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Categoria</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Carnes">Carnes</SelectItem>
                      <SelectItem value="Panificados">Panificados</SelectItem>
                      <SelectItem value="Laticínios">Laticínios</SelectItem>
                      <SelectItem value="Legumes">Legumes</SelectItem>
                      <SelectItem value="Bebidas">Bebidas</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Unidade</Label>
                  <Select
                    value={newItem.unit}
                    onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="litros">litros</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="unidades">unidades</SelectItem>
                      <SelectItem value="pacotes">pacotes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Quantidade Atual *</Label>
                  <Input
                    type="number"
                    value={newItem.quantity || ''}
                    onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                    placeholder="Ex: 15"
                  />
                </div>
                <div>
                  <Label>Estoque Mínimo *</Label>
                  <Input
                    type="number"
                    value={newItem.minStock || ''}
                    onChange={(e) => setNewItem({ ...newItem, minStock: Number(e.target.value) })}
                    placeholder="Ex: 5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Custo por Unidade *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newItem.cost || ''}
                    onChange={(e) => setNewItem({ ...newItem, cost: Number(e.target.value) })}
                    placeholder="Ex: 25.50"
                  />
                </div>
                <div>
                  <Label>Fornecedor</Label>
                  <Input
                    value={newItem.supplier || ''}
                    onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                    placeholder="Ex: Açougue Central"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddItem}>
                Adicionar Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Itens</p>
                <p className="text-xl font-bold">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Estoque Crítico</p>
                <p className="text-xl font-bold">{criticalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Estoque Baixo</p>
                <p className="text-xl font-bold">{lowStockItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Valor Total</p>
                <p className="text-xl font-bold">R$ {totalValue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Buscar itens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Baixo</SelectItem>
                <SelectItem value="critical">Crítico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Itens */}
      <Card>
        <CardHeader>
          <CardTitle>Itens em Estoque</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInventory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.category} • {item.supplier}</p>
                    <p className="text-sm text-gray-500">
                      Min: {item.minStock} {item.unit} • R$ {item.cost.toFixed(2)}/{item.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                        className="w-20 h-8 text-center"
                      />
                      <span className="text-sm text-gray-600">{item.unit}</span>
                    </div>
                    <p className="text-xs text-gray-500">Atualizado: {item.lastUpdated}</p>
                  </div>
                  {getStatusBadge(item.status)}
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
