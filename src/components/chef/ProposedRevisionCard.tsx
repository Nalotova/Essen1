/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CookingResult } from '../../types/cooking';
import { Check, X, Sparkles, ChefHat, Info, AlertTriangle } from 'lucide-react';
import { i18n } from '../../i18n/ru';
import { motion } from 'motion/react';

interface ProposedRevisionCardProps {
  proposedResult: CookingResult;
  message: string;
  onAccept: () => void;
  onReject: () => void;
}

export const ProposedRevisionCard: React.FC<ProposedRevisionCardProps> = ({
  proposedResult,
  message,
  onAccept,
  onReject
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-natural-primary/5 border-2 border-natural-primary/20 rounded-[32px] p-6 space-y-6 relative overflow-hidden"
      id="proposed-revision-card"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} className="text-natural-primary" />
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 bg-natural-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-natural-primary/20">
          <ChefHat size={20} />
        </div>
        <div>
          <h3 className="font-serif font-bold text-lg text-natural-primary">
            {i18n.cooking.chefChat.proposedTitle}
          </h3>
          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">
            {proposedResult.mealName}
          </p>
        </div>
      </div>

      {message && (
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-stone-100 text-xs text-stone-600 leading-relaxed italic relative z-10">
          "{message}"
        </div>
      )}

      <div className="space-y-4 relative z-10">
        {/* Ingredients Summary */}
        <div className="grid grid-cols-2 gap-3">
          {proposedResult.totalIngredients.slice(0, 4).map((ing, idx) => (
            <div key={idx} className="flex items-center space-x-2 bg-white/50 p-2 rounded-xl border border-stone-50">
              <span className="text-sm">🥘</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-stone-700 truncate max-w-[100px]">{ing.foodName}</span>
                <span className="text-[9px] font-black text-stone-400 uppercase">{ing.totalAmount} {i18n.fridge.units[ing.unit as keyof typeof i18n.fridge.units] || ing.unit}</span>
              </div>
            </div>
          ))}
          {proposedResult.totalIngredients.length > 4 && (
            <div className="flex items-center justify-center bg-white/50 p-2 rounded-xl border border-stone-50 text-[9px] font-black text-stone-400 uppercase">
              + еще {proposedResult.totalIngredients.length - 4}
            </div>
          )}
        </div>

        {/* Nutrition Summary (Total) */}
        <div className="flex justify-between items-center bg-stone-800 text-white p-4 rounded-2xl shadow-inner">
           <div className="text-center">
            <div className="text-[8px] font-black text-white/30 uppercase tracking-tighter">Ккал</div>
            <div className="text-xs font-black text-natural-accent">
              {proposedResult.portions.reduce((sum, p) => sum + p.actualKcal, 0)}
            </div>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="text-center">
            <div className="text-[8px] font-black text-white/30 uppercase tracking-tighter">Белки</div>
            <div className="text-xs font-black">
              {Math.round(proposedResult.portions.reduce((sum, p) => sum + p.totals.protein, 0))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[8px] font-black text-white/30 uppercase tracking-tighter">Жиры</div>
            <div className="text-xs font-black">
              {Math.round(proposedResult.portions.reduce((sum, p) => sum + p.totals.fat, 0))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-[8px] font-black text-white/30 uppercase tracking-tighter">Угл</div>
            <div className="text-xs font-black">
              {Math.round(proposedResult.portions.reduce((sum, p) => sum + p.totals.carbs, 0))}
            </div>
          </div>
        </div>

        {proposedResult.warnings.length > 0 && (
          <div className="space-y-1.5">
            {proposedResult.warnings.map((w, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg border border-amber-100 text-[10px] text-amber-700 font-medium">
                <AlertTriangle size={12} className="shrink-0" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        )}

        {proposedResult.recipe && (
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 space-y-3">
             <div className="flex items-center gap-2 text-stone-400">
               <ChefHat size={14} />
               <h4 className="text-[10px] font-black uppercase tracking-widest">{i18n.cooking.recipe}</h4>
             </div>
             <div className="space-y-2">
               {proposedResult.recipe.steps.slice(0, 3).map((step, idx) => (
                 <div key={idx} className="flex gap-2">
                   <div className="w-4 h-4 rounded-md bg-stone-200 flex items-center justify-center text-[8px] font-black shrink-0">{idx + 1}</div>
                   <p className="text-[10px] text-stone-600 leading-tight">{step}</p>
                 </div>
               ))}
               {proposedResult.recipe.steps.length > 3 && (
                 <p className="text-[9px] text-stone-400 italic">... и еще {proposedResult.recipe.steps.length - 3} шагов</p>
               )}
             </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 relative z-10">
        <button
          onClick={onReject}
          className="flex items-center justify-center gap-2 py-3.5 bg-white border border-stone-200 text-stone-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-stone-50 transition-all active:scale-95"
          id="btn-reject-revision"
        >
          <X size={14} />
          {i18n.cooking.chefChat.keepCurrent}
        </button>
        <button
          onClick={onAccept}
          className="flex items-center justify-center gap-2 py-3.5 bg-natural-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-natural-primary/20 hover:scale-[1.02] transition-all active:scale-95"
          id="btn-accept-revision"
        >
          <Check size={14} />
          {i18n.cooking.chefChat.acceptChanges}
        </button>
      </div>
    </motion.div>
  );
};
