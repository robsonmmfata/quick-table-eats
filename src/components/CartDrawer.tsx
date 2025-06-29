
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, ShoppingBag, User, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Restaurant {
  name: string;
  phone: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  tableNumber?: number;
  restaurant: Restaurant;
}

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  tableNumber,
  restaurant 
}: CartDrawerProps) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSubmitOrder = async () => {
    if (!customerName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe seu nome para continuar.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Criar mensagem para WhatsApp
      const orderItems = cart.map(item => 
        `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const message = `🍽️ *NOVO PEDIDO* 🍽️

👤 *Cliente:* ${customerName}
📞 *Telefone:* ${customerPhone || 'Não informado'}
${tableNumber ? `🪑 *Mesa:* ${tableNumber}` : ''}

📋 *Itens:*
${orderItems}

💰 *Total:* R$ ${getTotalPrice().toFixed(2)}

${observations ? `📝 *Observações:* ${observations}` : ''}

---
Enviado via Cardápio Digital`;

      // Aqui você implementaria a lógica para enviar o pedido
      // Por exemplo, salvar no banco de dados, enviar para WhatsApp, etc.
      console.log('Pedido enviado:', {
        customerName,
        customerPhone,
        tableNumber,
        cart,
        observations,
        total: getTotalPrice()
      });

      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Pedido enviado!",
        description: "Seu pedido foi enviado com sucesso. Aguarde a confirmação.",
      });

      // Limpar carrinho e fechar
      cart.forEach(item => onUpdateQuantity(item.id, 0));
      onClose();
      
      // Resetar formulário
      setCustomerName('');
      setCustomerPhone('');
      setObservations('');

    } catch (error) {
      toast({
        title: "Erro ao enviar pedido",
        description: "Tente novamente ou entre em contato conosco.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[400px]">
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500">Seu carrinho está vazio</p>
            <p className="text-sm text-gray-400">Adicione alguns itens para continuar</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrinho ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Itens do Carrinho */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    R$ {item.price.toFixed(2)} cada
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateQuantity(item.id, 0)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-green-600">R$ {getTotalPrice().toFixed(2)}</span>
          </div>

          <Separator />

          {/* Dados do Cliente */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Seus Dados
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Seu nome"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>

              {tableNumber && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                  <Badge variant="outline">Mesa {tableNumber}</Badge>
                  <span className="text-sm text-blue-700">
                    Seu pedido será entregue na mesa
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observations" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Observações
            </Label>
            <Textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Alguma observação sobre seu pedido? (opcional)"
              rows={3}
            />
          </div>

          {/* Botão de Finalizar */}
          <Button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || !customerName.trim()}
            className="w-full h-12 text-lg"
          >
            {isSubmitting ? 'Enviando...' : `Finalizar Pedido - R$ ${getTotalPrice().toFixed(2)}`}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Ao finalizar, seu pedido será enviado para {restaurant.name}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
