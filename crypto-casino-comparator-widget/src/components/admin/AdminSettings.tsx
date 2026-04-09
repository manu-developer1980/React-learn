import { Settings, Key, Database, HardDrive, Palette, Save, Trash2, CheckCircle2 } from 'lucide-react';
import { Button, Badge } from '../ui/Primitives';
import { AppSettings, ThemeMode, Density } from '../../types';
import { useState } from 'react';
import { CasinoManager } from './CasinoManager';

interface AdminSettingsProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
}

export const AdminSettings = ({ settings, onSave }: AdminSettingsProps) => {
  const [localSettings, setLocalSettings] = useState<AppSettings>(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
            <Settings className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Ajustes del Plugin</h1>
            <p className="text-sm text-slate-500">Configura la apariencia y el comportamiento de tu widget.</p>
          </div>
        </div>
        <Button onClick={handleSave} className="gap-2">
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Guardado' : 'Guardar Cambios'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Key className="w-4 h-4" />
              Licencia
            </h3>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">License Key</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={localSettings.licenseKey}
                  onChange={(e) => setLocalSettings({...localSettings, licenseKey: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-slate-900 dark:text-slate-100"
                  placeholder="BW-XXXX-XXXX-XXXX"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Badge variant="success" className="text-[8px]">Válida</Badge>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Database className="w-4 h-4" />
              Fuente de Datos
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">API Base URL</label>
                <input 
                  type="text" 
                  value={localSettings.apiBaseUrl}
                  onChange={(e) => setLocalSettings({...localSettings, apiBaseUrl: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500/20 text-slate-900 dark:text-slate-100"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={localSettings.useLocalData}
                  onChange={(e) => setLocalSettings({...localSettings, useLocalData: e.target.checked})}
                  className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary-500 transition-colors">Usar dataset local (Modo Dev)</span>
              </label>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Caché
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">TTL de Caché (minutos)</label>
                <select 
                  value={localSettings.cacheTtl}
                  onChange={(e) => setLocalSettings({...localSettings, cacheTtl: Number(e.target.value)})}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                >
                  <option value={5}>5 minutos</option>
                  <option value={15}>15 minutos</option>
                  <option value={60}>60 minutos</option>
                  <option value={1440}>24 horas</option>
                </select>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 border-red-200 dark:border-red-900/30">
                <Trash2 className="w-4 h-4" />
                Vaciar Caché Local
              </Button>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Apariencia
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Tema</label>
                <select 
                  value={localSettings.theme}
                  onChange={(e) => setLocalSettings({...localSettings, theme: e.target.value as ThemeMode})}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                >
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="auto">Auto (Sistema)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">Densidad</label>
                <select 
                  value={localSettings.density}
                  onChange={(e) => setLocalSettings({...localSettings, density: e.target.value as Density})}
                  className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                >
                  <option value="normal">Normal</option>
                  <option value="compact">Compacta</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 pt-8">
        <CasinoManager 
          casinos={localSettings.customCasinos} 
          onChange={(casinos) => setLocalSettings({...localSettings, customCasinos: casinos})} 
        />
      </div>
    </div>
  );
};
