import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { InvoiceItem } from './Invoice';

interface InvoiceTableProps {
  items: InvoiceItem[];
  onDeleteItem: (id: string) => void;
  totalAmount: number;
}

export const InvoiceTable = ({ items, onDeleteItem, totalAmount }: InvoiceTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="my-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-invoice-table-header text-invoice-primary-foreground">
            <th className="border border-invoice-border p-3 text-left font-medium">NO.</th>
            <th className="border border-invoice-border p-3 text-left font-medium">NAMA BARANG / JASA</th>
            <th className="border border-invoice-border p-3 text-left font-medium">QTY.</th>
            <th className="border border-invoice-border p-3 text-left font-medium">HARGA (Rp)</th>
            <th className="border border-invoice-border p-3 text-left font-medium">JUMLAH</th>
            <th className="border border-invoice-border p-3 text-left font-medium">KET.</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className="border border-invoice-border p-8 text-center text-muted-foreground">
                Belum ada item. Klik "Tambah Item" untuk menambahkan.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? 'bg-invoice-table-row-odd' : 'bg-invoice-table-row-even'}
              >
                <td className="border border-invoice-border p-3">{index + 1}</td>
                <td className="border border-invoice-border p-3 font-medium">{item.name}</td>
                <td className="border border-invoice-border p-3 text-center">{item.quantity}</td>
                <td className="border border-invoice-border p-3 text-right">
                  {formatCurrency(item.price)}
                </td>
                <td className="border border-invoice-border p-3 text-right font-medium">
                  {formatCurrency(item.total)}
                </td>
                <td className="border border-invoice-border p-3 text-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDeleteItem(item.id)}
                    className="no-print h-7 w-7 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  {item.description && (
                    <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr className="bg-invoice-secondary">
            <td colSpan={4} className="border border-invoice-border p-3 text-right font-bold">
              TOTAL
            </td>
            <td className="border border-invoice-border p-3 text-right font-bold text-invoice-primary">
              {formatCurrency(totalAmount)}
            </td>
            <td className="border border-invoice-border p-3"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};