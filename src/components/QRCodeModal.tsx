
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Print, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: number | null;
}

export const QRCodeModal = ({ isOpen, onClose, tableNumber }: QRCodeModalProps) => {
  if (!tableNumber) return null;

  const qrCodeUrl = `${window.location.origin}/mesa/${tableNumber}`;

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `mesa-${tableNumber}-qrcode.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - Mesa ${tableNumber}</title>
            <style>
              body { 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                min-height: 100vh; 
                margin: 0; 
                font-family: Arial, sans-serif;
              }
              .qr-container { text-align: center; }
              h1 { margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h1>Mesa ${tableNumber}</h1>
              <div>${document.getElementById('qr-code-svg')?.outerHTML}</div>
              <p>Escaneie para fazer seu pedido</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mesa ${tableNumber} - QR Code`,
          text: 'Escaneie este QR Code para fazer seu pedido',
          url: qrCodeUrl,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      navigator.clipboard.writeText(qrCodeUrl);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code - Mesa {tableNumber}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <QRCodeSVG
              id="qr-code-svg"
              value={qrCodeUrl}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <p className="text-sm text-gray-600 text-center">
            Escaneie este código para acessar o cardápio da Mesa {tableNumber}
          </p>
          
          <p className="text-xs text-gray-500 text-center break-all">
            {qrCodeUrl}
          </p>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Baixar
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Print className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
