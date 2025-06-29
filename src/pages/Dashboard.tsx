import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RestaurantHeader } from '@/components/RestaurantHeader';
import { StatsCards } from '@/components/StatsCards';
import { TablesGrid } from '@/components/TablesGrid';
import { OrdersPanel } from '@/components/OrdersPanel';
import { ProductsManager } from '@/components/ProductsManager';
import { RestaurantSettings } from '@/components/RestaurantSettings';
import { SuperAdminPanel } from '@/components/SuperAdminPanel';
import { Button } from '@/components/ui/button';
import { QrCode, ShoppingCart, ChefHat, Settings, TrendingUp, Crown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp as TrendingUpIcon } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    if (user?.role === 'superadmin') {
      return <SuperAdminPanel />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <StatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Pedidos Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Mesa {i + 5}</p>
                          <p className="text-sm text-gray-600">2x Hambúrguer + 1x Coca-Cola</p>
                        </div>
                        <Badge variant="outline">Em preparo</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUpIcon className="h-5 w-5" />
                    Produtos Mais Vendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Hambúrguer Clássico", "Batata Frita", "Coca-Cola"].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span>{item}</span>
                        <span className="text-sm text-gray-600">{15 - i * 3} vendas hoje</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'mesas':
        return <TablesGrid />;
      case 'pedidos':
        return <OrdersPanel />;
      case 'produtos':
        return <ProductsManager />;
      case 'configuracoes':
        return <RestaurantSettings />;
      default:
        return null;
    }
  };

  const getTabsForUser = () => {
    if (user?.role === 'superadmin') {
      return [
        { id: 'admin', label: 'Super Admin', icon: Crown },
      ];
    }

    return [
      { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
      { id: 'mesas', label: 'Mesas', icon: QrCode },
      { id: 'pedidos', label: 'Pedidos', icon: ShoppingCart },
      { id: 'produtos', label: 'Produtos', icon: ChefHat },
      { id: 'configuracoes', label: 'Configurações', icon: Settings },
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <RestaurantHeader />
      
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        {user?.role !== 'superadmin' && (
          <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-lg shadow-sm">
            {getTabsForUser().map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? 'default' : 'ghost'}
                onClick={() => setActiveTab(id)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
