import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload } from 'lucide-react'

interface InvoiceHeaderProps {
  companyName: string
  setCompanyName: (value: string) => void
  companyAddress: string
  setCompanyAddress: (value: string) => void
  logo: string | null
  onLogoClick: () => void
  customerName: string
  setCustomerName: (value: string) => void
  customerAddress: string
  setCustomerAddress: (value: string) => void
  transactionId: string
  setTransactionId: (value: string) => void
  transactionDate: string
  setTransactionDate: (value: string) => void
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
      {/* Company + Logo Row */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        {/* Company Info */}
        <div className="space-y-2 w-full sm:w-1/3">
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Nama Perusahaan"
            className="text-lg font-bold border-none bg-transparent p-0 focus-visible:ring-0"
          />
          <Textarea
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            placeholder="Alamat Perusahaan"
            rows={3}
            className="text-sm border-none bg-transparent p-0 focus-visible:ring-0 resize-none"
          />
        </div>

        {/* Logo */}
        <div
          onClick={onLogoClick}
          className="self-center sm:self-start ml-0 sm:ml-4 dashed-border w-24 h-24 border-2 border-dashed border-muted-foreground/30 rounded-md cursor-pointer bg-muted/50 flex items-center justify-center overflow-hidden hover:bg-muted/70 transition-colors"
        >
          {logo ? (
            <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          ) : (
            <Upload className="w-6 h-6 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Invoice Title */}
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold text-invoice-primary">INVOICE</h1>
      </div>

      {/* Customer and Transaction Details */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
        {/* Customer Details */}
        <div className="space-y-1 w-full sm:w-1/2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm min-w-[120px]">Nama Pelanggan:</span>
            <Input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Masukkan nama pelanggan"
              className="h-7 text-sm border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-0 focus-visible:ring-0 focus-visible:border-invoice-primary flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm min-w-[120px]">Alamat:</span>
            <Input
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
              placeholder="Masukkan alamat pelanggan"
              className="h-7 text-sm border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-0 focus-visible:ring-0 focus-visible:border-invoice-primary flex-1"
            />
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-1 w-full sm:w-1/2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-medium text-sm sm:min-w-[120px]">No Transaksi:</span>
            <Input
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="h-7 text-sm border-none border-b border-muted-foreground/30 rounded-none 
                        bg-transparent p-0 focus-visible:ring-0 
                        focus-visible:border-invoice-primary 
                        w-full sm:w-40 text-left sm:text-right"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="font-medium text-sm sm:min-w-[120px]">Tanggal:</span>
            <Input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
              className="h-7 text-sm border-none border-b border-muted-foreground/30 rounded-none 
                        bg-transparent p-0 focus-visible:ring-0 
                        focus-visible:border-invoice-primary 
                        w-full sm:w-40 text-left sm:text-right"
            />
          </div>
        </div>
      </div>
    </div>
  )
}