import { useState } from 'react';
import { Invoice } from './Invoice';
import { ThemeSelector } from './ThemeSelector';

export type Theme = 'blue' | 'green' | 'purple' | 'red' | 'navy' | 'orange';

const InvoiceApp = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('blue');

  return (
    <div className={`min-h-screen bg-background theme-${currentTheme}`}>
      <header className="no-print bg-card border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Aplikasi Invoice</h1>
            <p className="text-muted-foreground">Template invoice dengan berbagai pilihan branding</p>
          </div>
          <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        </div>
      </header>
      
      <main className="container mx-auto py-8">
        <Invoice />
      </main>
    </div>
  );
};

export default InvoiceApp;