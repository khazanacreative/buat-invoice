import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

interface InvoiceFooterProps {
  bankName: string;
  setBankName: (value: string) => void;
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  accountHolder: string;
  setAccountHolder: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  signature: string | null;
  onSignatureClick: () => void;
  signatureName: string;
  setSignatureName: (value: string) => void;
}

export const InvoiceFooter = ({
  bankName,
  setBankName,
  accountNumber,
  setAccountNumber,
  accountHolder,
  setAccountHolder,
  notes,
  setNotes,
  signature,
  onSignatureClick,
  signatureName,
  setSignatureName,
}: InvoiceFooterProps) => {
  return (
    <div className="flex justify-between items-start gap-8 mt-8">
      {/* Notes Section */}
      <div className="flex-1 space-y-4">
        <div>
          <p className="font-medium text-sm mb-2">
            <strong>NB:</strong> Silahkan melakukan pembayaran melalui transfer ke:
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Bank"
              className="w-20 border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 focus-visible:ring-0 focus-visible:border-invoice-primary"
            />
            <Input
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="No. Rek."
              className="border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 focus-visible:ring-0 focus-visible:border-invoice-primary"
            />
            <span>a.n.</span>
            <Input
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Nama Pemilik"
              className="border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 focus-visible:ring-0 focus-visible:border-invoice-primary"
            />
          </div>
        </div>
        
        <div>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Catatan tambahan..."
            className="resize-none border-none bg-transparent p-1 focus-visible:ring-0 text-sm"
            rows={3}
          />
        </div>
      </div>

      {/* Signature Section */}
      <div className="flex flex-col items-center space-y-2">
        <div
          onClick={onSignatureClick}
          className="dashed-border w-28 h-16 lg:w-32 lg:h-20 border-2 border-dashed border-muted-foreground/30 rounded-md cursor-pointer bg-muted/50 flex items-center justify-center overflow-hidden hover:bg-muted/70 transition-colors"
        >
          {signature ? (
            <img src={signature} alt="Signature" className="w-full h-full object-contain" />
          ) : (
            <div className="text-center px-2">
              <Upload className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground mx-auto mb-1" />
              <span className="text-xs text-muted-foreground leading-tight">Klik untuk upload tanda tangan</span>
            </div>
          )}
        </div>
        <Input
          value={signatureName}
          onChange={(e) => setSignatureName(e.target.value)}
          placeholder="Nama penandatangan"
          className="text-center border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 text-sm focus-visible:ring-0 focus-visible:border-invoice-primary w-full max-w-[150px]"
        />
      </div>
    </div>
  );
};