
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Gift, 
  Star, 
  Trophy, 
  Percent, 
  Plus,
  Users,
  Target,
  TrendingUp,
  Crown,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Customer {
  id: number;
  name: string;
  email: string;
  points: number;
  tier: string;
  totalSpent: number;
  visits: number;
  joinDate: string;
}

interface Reward {
  id: number;
  name: string;
  pointsCost: number;
  type: 'discount' | 'product' | 'cashback';
  value: number;
  description: string;
  active: boolean;
}

export const LoyaltyProgram = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      points: 850,
      tier: 'Ouro',
      totalSpent: 2500,
      visits: 25,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      points: 420,
      tier: 'Prata',
      totalSpent: 1200,
      visits: 12,
      joinDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      points: 150,
      tier: 'Bronze',
      totalSpent: 450,
      visits: 5,
      joinDate: '2024-03-10'
    }
  ]);

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 1,
      name: '10% de Desconto',
      pointsCost: 100,
      type: 'discount',
      value: 10,
      description: '10% de desconto na próxima compra',
      active: true
    },
    {
      id: 2,
      name: 'Hambúrguer Grátis',
      pointsCost: 300,
      type: 'product',
      value: 25,
      description: 'Hambúrguer clássico gratuito',
      active: true
    },
    {
      id: 3,
      name: 'Cashback R$ 20',
      pointsCost: 500,
      type: 'cashback',
      value: 20,
      description: 'R$ 20 de volta na conta',
      active: true
    }
  ]);

  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [newReward, setNewReward] = useState<Partial<Reward>>({
    type: 'discount',
    active: true
  });

  const { toast } = useToast();

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Ouro':
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'Prata':
        return <Trophy className="h-4 w-4 text-gray-600" />;
      case 'Bronze':
        return <Star className="h-4 w-4 text-orange-600" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Ouro':
        return 'bg-yellow-100 text-yellow-800';
      case 'Prata':
        return 'bg-gray-100 text-gray-800';
      case 'Bronze':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <Percent className="h-4 w-4" />;
      case 'product':
        return <Gift className="h-4 w-4" />;
      case 'cashback':
        return <Zap className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };

  const handleAddReward = () => {
    if (!newReward.name || !newReward.pointsCost || !newReward.value) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...rewards.map(r => r.id)) + 1;
    const reward: Reward = {
      id: newId,
      name: newReward.name!,
      pointsCost: newReward.pointsCost!,
      type: newReward.type as 'discount' | 'product' | 'cashback',
      value: newReward.value!,
      description: newReward.description || '',
      active: newReward.active || true
    };

    setRewards([...rewards, reward]);
    setNewReward({ type: 'discount', active: true });
    setIsRewardModalOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Recompensa adicionada com sucesso!"
    });
  };

  const toggleReward = (id: number) => {
    setRewards(rewards.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  const totalCustomers = customers.length;
  const totalPoints = customers.reduce((acc, c) => acc + c.points, 0);
  const avgPointsPerCustomer = Math.round(totalPoints / totalCustomers);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gift className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Programa de Fidelidade</h2>
        </div>
        <Dialog open={isRewardModalOpen} onOpenChange={setIsRewardModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Recompensa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Recompensa</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nome da Recompensa *</Label>
                <Input
                  value={newReward.name || ''}
                  onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                  placeholder="Ex: 10% de Desconto"
                />
              </div>
              <div>
                <Label>Tipo de Recompensa</Label>
                <Select
                  value={newReward.type}
                  onValueChange={(value) => setNewReward({ ...newReward, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">Desconto (%)</SelectItem>
                    <SelectItem value="product">Produto Grátis</SelectItem>
                    <SelectItem value="cashback">Cashback (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Custo em Pontos *</Label>
                  <Input
                    type="number"
                    value={newReward.pointsCost || ''}
                    onChange={(e) => setNewReward({ ...newReward, pointsCost: Number(e.target.value) })}
                    placeholder="Ex: 100"
                  />
                </div>
                <div>
                  <Label>Valor *</Label>
                  <Input
                    type="number"
                    value={newReward.value || ''}
                    onChange={(e) => setNewReward({ ...newReward, value: Number(e.target.value) })}
                    placeholder="Ex: 10"
                  />
                </div>
              </div>
              <div>
                <Label>Descrição</Label>
                <Input
                  value={newReward.description || ''}
                  onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                  placeholder="Descrição da recompensa"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsRewardModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddReward}>
                Adicionar Recompensa
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Clientes Cadastrados</p>
                <p className="text-xl font-bold">{totalCustomers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Total de Pontos</p>
                <p className="text-xl font-bold">{totalPoints.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Média por Cliente</p>
                <p className="text-xl font-bold">{avgPointsPerCustomer}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Recompensas Ativas</p>
                <p className="text-xl font-bold">{rewards.filter(r => r.active).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clientes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer, index) => (
                <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.visits} visitas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getTierColor(customer.tier)}>
                        {getTierIcon(customer.tier)}
                        {customer.tier}
                      </Badge>
                    </div>
                    <p className="font-bold text-yellow-600">{customer.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recompensas */}
        <Card>
          <CardHeader>
            <CardTitle>Recompensas Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      {getRewardIcon(reward.type)}
                    </div>
                    <div>
                      <p className="font-medium">{reward.name}</p>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{reward.pointsCost} pts</p>
                    <Badge variant={reward.active ? "default" : "secondary"}>
                      {reward.active ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
