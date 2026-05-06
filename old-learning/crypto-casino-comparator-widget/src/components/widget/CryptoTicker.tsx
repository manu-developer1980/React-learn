import { motion } from 'motion/react';
import { TrendingUp, Clock } from 'lucide-react';
import { CryptoQuotes } from '../../types';

interface CryptoTickerProps {
  quotes: CryptoQuotes;
}

export const CryptoTicker = ({ quotes }: CryptoTickerProps) => {
  const displayQuotes = Object.entries(quotes.quotes).slice(0, 4);
  const lastUpdated = new Date(quotes.last_updated_at);
  const timeAgo = Math.floor((new Date().getTime() - lastUpdated.getTime()) / 60000);

  return (
    <div className="flex items-center gap-4 py-2 px-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap">
        <TrendingUp className="w-3.5 h-3.5 text-primary-500" />
        <span>Crypto Ticker</span>
      </div>
      
      <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
      
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
        {displayQuotes.map(([ticker, price]) => (
          <motion.div 
            key={ticker}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{ticker}</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {quotes.base_currency === 'EUR' ? '€' : '$'}
              {price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
        <Clock className="w-3 h-3" />
        <span>{timeAgo === 0 ? 'Ahora' : `Hace ${timeAgo} min`}</span>
      </div>
    </div>
  );
};
