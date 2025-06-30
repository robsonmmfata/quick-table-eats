
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Palette, 
  Bell, 
  Shield,
  CreditCard,
  Users,
  Save
} from 'lucide-react';

export const RestaurantSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Informações Básicas
    name: 'Meu Restaurante',
    description: 'O melhor restaurante da cidade',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 99999-9999',
    email: 'contato@meurestaurante.com',
    website: 'https://meurestaurante.com',
    
    // Horário de Funcionamento
    openingHours: {
      monday: { open: '08:00', close: '22:00', closed: false },
      tuesday: { open: '08:00', close: '22:00', closed: false },
      wednesday: { open: '08:00', close: '22:00', closed: false },
      thursday: { open: '08:00', close: '22:00', closed: false },
      friday: { open: '08:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '20:00', closed: false }
    },
    
    // Configurações do Cardápio
    currency: 'BRL',
    taxRate: 10,
    serviceCharge: 10,
    allowDelivery: true,
    deliveryFee: 5.00,
    minOrderValue: 20.00,
    
    // Notificações
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderNotifications: true,
    paymentNotifications: true,
    
    // Aparência
    primaryColor: '#3b82f6',
    logo: '',
    coverImage: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop',
    
    // Segurança
    twoFactorAuth: false,
    sessionTimeout: 30,
    allowRemoteAccess: true
  });

  const handleSave = (section: string) => {
    toast({
      title: "Configurações salvas",
      description: `As configurações de ${section} foram salvas com sucesso.`
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const daysOfWeek = [
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
        <h2 className="text-2xl font-bold">Configurações</h2>
        <p className="text-gray-600">Gerencie as configurações do seu restaurante</p>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="hours">Horários</TabsTrigger>
          <TabsTrigger value="menu">Cardápio</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome do Restaurante</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={settings.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={settings.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('informações básicas')} className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hours">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horário de Funcionamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {daysOfWeek.map(({ key, label }) => (
                <div key={key} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-32">
                    <span className="font-medium">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={!settings.openingHours[key as keyof typeof settings.openingHours].closed}
                      onCheckedChange={(checked) => {
                        setSettings(prev => ({
                          ...prev,
                          openingHours: {
                            ...prev.openingHours,
                            [key]: { ...prev.openingHours[key as keyof typeof prev.openingHours], closed: !checked }
                          }
                        }));
                      }}
                    />
                    <span className="text-sm">Aberto</span>
                  </div>
                  {!settings.openingHours[key as keyof typeof settings.openingHours].closed && (
                    <>
                      <Input
                        type="time"
                        value={settings.openingHours[key as keyof typeof settings.openingHours].open}
                        onChange={(e) => {
                          setSettings(prev => ({
                            ...prev,
                            openingHours: {
                              ...prev.openingHours,
                              [key]: { ...prev.openingHours[key as keyof typeof prev.openingHours], open: e.target.value }
                            }
                          }));
                        }}
                        className="w-24"
                      />
                      <span>às</span>
                      <Input
                        type="time"
                        value={settings.openingHours[key as keyof typeof settings.openingHours].close}
                        onChange={(e) => {
                          setSettings(prev => ({
                            ...prev,
                            openingHours: {
                              ...prev.openingHours,
                              [key]: { ...prev.openingHours[key as keyof typeof prev.openingHours], close: e.target.value }
                            }
                          }));
                        }}
                        className="w-24"
                      />
                    </>
                  )}
                </div>
              ))}

              <Button onClick={() => handleSave('horários')} className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Horários
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Configurações do Cardápio
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="currency">Moeda</Label>
                  <Select value={settings.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real (R$)</SelectItem>
                      <SelectItem value="USD">Dólar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="taxRate">Taxa de Imposto (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleInputChange('taxRate', parseFloat(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="serviceCharge">Taxa de Serviço (%)</Label>
                  <Input
                    id="serviceCharge"
                    type="number"
                    value={settings.serviceCharge}
                    onChange={(e) => handleInputChange('serviceCharge', parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="allowDelivery"
                  checked={settings.allowDelivery}
                  onCheckedChange={(checked) => handleInputChange('allowDelivery', checked)}
                />
                <Label htmlFor="allowDelivery">Permitir Delivery</Label>
              </div>

              {settings.allowDelivery && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                  <div>
                    <Label htmlFor="deliveryFee">Taxa de Entrega (R$)</Label>
                    <Input
                      id="deliveryFee"
                      type="number"
                      step="0.01"
                      value={settings.deliveryFee}
                      onChange={(e) => handleInputChange('deliveryFee', parseFloat(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="minOrderValue">Pedido Mínimo (R$)</Label>
                    <Input
                      id="minOrderValue"
                      type="number"
                      step="0.01"
                      value={settings.minOrderValue}
                      onChange={(e) => handleInputChange('minOrderValue', parseFloat(e.target.value))}
                    />
                  </div>
                </div>
              )}

              <Button onClick={() => handleSave('cardápio')} className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Notificações por Email</Label>
                    <p className="text-sm text-gray-500">Receba alertas importantes por email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">Notificações por SMS</Label>
                    <p className="text-sm text-gray-500">Receba alertas urgentes por SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleInputChange('smsNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Notificações em tempo real no navegador</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderNotifications">Notificações de Pedidos</Label>
                    <p className="text-sm text-gray-500">Alertas para novos pedidos</p>
                  </div>
                  <Switch
                    id="orderNotifications"
                    checked={settings.orderNotifications}
                    onCheckedChange={(checked) => handleInputChange('orderNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="paymentNotifications">Notificações de Pagamento</Label>
                    <p className="text-sm text-gray-500">Alertas para pagamentos recebidos</p>
                  </div>
                  <Switch
                    id="paymentNotifications"
                    checked={settings.paymentNotifications}
                    onCheckedChange={(checked) => handleInputChange('paymentNotifications', checked)}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave('notificações')} className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência e Personalização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="primaryColor">Cor Principal</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="logo">URL do Logo</Label>
                <Input
                  id="logo"
                  value={settings.logo}
                  onChange={(e) => handleInputChange('logo', e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>

              <div>
                <Label htmlFor="coverImage">Imagem de Capa</Label>
                <Input
                  id="coverImage"
                  value={settings.coverImage}
                  onChange={(e) => handleInputChange('coverImage', e.target.value)}
                  placeholder="URL da imagem de capa"
                />
                {settings.coverImage && (
                  <div className="mt-2">
                    <img
                      src={settings.coverImage}
                      alt="Preview da capa"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <Button onClick={() => handleSave('aparência')} className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Aparência
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleInputChange('twoFactorAuth', checked)}
                />
              </div>

              <div>
                <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleInputChange('sessionTimeout', parseInt(e.target.value))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowRemoteAccess">Permitir Acesso Remoto</Label>
                  <p className="text-sm text-gray-500">Acesso de dispositivos externos</p>
                </div>
                <Switch
                  id="allowRemoteAccess"
                  checked={settings.allowRemoteAccess}
                  onCheckedChange={(checked) => handleInputChange('allowRemoteAccess', checked)}
                />
              </div>

              <Button onClick={() => handleSave('segurança')} className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
