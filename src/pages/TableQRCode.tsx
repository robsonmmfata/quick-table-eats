
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Printer, Share2, Users, Utensils } from 'lucide-react';

const TableQRCode = () => {
  const { tableId } = useParams();

  if (!tableId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-red-600">Mesa não encontrada</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const qrCodeUrl = `${window.location.origin}/cardapio/mesa/${tableId}`;

  const handleDownload = () => {
    const svg = document.getElementById('table-qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `mesa-${tableId}-qrcode.svg`;
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
            <title>QR Code - Mesa ${tableId}</title>
            <style>
              body { 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                min-height: 100vh; 
                margin: 0; 
                font-family: Arial, sans-serif;
                background: white;
              }
              .qr-container { 
                text-align: center; 
                padding: 40px;
                border: 2px solid #000;
                border-radius: 10px;
              }
              h1 { 
                margin-bottom: 20px; 
                font-size: 2rem;
                color: #333;
              }
              p { 
                font-size: 1.2rem; 
                margin-top: 20px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h1>Mesa ${tableId}</h1>
              <div>${document.getElementById('table-qr-code')?.outerHTML}</div>
              <p>Escaneie para ver o cardápio</p>
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
          title: `Mesa ${tableId} - QR Code`,
          text: 'Escaneie este QR Code para acessar o cardápio',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Users className="h-6 w-6" />
            Mesa {tableId}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
            <Utensils className="h-5 w-5" />
            <span>Escaneie para ver o cardápio</span>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-inner">
            <QRCodeSVG
              id="table-qr-code"
              value={qrCodeUrl}
              size={200}
              level="H"
              includeMargin={true}
              fgColor="#1f2937"
              bgColor="#ffffff"
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-medium">
              Aponte a câmera do seu celular para o código acima
            </p>
            <p className="text-xs text-gray-500 break-all bg-gray-50 p-2 rounded">
              {qrCodeUrl}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 pt-4">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Baixar
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" />
              Imprimir
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" />
              Compartilhar
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              💡 <strong>Como usar:</strong> Abra a câmera do celular e aponte para o QR Code. 
              Toque na notificação que aparecer para abrir o cardápio.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableQRCode;
