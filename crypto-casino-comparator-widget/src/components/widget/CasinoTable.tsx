import { Star, ExternalLink, Info, Zap, ShieldCheck, Wallet } from 'lucide-react';
import { Casino } from '../../types';
import { Button, Badge } from '../ui/Primitives';

interface CasinoTableProps {
  casinos: Casino[];
  onDetails: (casino: Casino) => void;
}

export const CasinoTable = ({ casinos, onDetails }: CasinoTableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
            <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Casino</th>
            <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rating</th>
            <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bono de Bienvenida</th>
            <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Crypto & Redes</th>
            <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Depósito Mín.</th>
            <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
          {casinos.map((casino) => (
            <tr key={casino.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
              {/* Casino Info */}
              <td className="px-4 py-5">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white">
                    <img 
                      src={casino.logo_url} 
                      alt={casino.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{casino.name}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {casino.no_kyc && (
                        <Badge variant="success" className="bg-emerald-50 dark:bg-emerald-900/20">Sin KYC</Badge>
                      )}
                      <Badge variant="outline" className="text-[9px]">{casino.license_region}</Badge>
                    </div>
                  </div>
                </div>
              </td>

              {/* Rating */}
              <td className="px-4 py-5">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-slate-900 dark:text-slate-100">{casino.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Muy Confiable</span>
                </div>
              </td>

              {/* Bonus */}
              <td className="px-4 py-5">
                <div className="flex flex-col">
                  <div className="font-extrabold text-primary-600 dark:text-primary-400 text-sm leading-tight">
                    {casino.bonus.amount_label}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {casino.bonus_value_fiat.amount_fiat_label}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Req: {casino.bonus.wagering_req}
                    </span>
                  </div>
                </div>
              </td>

              {/* Crypto & Networks */}
              <td className="px-4 py-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {casino.accepted_cryptos.slice(0, 4).map(coin => (
                      <div key={coin} className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[8px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700" title={coin}>
                        {coin[0]}
                      </div>
                    ))}
                    {casino.accepted_cryptos.length > 4 && (
                      <span className="text-[10px] text-slate-400 font-bold">+{casino.accepted_cryptos.length - 4}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {casino.accepted_networks.slice(0, 2).map(net => (
                      <Badge key={net} variant="primary" className="text-[8px] px-1 py-0">{net}</Badge>
                    ))}
                  </div>
                </div>
              </td>

              {/* Min Deposit */}
              <td className="px-4 py-5">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <Wallet className="w-3.5 h-3.5" />
                  <span className="text-sm font-medium">{casino.min_deposit}</span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-4 py-5 text-right">
                <div className="flex flex-col items-end gap-2">
                  <Button 
                    size="sm" 
                    className="w-32 gap-2 group-hover:scale-105 transition-transform"
                    onClick={() => window.open(casino.affiliate_link, '_blank')}
                  >
                    Visitar
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                  <button 
                    onClick={() => onDetails(casino)}
                    className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-primary-500 transition-colors"
                  >
                    <Info className="w-3 h-3" />
                    Ver detalles
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
