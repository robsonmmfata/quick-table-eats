
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users, Clock, DollarSign, Printer, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ComandaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: number | null;
  tableData?: any;
}

export const ComandaModal = ({ isOpen, onClose, tableNumber, tableData }: ComandaModalProps) => {
  const { toast } = useToast();

  const handlePrintComanda = () => {
    toast({
      title: "Comanda impressa!",
      description: `A comanda da Mesa ${tableNumber} foi enviada para impressão.`,
    });
  };

  const handleCloseTable = () => {
    toast({
      title: "Mesa fechada!",
      description: `A Mesa ${tableNumber} foi fechada com sucesso.`,
    });
    onClose();
  };

  if (!tableNumber || !tableData) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recebido": return "bg-blue-100 text-blue-800";
      case "preparando": return "bg-yellow-100 text-yellow-800";
      case "pronto": return "bg-green-100 text-green-800";
      case "entregue": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comanda - Mesa {tableNumber}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações da Mesa */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  <strong>{tableData.customers}</strong> pessoas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Aberta às 19:30</span>
              </div>
            </div>
          </div>

          {/* Lista de Pedidos */}
          <div className="space-y-4">
            <h3 className="font-semibold">Pedidos da Mesa</h3>
            
            {tableData.orders.map((order: any, index: number) => (
              <div key={order.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Pedido #{order.id}</span>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    {index === 0 ? "19:35" : index === 1 ? "19:42" : "19:58"}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {order.items.map((item: string, itemIndex: number) => (
                    <div key={itemIndex} className="flex justify-between text-sm">
                      <span>{item}</span>
                      <span className="text-gray-500">
                        R$ {(order.total / order.items.length).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-medium">
                  <span>Subtotal:</span>
                  <span>R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Geral */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between text-lg font-bold">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Total Geral:</span>
              </div>
              <span className="text-green-600">R$ {tableData.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handlePrintComanda}
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimir Comanda
            </Button>
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleCloseTable}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Fechar Mesa
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            Mesa aberta há 1h 28min
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
