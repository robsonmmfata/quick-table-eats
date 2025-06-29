
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: any[];
  setCart: (cart: any[]) => void;
  tableId?: string;
}

export const CartDrawer = ({ isOpen, onClose, cart, setCart, tableId }: CartDrawerProps) => {
  const { toast } = useToast();

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleFinishOrder = () => {
    toast({
      title: "Pedido enviado!",
      description: `Seu pedido da Mesa ${tableId} foi enviado para a cozinha. Tempo estimado: 15-20 minutos.`,
    });
    setCart([]);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader className="sticky top-0 bg-white pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Seu Pedido - Mesa {tableId}
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Seu carrinho está vazio
            </h3>
            <p className="text-gray-500">
              Adicione alguns produtos do cardápio para continuar
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-green-600">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, 0)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="sticky bottom-0 bg-white pt-4 border-t space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-green-600">R$ {getCartTotal().toFixed(2)}</span>
              </div>
              
              <Button 
                onClick={handleFinishOrder}
                className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700"
              >
                Finalizar Pedido
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                Seu pedido será enviado diretamente para a cozinha
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
