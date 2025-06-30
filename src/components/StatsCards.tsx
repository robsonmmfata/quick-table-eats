
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

export const StatsCards = () => {
  // Simulando dados reais que viriam de uma API
  const stats = {
    dailyRevenue: 2450.75,
    dailyRevenueChange: 12.5,
    totalOrders: 34,
    ordersChange: -5.2,
    activeCustomers: 128,
    customersChange: 8.3,
    avgOrderValue: 72.08,
    avgOrderChange: 15.7
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receita Hoje</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.dailyRevenue)}</div>
          <p className={`text-xs ${getChangeColor(stats.dailyRevenueChange)}`}>
            {formatPercentage(stats.dailyRevenueChange)} em relação a ontem
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pedidos Hoje</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
          <p className={`text-xs ${getChangeColor(stats.ordersChange)}`}>
            {formatPercentage(stats.ordersChange)} em relação a ontem
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeCustomers}</div>
          <p className={`text-xs ${getChangeColor(stats.customersChange)}`}>
            {formatPercentage(stats.customersChange)} esta semana
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.avgOrderValue)}</div>
          <p className={`text-xs ${getChangeColor(stats.avgOrderChange)}`}>
            {formatPercentage(stats.avgOrderChange)} este mês
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
