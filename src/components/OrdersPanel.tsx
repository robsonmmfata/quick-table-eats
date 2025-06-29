
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle, Users } from "lucide-react";

export const OrdersPanel = () => {
  const orders = [
    {
      id: 1,
      mesa: 3,
      items: ["2x Hambúrguer Clássico", "1x Batata Frita", "2x Coca-Cola"],
      total: "R$ 67,90",
      status: "recebido",
      time: "2 min",
    },
    {
      id: 2,
      mesa: 1,
      items: ["1x Pizza Margherita", "1x Suco de Laranja"],
      total: "R$ 45,00",
      status: "preparando",
      time: "8 min",
    },
    {
      id: 3,
      mesa: 5,
      items: ["3x Cerveja Heineken", "1x Porção de Frango"],
      total: "R$ 89,70",
      status: "pronto",
      time: "15 min",
    },
    {
      id: 4,
      mesa: 7,
      items: ["1x Salada Caesar", "1x Água com Gás"],
      total: "R$ 28,50",
      status: "entregue",
      time: "22 min",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "recebido":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: AlertCircle,
          action: "Iniciar Preparo",
        };
      case "preparando":
        return {
          color: "bg-yellow-100 text-yellow-800",
          icon: Clock,
          action: "Marcar como Pronto",
        };
      case "pronto":
        return {
          color: "bg-green-100 text-green-800",
          icon: CheckCircle,
          action: "Marcar como Entregue",
        };
      case "entregue":
        return {
          color: "bg-gray-100 text-gray-800",
          icon: CheckCircle,
          action: "Concluído",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: AlertCircle,
          action: "Ação",
        };
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Painel de Pedidos</h2>
        <p className="text-gray-600">Acompanhe todos os pedidos em tempo real</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {orders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const StatusIcon = statusConfig.icon;

          return (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Mesa {order.mesa}
                  </CardTitle>
                  <Badge className={statusConfig.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {order.status}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Pedido #{order.id} • {order.time} atrás
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="text-sm">
                      {item}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-green-600">
                    {order.total}
                  </span>
                  {order.status !== "entregue" && (
                    <Button size="sm" variant="outline">
                      {statusConfig.action}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
