import { X, Star, CheckCircle2, AlertCircle, Copy, ExternalLink, Shield, Zap, Wallet, Globe } from 'lucide-react';
import { Casino } from '../../types';
import { Button, Badge } from '../ui/Primitives';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface CasinoModalProps {
  casino: Casino | null;
  onClose: () => void;
}

export const CasinoModal = ({ casino, onClose }: CasinoModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!casino) return null;

  const handleCopy = () => {
    if (casino.promo_code) {
      navigator.clipboard.writeText(casino.promo_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-950 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-primary-600 to-primary-800 p-6">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="absolute -bottom-10 left-6 flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg border border-slate-100">
                <img 
                  src={casino.logo_url} 
                  alt={casino.name} 
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="pb-2">
                <h2 className="text-2xl font-black text-white drop-shadow-sm">{casino.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg text-white text-sm font-bold">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                    {casino.rating}
                  </div>
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white">{casino.license_region}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-14 p-6 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
            {/* Bonus Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-800/50">
                <div className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-1">Bono Exclusivo</div>
                <div className="text-xl font-black text-slate-900 dark:text-slate-100 leading-tight">
                  {casino.bonus.amount_label}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-primary-700 dark:text-primary-300">{casino.bonus_value_fiat.amount_fiat_label}</span>
                  <span className="text-xs text-slate-500">Rollover: {casino.bonus.wagering_req}</span>
                </div>
              </div>

              {casino.promo_code && (
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Código Promocional</div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-lg font-mono font-bold text-slate-700 dark:text-slate-300">{casino.promo_code}</code>
                    <Button variant="secondary" size="sm" onClick={handleCopy} className="gap-2">
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copiado' : 'Copiar'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Lo que nos gusta
                </h4>
                <ul className="space-y-2">
                  {casino.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  Puntos a mejorar
                </h4>
                <ul className="space-y-2">
                  {casino.cons.map((con, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Retiro</div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  {casino.withdrawal_speed} min
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Depósito Mín.</div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
                  <Wallet className="w-3.5 h-3.5 text-primary-500" />
                  {casino.min_deposit}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Privacidad</div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
                  <Shield className="w-3.5 h-3.5 text-emerald-500" />
                  {casino.no_kyc ? 'Sin KYC' : 'KYC Básico'}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Licencia</div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {casino.license_region}
                </div>
              </div>
            </div>

            {/* Crypto & Networks */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Criptos y Redes Soportadas</h4>
              <div className="flex flex-wrap gap-2">
                {casino.accepted_cryptos.map(coin => (
                  <Badge key={coin} variant="outline" className="px-3 py-1 text-xs">{coin}</Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {casino.accepted_networks.map(net => (
                  <Badge key={net} variant="primary" className="px-3 py-1 text-xs">{net}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <a href={casino.terms_link} className="text-xs text-slate-400 hover:text-slate-600 underline">Aplican T&C. Juego responsable.</a>
            <Button 
              className="w-full sm:w-auto px-8 py-4 text-lg font-black gap-2 shadow-xl shadow-primary-500/20"
              onClick={() => window.open(casino.affiliate_link, '_blank')}
            >
              Jugar Ahora en {casino.name}
              <ExternalLink className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
