
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Users, Clock, DollarSign, CheckCircle } from 'lucide-react';

interface Order {
  id: number;
  items: string[];
  total: number;
  status: string;
}

interface TableData {
  id: number;
  number: number;
  status: string;
  customers: number;
  total: number;
  orders: Order[];
}

interface ComandaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: number | null;
  tableData?: TableData;
}

export const ComandaModal = ({ isOpen, onClose, tableNumber, tableData }: ComandaModalProps) => {
  if (!tableNumber || !tableData) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'recebido':
        return 'bg-blue-100 text-blue-800';
      case 'preparando':
        return 'bg-yellow-100 text-yellow-800';
      case 'pronto':
        return 'bg-green-100 text-green-800';
      case 'entregue':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comanda - Mesa {tableNumber}
          </DialogTitle>
          <DialogDescription>
            Visualize todos os pedidos e informações da mesa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações da Mesa */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <Users className="h-5 w-5 mx-auto mb-1 text-gray-600" />
              <p className="text-sm text-gray-600">Pessoas</p>
              <p className="font-semibold">{tableData.customers}</p>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-gray-600" />
              <p className="text-sm text-gray-600">Status</p>
              <Badge className={tableData.status === 'ocupada' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                {tableData.status === 'ocupada' ? 'Ocupada' : 'Livre'}
              </Badge>
            </div>
            <div className="text-center">
              <DollarSign className="h-5 w-5 mx-auto mb-1 text-gray-600" />
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-semibold text-green-600">R$ {tableData.total.toFixed(2)}</p>
            </div>
          </div>

          {/* Lista de Pedidos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Pedidos</h3>
            
            {tableData.orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum pedido encontrado</p>
              </div>
            ) : (
              tableData.orders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Pedido #{order.id}</h4>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {item}
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total do Pedido:</span>
                    <span className="font-semibold text-green-600">R$ {order.total.toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Ações */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Fechar
            </Button>
            {tableData.orders.some(order => order.status === 'pronto') && (
              <Button className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como Entregue
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
