
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Print, Receipt, Users, Clock } from 'lucide-react';

interface Order {
  id: number;
  items: string[];
  total: number;
  status: string;
}

interface TableData {
  number: number;
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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Comanda - Mesa ${tableNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px; }
              .order { margin-bottom: 15px; padding: 10px; border: 1px solid #ccc; }
              .total { font-weight: bold; font-size: 18px; text-align: right; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>COMANDA - MESA ${tableNumber}</h1>
              <p>Data: ${new Date().toLocaleDateString('pt-BR')}</p>
              <p>Pessoas: ${tableData.customers}</p>
            </div>
            ${tableData.orders.map(order => `
              <div class="order">
                <h3>Pedido #${order.id}</h3>
                ${order.items.map(item => `<p>• ${item}</p>`).join('')}
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Subtotal:</strong> R$ ${order.total.toFixed(2)}</p>
              </div>
            `).join('')}
            <div class="total">
              <p>TOTAL GERAL: R$ ${tableData.total.toFixed(2)}</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'recebido': return 'bg-blue-100 text-blue-800';
      case 'preparando': return 'bg-yellow-100 text-yellow-800';
      case 'pronto': return 'bg-green-100 text-green-800';
      case 'entregue': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Comanda - Mesa {tableNumber}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Informações da Mesa */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{tableData.customers} pessoas</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* Lista de Pedidos */}
          <div className="space-y-3">
            <h3 className="font-semibold">Pedidos:</h3>
            {tableData.orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Pedido #{order.id}</h4>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="space-y-1 mb-2">
                  {order.items.map((item, index) => (
                    <p key={index} className="text-sm">• {item}</p>
                  ))}
                </div>
                <div className="text-right">
                  <span className="font-semibold">R$ {order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Geral:</span>
              <span className="text-green-600">R$ {tableData.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-2 pt-4">
            <Button onClick={handlePrint} className="flex-1">
              <Print className="h-4 w-4 mr-2" />
              Imprimir Comanda
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
