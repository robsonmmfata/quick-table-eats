
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Users, Clock, DollarSign, Eye } from "lucide-react";
import { QRCodeModal } from "./QRCodeModal";
import { ComandaModal } from "./ComandaModal";

export const TablesGrid = () => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showComandaModal, setShowComandaModal] = useState(false);

  const tables = [
    { id: 1, number: 1, status: "livre", customers: 0, total: 0, orders: [] },
    { 
      id: 2, 
      number: 2, 
      status: "ocupada", 
      customers: 4, 
      total: 89.50, 
      orders: [
        { id: 1, items: ["2x Hambúrguer Clássico", "2x Coca-Cola"], total: 63.60, status: "preparando" },
        { id: 2, items: ["1x Batata Frita Grande"], total: 12.90, status: "pronto" }
      ]
    },
    { 
      id: 3, 
      number: 3, 
      status: "ocupada", 
      customers: 2, 
      total: 42.90, 
      orders: [
        { id: 3, items: ["1x Pizza Margherita"], total: 42.90, status: "recebido" }
      ]
    },
    { id: 4, number: 4, status: "livre", customers: 0, total: 0, orders: [] },
    { 
      id: 5, 
      number: 5, 
      status: "ocupada", 
      customers: 6, 
      total: 127.40, 
      orders: [
        { id: 4, items: ["3x Refrigerante Lata", "2x Hambúrguer Bacon"], total: 78.50, status: "entregue" },
        { id: 5, items: ["2x Batata Frita Grande", "1x Pizza Margherita"], total: 68.70, status: "preparando" }
      ]
    },
    { id: 6, number: 6, status: "livre", customers: 0, total: 0, orders: [] },
    { id: 7, number: 7, status: "livre", customers: 0, total: 0, orders: [] },
    { id: 8, number: 8, status: "livre", customers: 0, total: 0, orders: [] },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "livre":
        return { color: "bg-green-100 text-green-800", label: "Livre" };
      case "ocupada":
        return { color: "bg-red-100 text-red-800", label: "Ocupada" };
      default:
        return { color: "bg-gray-100 text-gray-800", label: "Indefinido" };
    }
  };

  const handleShowQR = (tableNumber: number) => {
    setSelectedTable(tableNumber);
    setShowQRModal(true);
  };

  const handleShowComanda = (tableNumber: number) => {
    setSelectedTable(tableNumber);
    setShowComandaModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Gerenciamento de Mesas</h2>
        <p className="text-gray-600">Controle suas mesas e gere QR Codes para pedidos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map((table) => {
          const statusConfig = getStatusConfig(table.status);
          
          return (
            <Card key={table.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Mesa {table.number}
                  </CardTitle>
                  <Badge className={statusConfig.color}>
                    {statusConfig.label}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{table.customers} pessoas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>R$ {table.total.toFixed(2)}</span>
                  </div>
                </div>

                {table.orders.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Pedidos ativos:</p>
                    {table.orders.slice(0, 2).map((order) => (
                      <div key={order.id} className="text-xs bg-gray-50 p-2 rounded">
                        <div className="flex justify-between items-center mb-1">
                          <span>Pedido #{order.id}</span>
                          <Badge variant="outline" className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                        <div className="text-gray-600">
                          {order.items.slice(0, 2).join(", ")}
                          {order.items.length > 2 && " ..."}
                        </div>
                        <div className="font-medium text-green-600 mt-1">
                          R$ {order.total.toFixed(2)}
                        </div>
                      </div>
                    ))}
                    {table.orders.length > 2 && (
                      <p className="text-xs text-gray-500">+{table.orders.length - 2} pedidos...</p>
                    )}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleShowQR(table.number)}
                  >
                    <QrCode className="h-4 w-4 mr-1" />
                    QR Code
                  </Button>
                  {table.status === "ocupada" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleShowComanda(table.number)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Comanda
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        tableNumber={selectedTable}
      />

      <ComandaModal
        isOpen={showComandaModal}
        onClose={() => setShowComandaModal(false)}
        tableNumber={selectedTable}
        tableData={tables.find(t => t.number === selectedTable)}
      />
    </div>
  );
};
