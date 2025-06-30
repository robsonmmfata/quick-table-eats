
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Clock, 
  Star,
  Calendar,
  Target
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AnalyticsDashboard = () => {
  const salesData = [
    { name: 'Jan', vendas: 4000, pedidos: 120 },
    { name: 'Fev', vendas: 3000, pedidos: 98 },
    { name: 'Mar', vendas: 5000, pedidos: 150 },
    { name: 'Abr', vendas: 4500, pedidos: 135 },
    { name: 'Mai', vendas: 6000, pedidos: 180 },
    { name: 'Jun', vendas: 5500, pedidos: 165 }
  ];

  const topProducts = [
    { name: 'Hambúrguer Clássico', vendas: 45, receita: 'R$ 1.350,00' },
    { name: 'Pizza Margherita', vendas: 38, receita: 'R$ 1.140,00' },
    { name: 'Batata Frita', vendas: 52, receita: 'R$ 624,00' },
    { name: 'Coca-Cola', vendas: 67, receita: 'R$ 402,00' },
    { name: 'Lasanha Bolonhesa', vendas: 28, receita: 'R$ 840,00' }
  ];

  const hourlyData = [
    { hora: '08:00', pedidos: 5 },
    { hora: '09:00', pedidos: 8 },
    { hora: '10:00', pedidos: 12 },
    { hora: '11:00', pedidos: 18 },
    { hora: '12:00', pedidos: 35 },
    { hora: '13:00', pedidos: 28 },
    { hora: '14:00', pedidos: 15 },
    { hora: '15:00', pedidos: 10 },
    { hora: '16:00', pedidos: 8 },
    { hora: '17:00', pedidos: 12 },
    { hora: '18:00', pedidos: 22 },
    { hora: '19:00', pedidos: 38 },
    { hora: '20:00', pedidos: 45 },
    { hora: '21:00', pedidos: 32 },
    { hora: '22:00', pedidos: 18 }
  ];

  const customerSegments = [
    { name: 'Novos', value: 35, color: '#3b82f6' },
    { name: 'Recorrentes', value: 45, color: '#10b981' },
    { name: 'VIP', value: 20, color: '#f59e0b' }
  ];

  const kpiCards = [
    {
      title: 'Receita Total',
      value: 'R$ 8.750,00',
      change: '+23%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Pedidos Hoje',
      value: '47',
      change: '+12%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Clientes Únicos',
      value: '156',
      change: '+8%',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Ticket Médio',
      value: 'R$ 45,80',
      change: '+5%',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-gray-600">Análise detalhada da performance do seu restaurante</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="gap-1">
            <Calendar className="h-3 w-3" />
            Últimos 30 dias
          </Badge>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <p className="text-sm text-green-600">{kpi.change} vs mês anterior</p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Vendas por Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="vendas" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pedidos por Horário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pedidos" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Produtos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.vendas} vendas</p>
                    </div>
                  </div>
                  <p className="font-medium text-green-600">{product.receita}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Segmentação de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {customerSegments.map((segment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: segment.color }}
                  />
                  <span className="text-sm">{segment.name}: {segment.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
