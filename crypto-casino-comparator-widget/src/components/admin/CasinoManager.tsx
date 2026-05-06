import React, { useState } from 'react';
import { Casino } from '../../types';
import { Button, Badge } from '../ui/Primitives';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon, Star, Zap, Wallet } from 'lucide-react';

interface CasinoManagerProps {
  casinos: Casino[];
  onChange: (casinos: Casino[]) => void;
}

export const CasinoManager = ({ casinos, onChange }: CasinoManagerProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Casino>>({});

  const handleAdd = () => {
    const newId = `casino-${Date.now()}`;
    const newCasino: Casino = {
      id: newId,
      name: 'Nuevo Casino',
      logo_url: 'https://picsum.photos/seed/new/120/120',
      rating: 4.5,
      bonus: { amount_label: '100% hasta €500', wagering_req: '35x' },
      min_deposit: '€10',
      features: ['Crypto', 'Retiradas rápidas'],
      payment_methods: ['btc', 'eth'],
      accepted_cryptos: ['BTC', 'ETH'],
      accepted_networks: ['BTC', 'ERC20'],
      license_region: 'Curaçao',
      withdrawal_speed: 15,
      no_kyc: true,
      pros: ['Soporte 24/7', 'Retiros rápidos'],
      cons: ['Pocos juegos de mesa'],
      promo_code: 'WELCOME',
      affiliate_link: '#',
      terms_link: '#',
      crypto_quotes: {
        base_currency: 'EUR',
        quotes: { BTC: 62000, ETH: 3200 },
        last_updated_at: new Date().toISOString()
      },
      bonus_value_fiat: { amount_fiat_label: '≈ €500', uses_quote_ticker: null }
    };
    onChange([...casinos, newCasino]);
    setEditingId(newId);
    setEditForm(newCasino);
  };

  const handleRemove = (id: string) => {
    onChange(casinos.filter(c => c.id !== id));
  };

  const handleEdit = (casino: Casino) => {
    setEditingId(casino.id);
    setEditForm(casino);
  };

  const handleSave = () => {
    if (editingId) {
      onChange(casinos.map(c => c.id === editingId ? { ...c, ...editForm } as Casino : c));
      setEditingId(null);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Gestión de Casinos
        </h3>
        <Button size="sm" onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Añadir Casino
        </Button>
      </div>

      <div className="space-y-4">
        {casinos.map((casino) => (
          <div 
            key={casino.id} 
            className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 transition-all"
          >
            {editingId === casino.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Nombre del Casino</label>
                    <input 
                      type="text" 
                      value={editForm.name || ''} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Logo URL</label>
                    <input 
                      type="text" 
                      value={editForm.logo_url || ''} 
                      onChange={e => setEditForm({...editForm, logo_url: e.target.value})}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Bono (Label)</label>
                    <input 
                      type="text" 
                      value={editForm.bonus?.amount_label || ''} 
                      onChange={e => setEditForm({...editForm, bonus: { ...editForm.bonus!, amount_label: e.target.value }})}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Rating (0-5)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="5"
                      value={editForm.rating || 0} 
                      onChange={e => setEditForm({...editForm, rating: parseFloat(e.target.value)})}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Depósito Mín.</label>
                    <input 
                      type="text" 
                      value={editForm.min_deposit || ''} 
                      onChange={e => setEditForm({...editForm, min_deposit: e.target.value})}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Enlace de Afiliado (URL)</label>
                    <input 
                      type="text" 
                      value={editForm.affiliate_link || ''} 
                      onChange={e => setEditForm({...editForm, affiliate_link: e.target.value})}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Código Promocional</label>
                    <input 
                      type="text" 
                      value={editForm.promo_code || ''} 
                      onChange={e => setEditForm({...editForm, promo_code: e.target.value})}
                      className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none text-slate-900 dark:text-slate-100"
                      placeholder="EJ: WELCOME"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>Cancelar</Button>
                  <Button size="sm" onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Guardar Casino
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-white">
                    <img src={casino.logo_url} alt={casino.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{casino.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-0.5 text-amber-500 text-[10px] font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        {casino.rating}
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{casino.bonus.amount_label}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(casino)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleRemove(casino.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}

        {casinos.length === 0 && (
          <div className="py-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            <p className="text-sm text-slate-500">No hay casinos personalizados. Añade uno para empezar.</p>
          </div>
        )}
      </div>
    </section>
  );
};
