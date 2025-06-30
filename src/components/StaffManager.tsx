
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  DollarSign,
  UserCheck,
  Search,
  ChefHat,
  Coffee
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Staff {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  schedule: string;
  salary: number;
  commission: number;
  avatar?: string;
  joinDate: string;
}

export const StaffManager = () => {
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@restaurante.com',
      phone: '(11) 99999-9999',
      role: 'Garçom',
      status: 'Ativo',
      schedule: 'Manhã',
      salary: 2500,
      commission: 5,
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@restaurante.com',
      phone: '(11) 88888-8888',
      role: 'Cozinheira',
      status: 'Ativo',
      schedule: 'Integral',
      salary: 3500,
      commission: 0,
      joinDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'pedro@restaurante.com',
      phone: '(11) 77777-7777',
      role: 'Garçom',
      status: 'Férias',
      schedule: 'Noite',
      salary: 2500,
      commission: 5,
      joinDate: '2024-01-20'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState<Partial<Staff>>({
    role: 'Garçom',
    status: 'Ativo',
    schedule: 'Manhã',
    commission: 0
  });

  const { toast } = useToast();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Cozinheira':
      case 'Cozinheiro':
        return <ChefHat className="h-4 w-4" />;
      case 'Garçom':
      case 'Garçonete':
        return <Coffee className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ativo':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case 'Inativo':
        return <Badge className="bg-red-100 text-red-800">Inativo</Badge>;
      case 'Férias':
        return <Badge className="bg-yellow-100 text-yellow-800">Férias</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredStaff = staff.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.email || !newStaff.phone) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...staff.map(s => s.id)) + 1;
    const staffMember: Staff = {
      id: newId,
      name: newStaff.name!,
      email: newStaff.email!,
      phone: newStaff.phone!,
      role: newStaff.role!,
      status: newStaff.status!,
      schedule: newStaff.schedule!,
      salary: newStaff.salary || 0,
      commission: newStaff.commission || 0,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setStaff([...staff, staffMember]);
    setNewStaff({ role: 'Garçom', status: 'Ativo', schedule: 'Manhã', commission: 0 });
    setIsAddModalOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Funcionário adicionado com sucesso!"
    });
  };

  const handleDeleteStaff = (id: number) => {
    setStaff(staff.filter(s => s.id !== id));
    toast({
      title: "Sucesso",
      description: "Funcionário removido com sucesso!"
    });
  };

  const toggleStatus = (id: number) => {
    setStaff(staff.map(s => 
      s.id === id 
        ? { ...s, status: s.status === 'Ativo' ? 'Inativo' : 'Ativo' }
        : s
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Gestão de Funcionários</h2>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Funcionário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Funcionário</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome Completo *</Label>
                <Input
                  value={newStaff.name || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={newStaff.email || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="Ex: joao@email.com"
                />
              </div>
              <div>
                <Label>Telefone *</Label>
                <Input
                  value={newStaff.phone || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  placeholder="Ex: (11) 99999-9999"
                />
              </div>
              <div>
                <Label>Função</Label>
                <Select
                  value={newStaff.role}
                  onValueChange={(value) => setNewStaff({ ...newStaff, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Garçom">Garçom</SelectItem>
                    <SelectItem value="Garçonete">Garçonete</SelectItem>
                    <SelectItem value="Cozinheiro">Cozinheiro</SelectItem>
                    <SelectItem value="Cozinheira">Cozinheira</SelectItem>
                    <SelectItem value="Gerente">Gerente</SelectItem>
                    <SelectItem value="Caixa">Caixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Turno</Label>
                <Select
                  value={newStaff.schedule}
                  onValueChange={(value) => setNewStaff({ ...newStaff, schedule: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manhã">Manhã</SelectItem>
                    <SelectItem value="Tarde">Tarde</SelectItem>
                    <SelectItem value="Noite">Noite</SelectItem>
                    <SelectItem value="Integral">Integral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={newStaff.status}
                  onValueChange={(value) => setNewStaff({ ...newStaff, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Férias">Férias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Salário (R$)</Label>
                <Input
                  type="number"
                  value={newStaff.salary || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, salary: Number(e.target.value) })}
                  placeholder="Ex: 2500"
                />
              </div>
              <div>
                <Label>Comissão (%)</Label>
                <Input
                  type="number"
                  value={newStaff.commission || ''}
                  onChange={(e) => setNewStaff({ ...newStaff, commission: Number(e.target.value) })}
                  placeholder="Ex: 5"
                />
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddStaff}>
                Adicionar Funcionário
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Busca e Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Buscar funcionários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Funcionários Ativos</p>
                <p className="text-xl font-bold">{staff.filter(s => s.status === 'Ativo').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Folha de Pagamento</p>
                <p className="text-xl font-bold">
                  R$ {staff.reduce((acc, s) => acc + s.salary, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Funcionários */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionários Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStaff.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    {getRoleIcon(employee.role)}
                  </div>
                  <div>
                    <h4 className="font-medium">{employee.name}</h4>
                    <p className="text-sm text-gray-600">{employee.role} • {employee.schedule}</p>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">R$ {employee.salary.toLocaleString()}</p>
                    {employee.commission > 0 && (
                      <p className="text-sm text-gray-600">{employee.commission}% comissão</p>
                    )}
                  </div>
                  {getStatusBadge(employee.status)}
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" onClick={() => toggleStatus(employee.id)}>
                      <UserCheck className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteStaff(employee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
