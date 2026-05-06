import { Search, Filter, RotateCcw, Star } from 'lucide-react';
import { Button } from '../ui/Primitives';
import { cn } from '../ui/Primitives';

interface FiltersProps {
  search: string;
  setSearch: (val: string) => void;
  selectedFeatures: string[];
  setSelectedFeatures: (val: string[]) => void;
  selectedCryptos: string[];
  setSelectedCryptos: (val: string[]) => void;
  minRating: number;
  setMinRating: (val: number) => void;
  onReset: () => void;
  allFeatures: string[];
  allCryptos: string[];
}

export const Filters = ({
  search,
  setSearch,
  selectedFeatures,
  setSelectedFeatures,
  selectedCryptos,
  setSelectedCryptos,
  minRating,
  setMinRating,
  onReset,
  allFeatures,
  allCryptos,
}: FiltersProps) => {
  const toggleFeature = (feature: string) => {
    setSelectedFeatures(
      selectedFeatures.includes(feature)
        ? selectedFeatures.filter((f) => f !== feature)
        : [...selectedFeatures, feature]
    );
  };

  const toggleCrypto = (crypto: string) => {
    setSelectedCryptos(
      selectedCryptos.includes(crypto)
        ? selectedCryptos.filter((c) => c !== crypto)
        : [...selectedCryptos, crypto]
    );
  };

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar casino o bono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all dark:text-slate-100"
          />
        </div>

        {/* Rating Filter */}
        <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">Rating mín.</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setMinRating(star)}
                className={cn(
                  'p-0.5 transition-colors',
                  minRating >= star ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'
                )}
              >
                <Star className={cn('w-4 h-4', minRating >= star && 'fill-current')} />
              </button>
            ))}
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={onReset} className="md:w-auto w-full gap-2">
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </Button>
      </div>

      {/* Chips Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 w-full mb-1">Características</span>
          {allFeatures.map((feature) => (
            <button
              key={feature}
              onClick={() => toggleFeature(feature)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-all border',
                selectedFeatures.includes(feature)
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary-400'
              )}
            >
              {feature}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 w-full mb-1">Criptos Aceptadas</span>
          {allCryptos.map((crypto) => (
            <button
              key={crypto}
              onClick={() => toggleCrypto(crypto)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-all border flex items-center gap-1.5',
                selectedCryptos.includes(crypto)
                  ? 'bg-slate-900 dark:bg-slate-100 border-slate-900 dark:border-slate-100 text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-400'
              )}
            >
              {crypto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
