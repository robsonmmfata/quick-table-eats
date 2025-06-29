
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  CheckCircle
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const SuperAdminPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  const restaurants = [
    {
      id: 1,
      name: 'Burger King Paulista',
      owner: 'João Silva',
      email: 'joao@burgerking.com',
      plan: 'Premium',
      status: 'Ativo',
      pedidos: 156,
      receita: 'R$ 4.520,00',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Pizzaria do Zé',
      owner: 'José Santos',
      email: 'ze@pizzaria.com',
      plan: 'Básico',
      status: 'Ativo',
      pedidos: 89,
      receita: 'R$ 2.130,00',
      createdAt: '2024-02-03'
    },
    {
      id: 3,
      name: 'Sushi Express',
      owner: 'Maria Tanaka',
      email: 'maria@sushi.com',
      plan: 'Premium',
      status: 'Suspenso',
      pedidos: 45,
      receita: 'R$ 1.890,00',
      createdAt: '2024-01-28'
    },
    {
      id: 4,
      name: 'Lanchonete Central',
      owner: 'Pedro Costa',
      email: 'pedro@central.com',
      plan: 'Gratuito',
      status: 'Ativo',
      pedidos: 23,
      receita: 'R$ 567,00',
      createdAt: '2024-03-10'
    }
  ];

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
              <Button>Novo Restaurante</Button>
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
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {restaurant.status === 'Ativo' ? (
                          <Button variant="ghost" size="sm">
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
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
    </div>
  );
};
