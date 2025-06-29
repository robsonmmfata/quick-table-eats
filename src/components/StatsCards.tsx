
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Users, Clock, TrendingUp } from "lucide-react";

export const StatsCards = () => {
  const stats = [
    {
      title: "Pedidos Hoje",
      value: "24",
      change: "+12%",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Mesas Ativas",
      value: "8/15",
      change: "53%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tempo Médio",
      value: "18min",
      change: "-5min",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Faturamento",
      value: "R$ 1.247",
      change: "+8.2%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-600 mt-1">{stat.change} desde ontem</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
