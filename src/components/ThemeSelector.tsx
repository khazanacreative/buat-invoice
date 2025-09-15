import { Theme } from './InvoiceApp';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themes = [
  { value: 'blue' as Theme, label: 'Professional Blue', color: 'bg-blue-500' },
  { value: 'green' as Theme, label: 'Corporate Green', color: 'bg-green-500' },
  { value: 'purple' as Theme, label: 'Modern Purple', color: 'bg-purple-500' },
  { value: 'red' as Theme, label: 'Elegant Red', color: 'bg-red-500' },
  { value: 'navy' as Theme, label: 'Classic Navy', color: 'bg-blue-900' },
  { value: 'orange' as Theme, label: 'Creative Orange', color: 'bg-orange-500' },
];

export const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
      <span className="text-sm font-medium text-foreground">Tema Branding:</span>
      <Select value={currentTheme} onValueChange={onThemeChange}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-card border border-invoice-border">
          {themes.map((theme) => (
            <SelectItem key={theme.value} value={theme.value}>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${theme.color}`} />
                {theme.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};