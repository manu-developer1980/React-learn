import { useState, useMemo, useEffect } from 'react';
import { mockCasinos } from './data/mockData';
import { Casino, AppSettings } from './types';
import { CryptoTicker } from './components/widget/CryptoTicker';
import { Filters } from './components/widget/Filters';
import { CasinoTable } from './components/widget/CasinoTable';
import { CasinoCard } from './components/widget/CasinoCard';
import { CasinoModal } from './components/widget/CasinoModal';
import { AdminSettings } from './components/admin/AdminSettings';
import { Button, Skeleton } from './components/ui/Primitives';
import { LayoutGrid, List, Settings as SettingsIcon, Eye, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'widget' | 'admin'>('widget');
  const [search, setSearch] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [selectedCasino, setSelectedCasino] = useState<Casino | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('crypto_widget_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing settings', e);
      }
    }
    return {
      licenseKey: 'BW-8822-X921-L001',
      apiBaseUrl: 'https://api.cryptocasinos.com/v1',
      useLocalData: true,
      cacheTtl: 15,
      theme: 'auto',
      density: 'normal',
      visibleColumns: ['casino', 'rating', 'bonus', 'crypto', 'deposit', 'action'],
      customCasinos: [],
    };
  });

  // Persist settings
  useEffect(() => {
    localStorage.setItem('crypto_widget_settings', JSON.stringify(settings));
  }, [settings]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [view]);

  // Theme management
  useEffect(() => {
    const root = window.document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'light') {
      root.classList.remove('dark');
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    }
  }, [settings.theme]);

  const activeCasinos = useMemo(() => {
    return settings.customCasinos.length > 0 ? settings.customCasinos : mockCasinos;
  }, [settings.customCasinos]);

  const allFeatures = useMemo(() => {
    const features = new Set<string>();
    activeCasinos.forEach((c) => c.features.forEach((f) => features.add(f)));
    return Array.from(features);
  }, [activeCasinos]);

  const allCryptos = useMemo(() => {
    const cryptos = new Set<string>();
    activeCasinos.forEach((c) => c.accepted_cryptos.forEach((cry) => cryptos.add(cry)));
    return Array.from(cryptos);
  }, [activeCasinos]);

  const filteredCasinos = useMemo(() => {
    return activeCasinos.filter((casino) => {
      const matchesSearch = 
        casino.name.toLowerCase().includes(search.toLowerCase()) ||
        casino.bonus.amount_label.toLowerCase().includes(search.toLowerCase());
      
      const matchesFeatures = 
        selectedFeatures.length === 0 || 
        selectedFeatures.every((f) => casino.features.includes(f));
      
      const matchesCryptos = 
        selectedCryptos.length === 0 || 
        selectedCryptos.some((c) => casino.accepted_cryptos.includes(c));
      
      const matchesRating = casino.rating >= minRating;

      return matchesSearch && matchesFeatures && matchesCryptos && matchesRating;
    });
  }, [activeCasinos, search, selectedFeatures, selectedCryptos, minRating]);

  const handleReset = () => {
    setSearch('');
    setSelectedFeatures([]);
    setSelectedCryptos([]);
    setMinRating(0);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full p-8 bg-white dark:bg-slate-900 rounded-3xl border border-red-100 dark:border-red-900/30 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">¡Ups! Algo salió mal</h2>
          <p className="text-slate-500 dark:text-slate-400">No se pudo cargar la información de los casinos en este momento.</p>
          <Button onClick={() => setError(null)} className="w-full">Reintentar</Button>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Mostrando datos guardados (Caché)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation / Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <LayoutGrid className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">CryptoCasinos</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Comparador Premium</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button 
              onClick={() => setView('widget')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'widget' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              <Eye className="w-4 h-4" />
              Widget
            </button>
            <button 
              onClick={() => setView('admin')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'admin' ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
            >
              <SettingsIcon className="w-4 h-4" />
              Admin
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'widget' ? (
            <motion.div 
              key="widget"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Comparativa de Criptocasinos</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Encuentra los mejores bonos y las redes más rápidas.</p>
                </div>
                <CryptoTicker quotes={mockCasinos[0].crypto_quotes} />
              </div>

              {/* Filters */}
              <Filters 
                search={search}
                setSearch={setSearch}
                selectedFeatures={selectedFeatures}
                setSelectedFeatures={setSelectedFeatures}
                selectedCryptos={selectedCryptos}
                setSelectedCryptos={setSelectedCryptos}
                minRating={minRating}
                setMinRating={setMinRating}
                onReset={handleReset}
                allFeatures={allFeatures}
                allCryptos={allCryptos}
              />

              {/* Content */}
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                  </div>
                </div>
              ) : filteredCasinos.length > 0 ? (
                <>
                  {/* Desktop Table */}
                  <div className="hidden lg:block">
                    <CasinoTable casinos={filteredCasinos} onDetails={setSelectedCasino} />
                  </div>
                  
                  {/* Mobile Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                    {filteredCasinos.map(casino => (
                      <CasinoCard key={casino.id} casino={casino} onDetails={setSelectedCasino} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <Info className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">No hay resultados</h3>
                    <p className="text-slate-500 dark:text-slate-400">Prueba ajustando los filtros o la búsqueda.</p>
                  </div>
                  <Button variant="outline" onClick={handleReset}>Limpiar filtros</Button>
                </div>
              )}

              {/* Footer Disclaimer */}
              <div className="p-6 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
                  <strong>Descargo de responsabilidad:</strong> El juego puede ser adictivo. Juega con responsabilidad. 
                  Este widget contiene enlaces de afiliado. Aplican Términos y Condiciones. Solo para mayores de 18 años.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AdminSettings settings={settings} onSave={setSettings} />
            </motion.div>
          )}
        </AnimatePresence>

        <CasinoModal casino={selectedCasino} onClose={() => setSelectedCasino(null)} />
      </div>
    </div>
  );
}
