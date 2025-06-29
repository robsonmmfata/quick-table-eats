
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Upload, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Link as LinkIcon,
  Palette,
  Bell,
  CreditCard
} from 'lucide-react';

export const RestaurantSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Informações Básicas
    name: 'Restaurante Demo',
    description: 'O melhor da culinária brasileira',
    phone: '(11) 99999-9999',
    email: 'contato@restaurante.com',
    address: 'Rua das Flores, 123 - Centro',
    customUrl: 'restaurante-demo',
    
    // Horários
    openingHours: [
      { day: 'Segunda', open: '18:00', close: '23:00', isOpen: true },
      { day: 'Terça', open: '18:00', close: '23:00', isOpen: true },
      { day: 'Quarta', open: '18:00', close: '23:00', isOpen: true },
      { day: 'Quinta', open: '18:00', close: '23:00', isOpen: true },
      { day: 'Sexta', open: '18:00', close: '00:00', isOpen: true },
      { day: 'Sábado', open: '18:00', close: '00:00', isOpen: true },
      { day: 'Domingo', open: '18:00', close: '23:00', isOpen: false },
    ],
    
    // Configurações
    acceptDelivery: true,
    deliveryFee: 5.00,
    minOrderValue: 20.00,
    pixKey: '',
    whatsappNumber: '',
    autoAcceptOrders: false,
    
    // Notificações
    emailNotifications: true,
    whatsappNotifications: false,
    
    // Personalização
    primaryColor: '#3b82f6',
    logo: ''
  });

  const handleSave = () => {
    toast({
      title: 'Configurações salvas!',
      description: 'Suas configurações foram atualizadas com sucesso.',
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fakeUrl = `https://images.unsplash.com/photo-${Date.now()}?w=200&h=200&fit=crop`;
      setSettings({ ...settings, logo: fakeUrl });
      toast({
        title: 'Logo carregada!',
        description: 'A logo do seu restaurante foi atualizada.',
      });
    }
  };

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
              <Settings className="h-5 w-5" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Logo do Restaurante</Label>
              <div className="flex items-center gap-4">
                {settings.logo ? (
                  <img
                    src={settings.logo}
                    alt="Logo"
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" type="button">
                      Alterar Logo
                    </Button>
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome do Restaurante</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <div className="flex">
                  <Phone className="h-4 w-4 text-gray-400 mt-3 ml-3 absolute z-10" />
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex">
                  <Mail className="h-4 w-4 text-gray-400 mt-3 ml-3 absolute z-10" />
                  <Input
                    id="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <div className="flex">
                <MapPin className="h-4 w-4 text-gray-400 mt-3 ml-3 absolute z-10" />
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customUrl">Link Personalizado</Label>
              <div className="flex">
                <LinkIcon className="h-4 w-4 text-gray-400 mt-3 ml-3 absolute z-10" />
                <Input
                  id="customUrl"
                  value={settings.customUrl}
                  onChange={(e) => setSettings({ ...settings, customUrl: e.target.value })}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500">
                Seu cardápio ficará disponível em: <strong>plataforma.com/{settings.customUrl}</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Horário de Funcionamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horário de Funcionamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {settings.openingHours.map((hour, index) => (
              <div key={hour.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={hour.isOpen}
                    onCheckedChange={(checked) => {
                      const newHours = [...settings.openingHours];
                      newHours[index].isOpen = checked;
                      setSettings({ ...settings, openingHours: newHours });
                    }}
                  />
                  <span className="font-medium w-20">{hour.day}</span>
                </div>
                {hour.isOpen ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={hour.open}
                      onChange={(e) => {
                        const newHours = [...settings.openingHours];
                        newHours[index].open = e.target.value;
                        setSettings({ ...settings, openingHours: newHours });
                      }}
                      className="w-20 text-sm"
                    />
                    <span className="text-gray-500">às</span>
                    <Input
                      type="time"
                      value={hour.close}
                      onChange={(e) => {
                        const newHours = [...settings.openingHours];
                        newHours[index].close = e.target.value;
                        setSettings({ ...settings, openingHours: newHours });
                      }}
                      className="w-20 text-sm"
                    />
                  </div>
                ) : (
                  <Badge variant="outline">Fechado</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Delivery e Pagamentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Delivery e Pagamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Aceitar Delivery</Label>
                <p className="text-sm text-gray-500">Permitir pedidos para entrega</p>
              </div>
              <Switch
                checked={settings.acceptDelivery}
                onCheckedChange={(checked) => setSettings({ ...settings, acceptDelivery: checked })}
              />
            </div>

            {settings.acceptDelivery && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryFee">Taxa de Entrega</Label>
                    <Input
                      id="deliveryFee"
                      type="number"
                      step="0.01"
                      value={settings.deliveryFee}
                      onChange={(e) => setSettings({ ...settings, deliveryFee: parseFloat(e.target.value) })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minOrderValue">Pedido Mínimo</Label>
                    <Input
                      id="minOrderValue"
                      type="number"
                      step="0.01"
                      value={settings.minOrderValue}
                      onChange={(e) => setSettings({ ...settings, minOrderValue: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="pixKey">Chave PIX</Label>
              <Input
                id="pixKey"
                placeholder="Sua chave PIX para recebimentos"
                value={settings.pixKey}
                onChange={(e) => setSettings({ ...settings, pixKey: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp (com DDD)</Label>
              <Input
                id="whatsappNumber"
                placeholder="5511999999999"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Aceitar pedidos automaticamente</Label>
                <p className="text-sm text-gray-500">Pedidos são aceitos sem confirmação manual</p>
              </div>
              <Switch
                checked={settings.autoAcceptOrders}
                onCheckedChange={(checked) => setSettings({ ...settings, autoAcceptOrders: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações por Email</Label>
                <p className="text-sm text-gray-500">Receber pedidos por email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Notificações no WhatsApp</Label>
                <p className="text-sm text-gray-500">Receber pedidos no WhatsApp</p>
              </div>
              <Switch
                checked={settings.whatsappNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, whatsappNotifications: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" className="px-8">
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};
