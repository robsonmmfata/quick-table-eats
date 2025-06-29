
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: number | null;
}

export const QRCodeModal = ({ isOpen, onClose, tableNumber }: QRCodeModalProps) => {
  const { toast } = useToast();

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    `https://pedido.com/restaurante-demo/mesa/${tableNumber}`
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://pedido.com/restaurante-demo/mesa/${tableNumber}`);
    toast({
      title: "Link copiado!",
      description: "O link do cardápio foi copiado para a área de transferência.",
    });
  };

  if (!tableNumber) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code - Mesa {tableNumber}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <img
              src={qrCodeUrl}
              alt={`QR Code para Mesa ${tableNumber}`}
              className="w-64 h-64"
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Link do cardápio para Mesa {tableNumber}:
            </p>
            <p className="text-xs bg-gray-100 p-2 rounded font-mono break-all">
              https://pedido.com/restaurante-demo/mesa/{tableNumber}
            </p>
          </div>

          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copiar Link
            </Button>
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Baixar QR
            </Button>
            <Button variant="outline" className="flex-1">
              <Share className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
