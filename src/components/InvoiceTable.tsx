import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { InvoiceItem } from './Invoice';

interface InvoiceTableProps {
  items: InvoiceItem[];
  onDeleteItem: (id: string) => void;
  totalAmount: number;
  themeColor: string; // 🔹 tambahan
}

export const InvoiceTable = ({ items, onDeleteItem, totalAmount, themeColor }: InvoiceTableProps) => {
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
          <tr
            style={{ backgroundColor: themeColor, color: "white" }} // 🔹 Header ikut tema
          >
            <th className="border border-invoice-border p-2 lg:p-3 text-left font-medium text-xs lg:text-sm">NO.</th>
            <th className="border border-invoice-border p-2 lg:p-3 text-left font-medium text-xs lg:text-sm">NAMA BARANG / JASA</th>
            <th className="border border-invoice-border p-2 lg:p-3 text-left font-medium text-xs lg:text-sm">QTY.</th>
            <th className="border border-invoice-border p-2 lg:p-3 text-left font-medium text-xs lg:text-sm">HARGA (Rp)</th>
            <th className="border border-invoice-border p-2 lg:p-3 text-left font-medium text-xs lg:text-sm">JUMLAH</th>
            <th className="border border-invoice-border p-2 lg:p-3 text-left font-medium text-xs lg:text-sm">KET.</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="border border-invoice-border p-6 lg:p-8 text-center text-muted-foreground text-sm"
              >
                Belum ada item. Klik "Tambah Item" untuk menambahkan.
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? 'bg-invoice-table-row-odd' : 'bg-invoice-table-row-even'}
              >
                <td className="border border-invoice-border p-2 lg:p-3 text-sm">{index + 1}</td>
                <td className="border border-invoice-border p-2 lg:p-3 font-medium text-sm">{item.name}</td>
                <td className="border border-invoice-border p-2 lg:p-3 text-center text-sm">{item.quantity}</td>
                <td className="border border-invoice-border p-2 lg:p-3 text-right text-sm">
                  {formatCurrency(item.price)}
                </td>
                <td className="border border-invoice-border p-2 lg:p-3 text-right font-medium text-sm">
                  {formatCurrency(item.total)}
                </td>
                <td className="border border-invoice-border p-2 lg:p-3 text-center">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDeleteItem(item.id)}
                    className="no-print h-6 w-6 lg:h-7 lg:w-7 p-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  {item.description && (
                    <div className="text-xs text-muted-foreground mt-1 hidden lg:block">{item.description}</div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr
            style={{ backgroundColor: themeColor, opacity: 0.3 }} // 🔹 Grand total bar versi muda
          >
            <td
              colSpan={4}
              className="border border-invoice-border p-2 lg:p-3 text-right font-bold text-sm lg:text-base"
            >
              TOTAL
            </td>
            <td
              className="border border-invoice-border p-2 lg:p-3 text-right font-bold text-sm lg:text-base"
              style={{ color: themeColor }} // 🔹 Angka total pakai warna solid
            >
              {formatCurrency(totalAmount)}
            </td>
            <td className="border border-invoice-border p-2 lg:p-3"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
