// InvoiceApp.tsx
import { useState } from 'react';
import { Invoice } from './Invoice';
import { ThemeSelector } from './ThemeSelector';
import { ItemCatalog } from './ItemCatalog';

export type Theme = 'blue' | 'green' | 'purple' | 'red' | 'navy' | 'orange';

export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

// tipe untuk style spesifik yang kita butuhkan di komponen Invoice
export interface ThemeStyle {
  logoText: string;         // class untuk warna teks logo "INVOICE"
  tableHeaderBg: string;    // class untuk background header tabel
  grandTotalBg: string;     // class untuk background grand total (30% opacity)
}

// mapping statis — Tailwind akan meng-generate karena kelasnya literal
const themeStyles: Record<Theme, ThemeStyle> = {
  blue:   { logoText: 'text-blue-900', tableHeaderBg: 'bg-blue-100', grandTotalBg: 'bg-blue-500/30' },
  green:  { logoText: 'text-green-900', tableHeaderBg: 'bg-green-100', grandTotalBg: 'bg-green-500/30' },
  purple: { logoText: 'text-purple-900', tableHeaderBg: 'bg-purple-100', grandTotalBg: 'bg-purple-500/30' },
  red:    { logoText: 'text-red-900', tableHeaderBg: 'bg-red-100', grandTotalBg: 'bg-red-500/30' },
  navy:   { logoText: 'text-white',    tableHeaderBg: 'bg-blue-800',  grandTotalBg: 'bg-blue-900/30' },
  orange: { logoText: 'text-orange-900',tableHeaderBg: 'bg-orange-100',grandTotalBg: 'bg-orange-500/30' },
};

const InvoiceApp = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('blue');
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);

  // ... fungsi add/delete sama seperti sebelumnya

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print bg-card border-b p-3 lg:p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            {/* pakai kelas logoText dari mapping */}
            <h1 className={`text-xl lg:text-2xl font-bold ${themeStyles[currentTheme].logoText}`}>INVOICE</h1>
            <p className="text-sm text-muted-foreground">Template invoice dengan berbagai pilihan branding</p>
          </div>

          <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        </div>
      </header>

      <main className="container mx-auto py-4 lg:py-8 px-4">
        <div className="space-y-6">
          {/* kirim themeStyle ke Invoice supaya komponen Invoice bisa styling header tabel & grand total */}
          <Invoice catalogItems={catalogItems} themeStyle={themeStyles[currentTheme]} />
          <ItemCatalog
            items={catalogItems}
            onAddItem={(item) => setCatalogItems(prev => [...prev, { ...item, id: Date.now().toString() }])}
            onDeleteItem={(id) => setCatalogItems(prev => prev.filter(i => i.id !== id))}
            onAddMultipleItems={(items) =>
              setCatalogItems(prev => [...prev, ...items.map((it, idx) => ({ ...it, id: (Date.now()+idx).toString() }))])
            }
          />
        </div>
      </main>
    </div>
  );
};

export default InvoiceApp;
