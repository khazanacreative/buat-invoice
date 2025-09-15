import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

interface InvoiceFooterProps {
  bankAccounts: BankAccount[];
  setBankAccounts: (accounts: BankAccount[]) => void;
  notes: string;
  setNotes: (value: string) => void;
  signature: string | null;
  onSignatureClick: () => void;
  signatureName: string;
  setSignatureName: (value: string) => void;
}

export const InvoiceFooter = ({
  bankAccounts,
  setBankAccounts,
  notes,
  setNotes,
  signature,
  onSignatureClick,
  signatureName,
  setSignatureName,
}: InvoiceFooterProps) => {
  return (
  <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mt-8">
      {/* Notes Section */}
      <div className="flex-1 space-y-4">
        <div>
          <p className="font-medium text-sm mb-2">
            <strong>NB:</strong> Silahkan melakukan pembayaran melalui transfer ke:
          </p>
          {bankAccounts.map((acc, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm mb-2 w-full">
              <Input
                value={acc.bankName}
                onChange={e => {
                  const updated = [...bankAccounts];
                  updated[idx].bankName = e.target.value;
                  setBankAccounts(updated);
                }}
                placeholder="Bank"
                className="w-full sm:w-20 border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 focus-visible:ring-0 focus-visible:border-invoice-primary"
              />
              <Input
                value={acc.accountNumber}
                onChange={e => {
                  const updated = [...bankAccounts];
                  updated[idx].accountNumber = e.target.value;
                  setBankAccounts(updated);
                }}
                placeholder="No. Rek."
                className="w-full sm:w-auto border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 focus-visible:ring-0 focus-visible:border-invoice-primary"
              />
              <span className="hidden sm:inline">a.n.</span>
              <Input
                value={acc.accountHolder}
                onChange={e => {
                  const updated = [...bankAccounts];
                  updated[idx].accountHolder = e.target.value;
                  setBankAccounts(updated);
                }}
                placeholder="Nama Pemilik"
                className="w-full sm:w-auto border-none border-b border-muted-foreground/30 rounded-none bg-transparent p-1 focus-visible:ring-0 focus-visible:border-invoice-primary"
              />
              {bankAccounts.length > 1 && (
                <button type="button" className="text-xs text-red-500 ml-2" onClick={() => setBankAccounts(bankAccounts.filter((_, i) => i !== idx))}>Hapus</button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-xs text-blue-600 mt-1 no-print"
            onClick={() => setBankAccounts([...bankAccounts, { bankName: '', accountNumber: '', accountHolder: '' }])}
          >
            + Tambah Rekening
          </button>
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
  <div className="flex flex-col items-center space-y-2 mt-6 sm:mt-0 w-full sm:w-auto">
        <div
          onClick={onSignatureClick}
          className="dashed-border w-28 h-16 lg:w-32 lg:h-20 border-2 border-dashed border-muted-foreground/30 rounded-md cursor-pointer bg-muted/50 flex items-center justify-center overflow-hidden hover:bg-muted/70 transition-colors no-print"
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