import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InvoiceItem } from './Invoice';
import { CatalogItem } from './InvoiceApp';
import { useToast } from '@/hooks/use-toast';

interface AddItemFormProps {
  onAddItem: (item: Omit<InvoiceItem, 'id'>) => void;
  catalogItems: CatalogItem[];
}

export const AddItemForm = ({ onAddItem, catalogItems }: AddItemFormProps) => {
  const { toast } = useToast();
  const [selectedCatalogItem, setSelectedCatalogItem] = useState<string>('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleCatalogSelect = (catalogId: string) => {
    if (catalogId === 'manual') {
      setSelectedCatalogItem('manual');
      setName('');
      setPrice('');
      setDescription('');
      return;
    }

    const catalogItem = catalogItems.find(item => item.id === catalogId);
    if (catalogItem) {
      setSelectedCatalogItem(catalogId);
      setName(catalogItem.name);
      setPrice(catalogItem.price.toString());
      setDescription(catalogItem.description || '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !quantity || !price) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon isi semua field yang diperlukan",
        variant: "destructive",
      });
      return;
    }

    const quantityNum = parseInt(quantity);
    const priceNum = parseFloat(price);

    if (isNaN(quantityNum) || quantityNum <= 0) {
      toast({
        title: "Jumlah tidak valid",
        description: "Mohon masukkan jumlah yang valid",
        variant: "destructive",
      });
      return;
    }

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
      quantity: quantityNum,
      price: priceNum,
      total: quantityNum * priceNum,
      description: description || undefined,
    });

    // Reset form
    setSelectedCatalogItem('');
    setName('');
    setQuantity('');
    setPrice('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Catalog Selection */}
      {catalogItems.length > 0 && (
        <div className="space-y-2">
          <Label htmlFor="catalog-select">Pilih dari Katalog (Opsional)</Label>
          <Select value={selectedCatalogItem} onValueChange={handleCatalogSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih item dari katalog atau isi manual" />
            </SelectTrigger>
            <SelectContent className="bg-card border border-invoice-border">
              <SelectItem value="manual">Input Manual</SelectItem>
              {catalogItems.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  <div className="flex justify-between items-center w-full">
                    <span>{item.name}</span>
                    <span className="text-invoice-primary font-semibold ml-4">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(item.price)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="item-name">Nama Barang/Jasa</Label>
          <Input
            id="item-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama item"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="item-quantity">Jumlah</Label>
          <Input
            id="item-quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Qty"
            min="1"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="item-price">Harga (Rp)</Label>
          <Input
            id="item-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Harga satuan"
            min="0"
            step="1000"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="item-description">Keterangan (Opsional)</Label>
          <Textarea
            id="item-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi tambahan"
            rows={2}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" className="bg-success hover:bg-success/90 text-success-foreground">
          Tambah Item
        </Button>
      </div>
    </form>
  );
};