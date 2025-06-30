
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  AlertTriangle, 
  ShoppingCart,
  Users,
  Package,
  CreditCard,
  Settings,
  Check,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: number;
  type: 'order' | 'payment' | 'stock' | 'customer';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'Novo Pedido',
      message: 'Mesa 5 - Hambúrguer + Batata Frita',
      time: '2 min atrás',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'stock',
      title: 'Estoque Baixo',
      message: 'Hambúrguer - Apenas 5 unidades restantes',
      time: '15 min atrás',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Pagamento Aprovado',
      message: 'Mesa 3 - R$ 89,50 via PIX',
      time: '1 hora atrás',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'customer',
      title: 'Nova Avaliação',
      message: 'Cliente deixou 5 estrelas',
      time: '2 horas atrás',
      read: true,
      priority: 'low'
    }
  ]);

  const [settings, setSettings] = useState({
    newOrders: true,
    payments: true,
    stockAlerts: true,
    customerReviews: false,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  const { toast } = useToast();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="h-4 w-4" />;
      case 'payment':
        return <CreditCard className="h-4 w-4" />;
      case 'stock':
        return <Package className="h-4 w-4" />;
      case 'customer':
        return <Users className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "Sucesso",
      description: "Todas as notificações foram marcadas como lidas."
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Central de Notificações</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount}</Badge>
          )}
        </div>
        <Button onClick={markAllAsRead} variant="outline" size="sm">
          Marcar todas como lidas
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Notificações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-l-4 rounded-r-lg ${getPriorityColor(notification.priority)} ${
                      !notification.read ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white rounded-full">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Tipos de Notificação</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newOrders">Novos Pedidos</Label>
                    <Switch
                      id="newOrders"
                      checked={settings.newOrders}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, newOrders: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="payments">Pagamentos</Label>
                    <Switch
                      id="payments"
                      checked={settings.payments}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, payments: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="stockAlerts">Alertas de Estoque</Label>
                    <Switch
                      id="stockAlerts"
                      checked={settings.stockAlerts}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, stockAlerts: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="customerReviews">Avaliações</Label>
                    <Switch
                      id="customerReviews"
                      checked={settings.customerReviews}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, customerReviews: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Canais de Notificação</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifications" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Switch
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="smsNotifications" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      SMS
                    </Label>
                    <Switch
                      id="smsNotifications"
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, smsNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNotifications" className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      Push
                    </Label>
                    <Switch
                      id="pushNotifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, pushNotifications: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
