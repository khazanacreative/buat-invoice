import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';

interface InvoiceHeaderProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  companyAddress: string;
  setCompanyAddress: (value: string) => void;
  logo: string | null;
  onLogoClick: () => void;
  customerName: string;
  setCustomerName: (value: string) => void;
  customerAddress: string;
  setCustomerAddress: (value: string) => void;
  transactionId: string;
  setTransactionId: (value: string) => void;
  transactionDate: string;
  setTransactionDate: (value: string) => void;
}

export const InvoiceHeader = ({
  companyName,
  setCompanyName,
  companyAddress,
  setCompanyAddress,
  logo,
  onLogoClick,
  customerName,
  setCustomerName,
  customerAddress,
  setCustomerAddress,
  transactionId,
  setTransactionId,
  transactionDate,
  setTransactionDate,
}: InvoiceHeaderProps) => {
  return (
    <div className="space-y-8">
      {/* Company and Logo Row */}
      <div className="flex items-start justify-between relative">
        {/* Company Details */}
        <div className="space-y-2 flex-1">
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Nama Perusahaan"
            className="text-lg font-bold border-none bg-transparent p-0 focus-visible:ring-0"
          />
          <Input
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            placeholder="Alamat Perusahaan"
            className="text-sm border-none bg-transparent p-0 focus-visible:ring-0"
          />
        </div>

        {/* Logo */}
        <div
          onClick={onLogoClick}
          className="dashed-border w-24 h-24 border-2 border-dashed border-muted-foreground/30 rounded-md cursor-pointer bg-muted/50 flex items-center justify-center overflow-hidden hover:bg-muted/70 transition-colors"
        >
          {logo ? (
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          ) : (
            <Upload className="w-6 h-6 text-muted-foreground" />
          )}
        </div>

        {/* Invoice Title - Absolutely positioned in center */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-12">
          <h1 className="text-3xl font-bold text-invoice-primary">INVOICE</h1>
        </div>
      </div>

      {/* Customer and Transaction Details */}
      <div className="flex justify-between items-start">
        {/* Customer Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm min-w-[120px]">Nama Pelanggan:</span>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Masukkan nama pelanggan"
              className="border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 focus-visible:ring-0 focus-visible:border-invoice-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm min-w-[120px]">Alamat:</span>
            <Input
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="Masukkan alamat pelanggan"
              className="border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 focus-visible:ring-0 focus-visible:border-invoice-primary"
            />
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-2 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-end">
            <span className="font-medium text-sm min-w-[100px]">No Transaksi:</span>
            <Input
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 sm:text-right focus-visible:ring-0 focus-visible:border-invoice-primary w-full sm:w-40"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-end">
            <span className="font-medium text-sm min-w-[100px]">Tanggal:</span>
            <Input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className="border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 text-right sm:text-right focus-visible:ring-0 focus-visible:border-invoice-primary w-full sm:w-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};