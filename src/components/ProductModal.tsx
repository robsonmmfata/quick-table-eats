
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ isOpen, onClose }: ProductModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
        </DialogHeader>
        
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input id="name" placeholder="Ex: Hambúrguer Clássico" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lanches">Lanches</SelectItem>
                <SelectItem value="bebidas">Bebidas</SelectItem>
                <SelectItem value="acompanhamentos">Acompanhamentos</SelectItem>
                <SelectItem value="pizzas">Pizzas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input id="price" placeholder="24,90" type="number" step="0.01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="ativo">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              placeholder="Descreva os ingredientes e características do produto..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">URL da Imagem</Label>
            <Input id="image" placeholder="https://exemplo.com/imagem.jpg" />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Salvar Produto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
