
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Package } from "lucide-react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}

export const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const { toast } = useToast();
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || "",
    description: product?.description || "",
    image: product?.image || "",
    active: product?.active ?? true,
  });

  const categories = ["Lanches", "Acompanhamentos", "Bebidas", "Pizzas", "Sobremesas", "Pratos Principais"];

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, categoria e preço do produto.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: isEditing ? "Produto atualizado!" : "Produto criado!",
      description: `O produto "${formData.name}" foi ${isEditing ? "atualizado" : "criado"} com sucesso.`,
    });
    onClose();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Aqui você faria o upload da imagem para seu servidor
      // Por enquanto, vamos usar uma URL fictícia
      const fakeUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=300&fit=crop`;
      setFormData({ ...formData, image: fakeUrl });
      
      toast({
        title: "Imagem carregada!",
        description: "A imagem do produto foi carregada com sucesso.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Nome do Produto */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Hambúrguer Clássico"
            />
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Preço */}
          <div className="space-y-2">
            <Label htmlFor="price">Preço *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva os ingredientes e características do produto"
              rows={3}
            />
          </div>

          {/* Upload de Imagem */}
          <div className="space-y-2">
            <Label htmlFor="image">Imagem do Produto</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {formData.image ? (
                <div className="text-center">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
                  />
                  <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, image: "" })}>
                    Remover Imagem
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Clique para fazer upload da imagem</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" type="button">
                      Escolher Arquivo
                    </Button>
                  </Label>
                </div>
              )}
            </div>
          </div>

          {/* Status Ativo */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="active">Produto Ativo</Label>
              <p className="text-sm text-gray-500">
                Produtos inativos não aparecem no cardápio
              </p>
            </div>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
          </div>

          {/* Botões */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="flex-1" onClick={handleSave}>
              {isEditing ? "Atualizar" : "Criar"} Produto
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
