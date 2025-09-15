import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Package } from 'lucide-react';
import { CatalogItem } from './InvoiceApp';
import { useToast } from '@/hooks/use-toast';

interface ItemCatalogProps {
  items: CatalogItem[];
  onAddItem: (item: Omit<CatalogItem, 'id'>) => void;
  onDeleteItem: (id: string) => void;
}

export const ItemCatalog = ({ items, onAddItem, onDeleteItem }: ItemCatalogProps) => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !price) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon isi nama item dan harga",
        variant: "destructive",
      });
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      toast({
        title: "Harga tidak valid",
        description: "Mohon masukkan harga yang valid",
        variant: "destructive",
      });
      return;
    }

    onAddItem({
      name,
      price: priceNum,
      description: description || undefined,
    });

    // Reset form
    setName('');
    setPrice('');
    setDescription('');
    setShowForm(false);
    
    toast({
      title: "Item ditambahkan",
      description: "Item berhasil ditambahkan ke katalog",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="no-print">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="w-5 h-5 text-invoice-primary" />
              Katalog Item
            </CardTitle>
            <CardDescription>
              Kelola daftar barang/jasa untuk mempercepat pembuatan invoice
            </CardDescription>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            className="bg-success hover:bg-success/90 text-success-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showForm ? 'Tutup' : 'Tambah Item'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-invoice-secondary/50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="catalog-name">Nama Item</Label>
                <Input
                  id="catalog-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Konsultasi IT"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="catalog-price">Harga (Rp)</Label>
                <Input
                  id="catalog-price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Contoh: 500000"
                  min="0"
                  step="1000"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="catalog-description">Deskripsi (Opsional)</Label>
              <Textarea
                id="catalog-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deskripsi detail tentang item..."
                rows={2}
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                Simpan Item
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowForm(false)}>
                Batal
              </Button>
            </div>
          </form>
        )}

        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Belum ada item di katalog</p>
            <p className="text-sm">Tambahkan item untuk mempercepat pembuatan invoice</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3 border border-invoice-border rounded-lg bg-card hover:bg-invoice-secondary/30 transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-invoice-primary font-semibold text-sm">
                      {formatCurrency(item.price)}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDeleteItem(item.id)}
                    className="h-7 w-7 p-0 flex-shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};