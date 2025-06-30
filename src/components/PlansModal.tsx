
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  icon: any;
  popular?: boolean;
  color: string;
}

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlansModal = ({ isOpen, onClose }: PlansModalProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Básico',
      price: 29.90,
      icon: Star,
      color: 'bg-blue-500',
      features: [
        'Até 5 mesas',
        'Cardápio digital',
        'QR Code para mesas',
        'Relatórios básicos',
        'Suporte por email'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 59.90,
      icon: Crown,
      color: 'bg-purple-500',
      popular: true,
      features: [
        'Até 20 mesas',
        'Cardápio digital avançado',
        'QR Code personalizado',
        'Analytics completo',
        'Gestão de funcionários',
        'Integração delivery',
        'Sistema de fidelidade',
        'Suporte prioritário'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99.90,
      icon: Zap,
      color: 'bg-orange-500',
      features: [
        'Mesas ilimitadas',
        'Multi-restaurantes',
        'Subdomínio personalizado',
        'API completa',
        'Gestão de estoque',
        'Sistema de reservas',
        'White label',
        'Suporte 24/7',
        'Gerente de conta'
      ]
    }
  ];

  const handleSubscribe = async (planId: string) => {
    if (!user) return;
    
    setLoading(planId);
    try {
      // Integração com Mercado Pago
      const response = await fetch('/api/mercadopago/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          planId,
          userEmail: user.email,
          userId: user.id
        })
      });

      const data = await response.json();
      
      if (data.init_point) {
        // Redirecionar para o Mercado Pago
        window.open(data.init_point, '_blank');
        onClose();
      } else {
        throw new Error('Erro ao criar assinatura');
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao processar pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Escolha seu Plano
          </DialogTitle>
          <DialogDescription className="text-center">
            Selecione o plano ideal para seu restaurante
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card key={plan.id} className={`relative ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500">
                    Mais Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    R$ {plan.price.toFixed(2)}
                    <span className="text-sm font-normal text-gray-500">/mês</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {loading === plan.id ? 'Processando...' : 'Assinar Agora'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>✓ Todos os planos incluem 7 dias grátis</p>
          <p>✓ Cancele a qualquer momento</p>
          <p>✓ Pagamento seguro via Mercado Pago</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
