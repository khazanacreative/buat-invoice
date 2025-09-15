import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { InvoiceItem } from './Invoice';

interface AddItemFormProps {
  onAddItem: (item: Omit<InvoiceItem, 'id'>) => void;
}

export const AddItemForm = ({ onAddItem }: AddItemFormProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !quantity || !price) {
      return;
    }

    const quantityNum = parseInt(quantity);
    const priceNum = parseFloat(price);

    onAddItem({
      name,
      quantity: quantityNum,
      price: priceNum,
      total: quantityNum * priceNum,
      description: description || undefined,
    });

    // Reset form
    setName('');
    setQuantity('');
    setPrice('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          step="0.01"
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
      
      <div className="md:col-span-2 lg:col-span-4 flex justify-end">
        <Button type="submit" className="bg-success hover:bg-success/90 text-success-foreground">
          Tambah Item
        </Button>
      </div>
    </form>
  );
};