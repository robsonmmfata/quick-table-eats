
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

export const StatsCards = () => {
  const stats = [
    {
      title: 'Pedidos Hoje',
      value: '24',
      change: '+12%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Mesas Ocupadas',
      value: '8/12',
      change: '67%',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Faturamento Hoje',
      value: 'R$ 1.247,80',
      change: '+23%',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Crescimento',
      value: '+15%',
      change: 'vs ontem',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <IconComponent className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} {stat.title === 'Crescimento' ? '' : 'vs ontem'}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
