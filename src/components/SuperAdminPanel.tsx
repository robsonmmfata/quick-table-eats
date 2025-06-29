
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Crown, 
  Users, 
  Store, 
  TrendingUp, 
  DollarSign, 
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  Edit,
  Trash2,
  Plus,
  X
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Restaurant {
  id: number;
  name: string;
  owner: string;
  email: string;
  phone?: string;
  address?: string;
  plan: string;
  status: string;
  pedidos: number;
  receita: string;
  createdAt: string;
  description?: string;
}

export const SuperAdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewModal, setViewModal] = useState<{ open: boolean; restaurant: Restaurant | null }>({
    open: false,
    restaurant: null
  });
  const [editModal, setEditModal] = useState<{ open: boolean; restaurant: Restaurant | null }>({
    open: false,
    restaurant: null
  });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; restaurant: Restaurant | null }>({
    open: false,
    restaurant: null
  });
  const [newRestaurantModal, setNewRestaurantModal] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Restaurant>>({});
  const [newRestaurantForm, setNewRestaurantForm] = useState<Partial<Restaurant>>({
    plan: 'Gratuito',
    status: 'Ativo'
  });

  const { toast } = useToast();

  const stats = [
    {
      title: 'Restaurantes Ativos',
      value: '247',
      change: '+12%',
      icon: Store,
      color: 'text-blue-600'
    },
    {
      title: 'Pedidos Hoje',
      value: '1,432',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 89,432',
      change: '+23%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Usuários Ativos',
      value: '8,921',
      change: '+15%',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 1,
      name: 'Burger King Paulista',
      owner: 'João Silva',
      email: 'joao@burgerking.com',
      phone: '(11) 99999-9999',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      plan: 'Premium',
      status: 'Ativo',
      pedidos: 156,
      receita: 'R$ 4.520,00',
      createdAt: '2024-01-15',
      description: 'Tradicional hamburgueria com foco em qualidade e sabor'
    },
    {
      id: 2,
      name: 'Pizzaria do Zé',
      owner: 'José Santos',
      email: 'ze@pizzaria.com',
      phone: '(11) 88888-8888',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      plan: 'Básico',
      status: 'Ativo',
      pedidos: 89,
      receita: 'R$ 2.130,00',
      createdAt: '2024-02-03',
      description: 'Pizzas artesanais com ingredientes frescos'
    },
    {
      id: 3,
      name: 'Sushi Express',
      owner: 'Maria Tanaka',
      email: 'maria@sushi.com',
      phone: '(11) 77777-7777',
      address: 'Rua Japão, 456 - São Paulo, SP',
      plan: 'Premium',
      status: 'Suspenso',
      pedidos: 45,
      receita: 'R$ 1.890,00',
      createdAt: '2024-01-28',
      description: 'Culinária japonesa tradicional e contemporânea'
    },
    {
      id: 4,
      name: 'Lanchonete Central',
      owner: 'Pedro Costa',
      email: 'pedro@central.com',
      phone: '(11) 66666-6666',
      address: 'Av. Central, 789 - São Paulo, SP',
      plan: 'Gratuito',
      status: 'Ativo',
      pedidos: 23,
      receita: 'R$ 567,00',
      createdAt: '2024-03-10',
      description: 'Lanches rápidos e saborosos'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ativo':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'Suspenso':
        return <Badge className="bg-red-100 text-red-800">Suspenso</Badge>;
      case 'Pendente':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'Premium':
        return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>;
      case 'Básico':
        return <Badge className="bg-blue-100 text-blue-800">Básico</Badge>;
      case 'Gratuito':
        return <Badge variant="outline">Gratuito</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (restaurant: Restaurant) => {
    setViewModal({ open: true, restaurant });
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditForm(restaurant);
    setEditModal({ open: true, restaurant });
  };

  const handleDelete = (restaurant: Restaurant) => {
    setDeleteModal({ open: true, restaurant });
  };

  const handleToggleStatus = (restaurant: Restaurant) => {
    const newStatus = restaurant.status === 'Ativo' ? 'Suspenso' : 'Ativo';
    setRestaurants(prev => 
      prev.map(r => r.id === restaurant.id ? { ...r, status: newStatus } : r)
    );
    toast({
      title: "Status atualizado",
      description: `${restaurant.name} foi ${newStatus.toLowerCase()}.`,
    });
  };

  const handleSaveEdit = () => {
    if (!editModal.restaurant) return;

    setRestaurants(prev =>
      prev.map(r => 
        r.id === editModal.restaurant!.id 
          ? { ...r, ...editForm }
          : r
      )
    );
    
    setEditModal({ open: false, restaurant: null });
    setEditForm({});
    toast({
      title: "Restaurante atualizado",
      description: "As informações foram salvas com sucesso.",
    });
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.restaurant) return;

    setRestaurants(prev => 
      prev.filter(r => r.id !== deleteModal.restaurant!.id)
    );
    
    setDeleteModal({ open: false, restaurant: null });
    toast({
      title: "Restaurante excluído",
      description: "O restaurante foi removido do sistema.",
      variant: "destructive"
    });
  };

  const handleCreateRestaurant = () => {
    const newId = Math.max(...restaurants.map(r => r.id)) + 1;
    const newRestaurant: Restaurant = {
      id: newId,
      name: newRestaurantForm.name || '',
      owner: newRestaurantForm.owner || '',
      email: newRestaurantForm.email || '',
      phone: newRestaurantForm.phone || '',
      address: newRestaurantForm.address || '',
      plan: newRestaurantForm.plan || 'Gratuito',
      status: newRestaurantForm.status || 'Ativo',
      pedidos: 0,
      receita: 'R$ 0,00',
      createdAt: new Date().toISOString().split('T')[0],
      description: newRestaurantForm.description || ''
    };

    setRestaurants(prev => [...prev, newRestaurant]);
    setNewRestaurantModal(false);
    setNewRestaurantForm({ plan: 'Gratuito', status: 'Ativo' });
    toast({
      title: "Restaurante criado",
      description: "Novo restaurante adicionado ao sistema.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Crown className="h-8 w-8 text-yellow-600" />
        <div>
          <h2 className="text-2xl font-bold">Super Admin Dashboard</h2>
          <p className="text-gray-600">Painel de controle da plataforma</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} vs mês anterior</p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Restaurants Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Gerenciar Restaurantes
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Buscar restaurantes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button onClick={() => setNewRestaurantModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Restaurante
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Restaurante</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pedidos</TableHead>
                  <TableHead>Receita</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{restaurant.name}</div>
                        <div className="text-sm text-gray-500">{restaurant.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{restaurant.owner}</TableCell>
                    <TableCell>{getPlanBadge(restaurant.plan)}</TableCell>
                    <TableCell>{getStatusBadge(restaurant.status)}</TableCell>
                    <TableCell className="text-center">{restaurant.pedidos}</TableCell>
                    <TableCell className="font-medium">{restaurant.receita}</TableCell>
                    <TableCell>{restaurant.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(restaurant)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(restaurant)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleToggleStatus(restaurant)}
                        >
                          {restaurant.status === 'Ativo' ? (
                            <Ban className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(restaurant)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Novos Cadastros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {restaurants.slice(0, 3).map((restaurant) => (
                <div key={restaurant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{restaurant.name}</p>
                    <p className="text-sm text-gray-600">{restaurant.owner}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{restaurant.createdAt}</p>
                    {getPlanBadge(restaurant.plan)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {restaurants
                .sort((a, b) => b.pedidos - a.pedidos)
                .slice(0, 3)
                .map((restaurant, index) => (
                  <div key={restaurant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{restaurant.name}</p>
                        <p className="text-sm text-gray-600">{restaurant.pedidos} pedidos</p>
                      </div>
                    </div>
                    <p className="font-medium text-green-600">{restaurant.receita}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Modal */}
      <Dialog open={viewModal.open} onOpenChange={(open) => setViewModal({ open, restaurant: null })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Restaurante</DialogTitle>
            <DialogDescription>
              Informações completas do estabelecimento
            </DialogDescription>
          </DialogHeader>
          {viewModal.restaurant && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Nome</Label>
                <p className="font-medium">{viewModal.restaurant.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Responsável</Label>
                <p className="font-medium">{viewModal.restaurant.owner}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Email</Label>
                <p className="font-medium">{viewModal.restaurant.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Telefone</Label>
                <p className="font-medium">{viewModal.restaurant.phone || 'Não informado'}</p>
              </div>
              <div className="col-span-2">
                <Label className="text-sm font-medium text-gray-500">Endereço</Label>
                <p className="font-medium">{viewModal.restaurant.address || 'Não informado'}</p>
              </div>
              <div className="col-span-2">
                <Label className="text-sm font-medium text-gray-500">Descrição</Label>
                <p className="font-medium">{viewModal.restaurant.description || 'Sem descrição'}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Plano</Label>
                <div className="mt-1">
                  {getPlanBadge(viewModal.restaurant.plan)}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <div className="mt-1">
                  {getStatusBadge(viewModal.restaurant.status)}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Pedidos</Label>
                <p className="font-medium">{viewModal.restaurant.pedidos}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Receita</Label>
                <p className="font-medium">{viewModal.restaurant.receita}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={editModal.open} onOpenChange={(open) => setEditModal({ open, restaurant: null })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Restaurante</DialogTitle>
            <DialogDescription>
              Atualize as informações do estabelecimento
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome do Restaurante</Label>
              <Input
                value={editForm.name || ''}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Responsável</Label>
              <Input
                value={editForm.owner || ''}
                onChange={(e) => setEditForm({ ...editForm, owner: e.target.value })}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={editForm.email || ''}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input
                value={editForm.phone || ''}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label>Endereço</Label>
              <Input
                value={editForm.address || ''}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label>Descrição</Label>
              <Textarea
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>
            <div>
              <Label>Plano</Label>
              <Select
                value={editForm.plan || ''}
                onValueChange={(value) => setEditForm({ ...editForm, plan: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gratuito">Gratuito</SelectItem>
                  <SelectItem value="Básico">Básico</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={editForm.status || ''}
                onValueChange={(value) => setEditForm({ ...editForm, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Suspenso">Suspenso</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModal({ open: false, restaurant: null })}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, restaurant: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o restaurante "{deleteModal.restaurant?.name}"? 
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModal({ open: false, restaurant: null })}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Excluir Restaurante
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Restaurant Modal */}
      <Dialog open={newRestaurantModal} onOpenChange={setNewRestaurantModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Restaurante</DialogTitle>
            <DialogDescription>
              Cadastre um novo estabelecimento na plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nome do Restaurante *</Label>
              <Input
                value={newRestaurantForm.name || ''}
                onChange={(e) => setNewRestaurantForm({ ...newRestaurantForm, name: e.target.value })}
                placeholder="Ex: Restaurante do João"
              />
            </div>
            <div>
              <Label>Responsável *</Label>
              <Input
                value={newRestaurantForm.owner || ''}
                onChange={(e) => setNewRestaurantForm({ ...newRestaurantForm, owner: e.target.value })}
                placeholder="Ex: João Silva"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={newRestaurantForm.email || ''}
                onChange={(e) => setNewRestaurantForm({ ...newRestaurantForm, email: e.target.value })}
                placeholder="Ex: joao@restaurante.com"
              />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input
                value={newRestaurantForm.phone || ''}
                onChange={(e) => setNewRestaurantForm({ ...newRestaurantForm, phone: e.target.value })}
                placeholder="Ex: (11) 99999-9999"
              />
            </div>
            <div className="col-span-2">
              <Label>Endereço</Label>
              <Input
                value={newRestaurantForm.address || ''}
                onChange={(e) => setNewRestaurantForm({ ...newRestaurantForm, address: e.target.value })}
                placeholder="Ex: Rua das Flores, 123 - São Paulo, SP"
              />
            </div>
            <div className="col-span-2">
              <Label>Descrição</Label>
              <Textarea
                value={newRestaurantForm.description || ''}
                onChange={(e) => setNewRestaurantForm({ ...newRestaurantForm, description: e.target.value })}
                placeholder="Descreva o restaurante..."
              />
            </div>
            <div>
              <Label>Plano</Label>
              <Select
                value={newRestaurantForm.plan || 'Gratuito'}
                onValueChange={(value) => setNewRestaurantForm({ ...newRestaurantForm, plan: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gratuito">Gratuito</SelectItem>
                  <SelectItem value="Básico">Básico</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={newRestaurantForm.status || 'Ativo'}
                onValueChange={(value) => setNewRestaurantForm({ ...newRestaurantForm, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Suspenso">Suspenso</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewRestaurantModal(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateRestaurant}
              disabled={!newRestaurantForm.name || !newRestaurantForm.owner || !newRestaurantForm.email}
            >
              Criar Restaurante
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
