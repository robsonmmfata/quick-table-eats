
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Plus, Eye, Edit } from "lucide-react";
import { QRCodeModal } from "@/components/QRCodeModal";

export const TablesGrid = () => {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const tables = [
    { id: 1, number: 1, status: "ocupada", orders: 2, total: "R$ 89,90" },
    { id: 2, number: 2, status: "livre", orders: 0, total: "R$ 0,00" },
    { id: 3, number: 3, status: "ocupada", orders: 1, total: "R$ 45,00" },
    { id: 4, number: 4, status: "livre", orders: 0, total: "R$ 0,00" },
    { id: 5, number: 5, status: "ocupada", orders: 3, total: "R$ 127,50" },
    { id: 6, number: 6, status: "livre", orders: 0, total: "R$ 0,00" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ocupada":
        return "bg-red-100 text-red-800";
      case "livre":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleShowQR = (tableId: number) => {
    setSelectedTable(tableId);
    setShowQRModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Mesas</h2>
          <p className="text-gray-600">Visualize e gerencie as mesas do seu restaurante</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Mesa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map((table) => (
          <Card key={table.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Mesa {table.number}</CardTitle>
                <Badge className={getStatusColor(table.status)}>
                  {table.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pedidos:</span>
                  <span className="font-medium">{table.orders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium text-green-600">{table.total}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleShowQR(table.id)}
                >
                  <QrCode className="h-4 w-4 mr-1" />
                  QR Code
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        tableNumber={selectedTable}
      />
    </div>
  );
};
