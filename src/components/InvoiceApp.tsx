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

const InvoiceApp = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('blue');
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);

  const addCatalogItem = (item: Omit<CatalogItem, 'id'>) => {
    const newItem: CatalogItem = {
      ...item,
      id: Date.now().toString(),
    };
    setCatalogItems([...catalogItems, newItem]);
  };

  const addMultipleCatalogItems = (items: Omit<CatalogItem, 'id'>[]) => {
    const newItems: CatalogItem[] = items.map((item, index) => ({
      ...item,
      id: (Date.now() + index).toString(),
    }));
    setCatalogItems(prev => [...prev, ...newItems]);
  };

  const deleteCatalogItem = (id: string) => {
    setCatalogItems(catalogItems.filter(item => item.id !== id));
  };

  return (
    <div className={`min-h-screen bg-background theme-${currentTheme}`}>
      <header className="no-print bg-card border-b p-3 lg:p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">Aplikasi Invoice</h1>
            <p className="text-sm text-muted-foreground">Template invoice dengan berbagai pilihan branding</p>
          </div>
          <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        </div>
      </header>
      
      <main className="container mx-auto py-4 lg:py-8 px-4">
        <div className="space-y-6">
          <Invoice catalogItems={catalogItems} />
          <ItemCatalog
            items={catalogItems}
            onAddItem={addCatalogItem}
            onDeleteItem={deleteCatalogItem}
            onAddMultipleItems={addMultipleCatalogItems}
          />
        </div>
      </main>
    </div>
  );
};

export default InvoiceApp;