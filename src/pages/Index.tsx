
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  QrCode, 
  Smartphone, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const features = [
    {
      icon: QrCode,
      title: "QR Code por Mesa",
      description: "Cada mesa gera automaticamente um QR Code único para pedidos diretos"
    },
    {
      icon: Smartphone,
      title: "Cardápio Digital",
      description: "Interface moderna e responsiva para todos os dispositivos"
    },
    {
      icon: Clock,
      title: "Pedidos em Tempo Real",
      description: "Acompanhe todos os pedidos com status atualizados instantaneamente"
    },
    {
      icon: TrendingUp,
      title: "Relatórios Completos",
      description: "Análise detalhada de vendas, produtos mais vendidos e desempenho"
    }
  ];

  const testimonials = [
    {
      name: "João Silva",
      restaurant: "Burger House",
      text: "Aumentei 40% nas vendas depois que implementei o sistema de QR Code!",
      rating: 5
    },
    {
      name: "Maria Santos",
      restaurant: "Pizzaria Bella",
      text: "Meus clientes adoram fazer pedidos pelo celular. Super prático!",
      rating: 5
    },
    {
      name: "Carlos Lima",
      restaurant: "Lanchonete Central",
      text: "O painel de pedidos facilitou muito o trabalho da cozinha.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">RestauranteSaaS</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Entrar
            </Button>
            <Button onClick={() => navigate('/register')}>
              Cadastrar Restaurante
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            🚀 Plataforma Completa para Restaurantes
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transforme seu Restaurante com{' '}
            <span className="text-blue-600">QR Code e Pedidos Online</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sistema completo de pedidos digitais, QR Code por mesa, painel administrativo e muito mais. 
            Semelhante ao Pedido.ai e Yooga, mas mais completo e acessível.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="px-8" onClick={() => navigate('/register')}>
              Começar Grátis
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Ver Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tudo que seu Restaurante Precisa
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Uma plataforma completa para digitalizar seu estabelecimento e aumentar suas vendas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-gray-600">Em 3 passos simples, seu restaurante estará online</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cadastre seu Restaurante</h3>
              <p className="text-gray-600">
                Crie sua conta, adicione informações do estabelecimento e personalize seu cardápio
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Configure suas Mesas</h3>
              <p className="text-gray-600">
                Cadastre suas mesas e cada uma ganhará automaticamente um QR Code único
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Receba Pedidos</h3>
              <p className="text-gray-600">
                Clientes escaneiam o QR Code, fazem pedidos e você recebe tudo no painel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            O que nossos Clientes Dizem
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.restaurant}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Planos Transparentes
            </h2>
            <p className="text-gray-600">Escolha o plano ideal para seu estabelecimento</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Gratuito</CardTitle>
                <div className="text-3xl font-bold">R$ 0</div>
                <p className="text-gray-600">por mês</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Até 3 mesas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Cardápio digital</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>QR Code automático</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Painel básico</span>
                </div>
                <Button className="w-full" variant="outline">
                  Começar Grátis
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Mais Popular
              </Badge>
              <CardHeader className="text-center">
                <CardTitle>Básico</CardTitle>
                <div className="text-3xl font-bold">R$ 29</div>
                <p className="text-gray-600">por mês</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Até 15 mesas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Tudo do plano gratuito</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Relatórios avançados</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Integração WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Suporte prioritário</span>
                </div>
                <Button className="w-full">
                  Assinar Básico
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Premium</CardTitle>
                <div className="text-3xl font-bold">R$ 59</div>
                <p className="text-gray-600">por mês</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Mesas ilimitadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Tudo do plano básico</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Multi-estabelecimento</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>API completa</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Domínio personalizado</span>
                </div>
                <Button className="w-full" variant="outline">
                  Assinar Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="text-center p-12">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Revolucionar seu Restaurante?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Junte-se a centenas de restaurantes que já aumentaram suas vendas
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Cadastrar Agora - É Grátis
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Store className="h-6 w-6" />
                <span className="text-lg font-bold">RestauranteSaaS</span>
              </div>
              <p className="text-gray-400">
                A plataforma completa para digitalizar seu restaurante
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <div className="space-y-2 text-gray-400">
                <p>Funcionalidades</p>
                <p>Preços</p>
                <p>Demo</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <div className="space-y-2 text-gray-400">
                <p>Central de Ajuda</p>
                <p>Contato</p>
                <p>WhatsApp</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <div className="space-y-2 text-gray-400">
                <p>Sobre</p>
                <p>Blog</p>
                <p>Termos</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RestauranteSaaS. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
