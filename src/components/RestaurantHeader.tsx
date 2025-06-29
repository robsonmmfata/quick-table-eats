
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Bell, User } from "lucide-react";

export const RestaurantHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              R
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Restaurante Demo</h1>
              <p className="text-gray-600">restaurante-demo.pedido.com</p>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Ativo
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
