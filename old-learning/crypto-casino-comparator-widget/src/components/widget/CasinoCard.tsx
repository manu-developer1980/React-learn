import React from 'react';
import { Star, ExternalLink, Info, Wallet, Zap, ShieldCheck } from 'lucide-react';
import { Casino } from '../../types';
import { Button, Badge } from '../ui/Primitives';
import { motion } from 'motion/react';

interface CasinoCardProps {
  casino: Casino;
  onDetails: (casino: Casino) => void;
  key?: React.Key;
}

export const CasinoCard = ({ casino, onDetails }: CasinoCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white">
            <img 
              src={casino.logo_url} 
              alt={casino.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{casino.name}</h3>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-sm font-bold">{casino.rating}</span>
              </div>
              <Badge variant="outline" className="text-[9px]">{casino.license_region}</Badge>
            </div>
          </div>
        </div>
        {casino.no_kyc && (
          <Badge variant="success" className="bg-emerald-50 dark:bg-emerald-900/20">Sin KYC</Badge>
        )}
      </div>

      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-100 dark:border-slate-700/50">
        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Bono de Bienvenida</div>
        <div className="font-extrabold text-primary-600 dark:text-primary-400 text-base">
          {casino.bonus.amount_label}
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {casino.bonus_value_fiat.amount_fiat_label}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            Req: {casino.bonus.wagering_req}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Crypto</span>
          <div className="flex flex-wrap gap-1">
            {casino.accepted_cryptos.slice(0, 3).map(coin => (
              <div key={coin} className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {coin[0]}
              </div>
            ))}
            {casino.accepted_cryptos.length > 3 && (
              <span className="text-[10px] text-slate-400 font-bold">+{casino.accepted_cryptos.length - 3}</span>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Depósito Mín.</span>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
            <Wallet className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">{casino.min_deposit}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button 
          className="flex-1 gap-2"
          onClick={() => window.open(casino.affiliate_link, '_blank')}
        >
          Visitar
          <ExternalLink className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={() => onDetails(casino)}>
          <Info className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};
