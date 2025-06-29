
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Store, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Upload,
  Save,
  QrCode,
  Smartphone,
  CreditCard
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export const RestaurantSettings = () => {
  const [settings, setSettings] = useState({
    // Informações Básicas
    name: 'Meu Restaurante',
    description: 'O melhor restaurante da cidade',
    phone: '(11) 99999-9999',
    email: 'contato@meurestaurante.com',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    website: 'https://meurestaurante.com',
    logo: '',
    
    // Horário de Funcionamento
    schedule: {
      monday: { open: '08:00', close: '22:00', closed: false },
      tuesday: { open: '08:00', close: '22:00', closed: false },
      wednesday: { open: '08:00', close: '22:00', closed: false },
      thursday: { open: '08:00', close: '22:00', closed: false },
      friday: { open: '08:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '20:00', closed: false }
    },
    
    // Configurações de Pedidos
    acceptOnlineOrders: true,
    acceptTableOrders: true,
    minOrderValue: 15.00,
    deliveryFee: 5.00,
    deliveryTime: 30,
    
    // Configurações de Pagamento
    acceptCash: true,
    acceptCard: true,
    acceptPix: true,
    pixKey: 'pix@meurestaurante.com',
    
    // WhatsApp
    whatsappNumber: '5511999999999',
    whatsappEnabled: true,
    
    // Link Personalizado
    customSlug: 'meu-restaurante'
  });

  const { toast } = useToast();

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as configurações
    console.log('Salvando configurações:', settings);
    
    toast({
      title: "Configurações salvas",
      description: "As configurações do restaurante foram atualizadas com sucesso."
    });
  };

  const handleScheduleChange = (day: string, field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day as keyof typeof prev.schedule],
          [field]: value
        }
      }
    }));
  };

  const days = [
    { key: 'monday', label: 'Segunda-feira' },
    { key: 'tuesday', label: 'Terça-feira' },
    { key: 'wednesday', label: 'Quarta-feira' },
    { key: 'thursday', label: 'Quinta-feira' },
    { key: 'friday', label: 'Sexta-feira' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Configurações do Restaurante</h2>
        <p className="text-gray-600">Gerencie as informações e configurações do seu estabelecimento</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nome do Restaurante</Label>
              <Input
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Endereço</Label>
              <Textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                value={settings.website}
                onChange={(e) => setSettings({ ...settings, website: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Link Personalizado */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Link Personalizado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Slug Personalizado</Label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">cardapio.app/</span>
                <Input
                  value={settings.customSlug}
                  onChange={(e) => setSettings({ ...settings, customSlug: e.target.value })}
                  placeholder="meu-restaurante"
                />
              </div>
              <p className="text-sm text-gray-500">
                Seu cardápio estará disponível em: cardapio.app/{settings.customSlug}
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">QR Code do Cardápio</span>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Compartilhe o QR Code para que os clientes acessem seu cardápio facilmente
              </p>
              <Button variant="outline" size="sm">
                Gerar QR Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Horário de Funcionamento */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horário de Funcionamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {days.map((day) => {
                const daySchedule = settings.schedule[day.key as keyof typeof settings.schedule];
                return (
                  <div key={day.key} className="flex items-center gap-4">
                    <div className="w-32">
                      <span className="text-sm font-medium">{day.label}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={!daySchedule.closed}
                        onCheckedChange={(checked) => handleScheduleChange(day.key, 'closed', !checked)}
                      />
                      <span className="text-sm">Aberto</span>
                    </div>
                    
                    {!daySchedule.closed && (
                      <>
                        <Input
                          type="time"
                          value={daySchedule.open}
                          onChange={(e) => handleScheduleChange(day.key, 'open', e.target.value)}
                          className="w-32"
                        />
                        <span className="text-sm">às</span>
                        <Input
                          type="time"
                          value={daySchedule.close}
                          onChange={(e) => handleScheduleChange(day.key, 'close', e.target.value)}
                          className="w-32"
                        />
                      </>
                    )}
                    
                    {daySchedule.closed && (
                      <Badge variant="outline" className="text-red-600">
                        Fechado
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Pedidos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações de Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Aceitar pedidos online</Label>
              <Switch
                checked={settings.acceptOnlineOrders}
                onCheckedChange={(checked) => setSettings({ ...settings, acceptOnlineOrders: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Aceitar pedidos por mesa</Label>
              <Switch
                checked={settings.acceptTableOrders}
                onCheckedChange={(checked) => setSettings({ ...settings, acceptTableOrders: checked })}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label>Valor mínimo do pedido (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.minOrderValue}
                onChange={(e) => setSettings({ ...settings, minOrderValue: parseFloat(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Taxa de entrega (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={settings.deliveryFee}
                onChange={(e) => setSettings({ ...settings, deliveryFee: parseFloat(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Tempo de entrega (minutos)</Label>
              <Input
                type="number"
                value={settings.deliveryTime}
                onChange={(e) => setSettings({ ...settings, deliveryTime: parseInt(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Pagamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Formas de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Dinheiro</Label>
              <Switch
                checked={settings.acceptCash}
                onCheckedChange={(checked) => setSettings({ ...settings, acceptCash: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Cartão</Label>
              <Switch
                checked={settings.acceptCard}
                onCheckedChange={(checked) => setSettings({ ...settings, acceptCard: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>PIX</Label>
              <Switch
                checked={settings.acceptPix}
                onCheckedChange={(checked) => setSettings({ ...settings, acceptPix: checked })}
              />
            </div>
            
            {settings.acceptPix && (
              <div className="space-y-2">
                <Label>Chave PIX</Label>
                <Input
                  value={settings.pixKey}
                  onChange={(e) => setSettings({ ...settings, pixKey: e.target.value })}
                  placeholder="email@exemplo.com ou telefone"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* WhatsApp */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Integração WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Ativar WhatsApp</Label>
              <Switch
                checked={settings.whatsappEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, whatsappEnabled: checked })}
              />
            </div>
            
            {settings.whatsappEnabled && (
              <div className="space-y-2">
                <Label>Número do WhatsApp</Label>
                <Input
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="5511999999999 (com código do país)"
                />
                <p className="text-sm text-gray-500">
                  Os pedidos serão enviados para este número via WhatsApp
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Botão de Salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};
