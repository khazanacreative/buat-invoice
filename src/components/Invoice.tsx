import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { InvoiceHeader } from './InvoiceHeader';
import { InvoiceTable } from './InvoiceTable';
import { InvoiceFooter } from './InvoiceFooter';
import { AddItemForm } from './AddItemForm';
import { CatalogItem } from './InvoiceApp';
import { Printer, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
  description?: string;
}

export const Invoice = ({ catalogItems }: { catalogItems: CatalogItem[] }) => {
  const { toast } = useToast();
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [transactionId, setTransactionId] = useState('02/INV/JAN/2025');
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0]);
  const [bankAccounts, setBankAccounts] = useState<{
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  }[]>([
    { bankName: '', accountNumber: '', accountHolder: '' }
  ]);
  const [notes, setNotes] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);

  const handleAddItem = (item: Omit<InvoiceItem, 'id'>) => {
    const newItem: InvoiceItem = {
      ...item,
      id: Date.now().toString(),
      total: item.quantity * item.price,
    };
    setItems([...items, newItem]);
    setShowAddForm(false);
    toast({
      title: "Item ditambahkan",
      description: "Item berhasil ditambahkan ke invoice",
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item dihapus",
      description: "Item berhasil dihapus dari invoice",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setSignature(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="space-y-4">
      {/* Invoice Container */}
      <div className="invoice-container bg-card border-2 border-invoice-border rounded-lg p-2 lg:p-4 max-w-4xl mx-auto relative overflow-x-auto">
        {/* Header */}
        <InvoiceHeader
          companyName={companyName}
          setCompanyName={setCompanyName}
          companyAddress={companyAddress}
          setCompanyAddress={setCompanyAddress}
          logo={logo}
          onLogoClick={() => logoInputRef.current?.click()}
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerAddress={customerAddress}
          setCustomerAddress={setCustomerAddress}
          transactionId={transactionId}
          setTransactionId={setTransactionId}
          transactionDate={transactionDate}
          setTransactionDate={setTransactionDate}
        />

        {/* Tabel Invoice */}
        <div className="pt-2 lg:pt-3">
          <InvoiceTable
            items={items}
            onDeleteItem={handleDeleteItem}
            totalAmount={totalAmount}
          />
        </div>

        {/* Katalog Item - pindah ke sini */}
        {showAddForm && (
          <div className="no-print bg-card border rounded-lg p-4 lg:p-6 mt-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold">Tambah Item Baru</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddForm(false)}
              >
                Tutup
              </Button>
            </div>
            <AddItemForm
              onAddItem={handleAddItem}
              catalogItems={catalogItems}
            />
          </div>
        )}

        {/* Footer */}
        <InvoiceFooter
          bankAccounts={bankAccounts}
          setBankAccounts={setBankAccounts}
          notes={notes}
          setNotes={setNotes}
          signature={signature}
          onSignatureClick={() => signatureInputRef.current?.click()}
          signatureName={signatureName}
          setSignatureName={setSignatureName}
        />
      </div>

      {/* Tombol Aksi */}
      <div className="no-print flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-success hover:bg-success/90 text-success-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showAddForm ? 'Tutup Form' : 'Tambah Item'}
        </Button>
        <Button onClick={handlePrint} variant="outline">
          <Printer className="w-4 h-4 mr-2" />
          Cetak PDF
        </Button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={logoInputRef}
        type="file"
        accept="image/*"
        onChange={handleLogoUpload}
        className="hidden"
      />
      <input
        ref={signatureInputRef}
        type="file"
        accept="image/*"
        onChange={handleSignatureUpload}
        className="hidden"
      />
    </div>
  );
};