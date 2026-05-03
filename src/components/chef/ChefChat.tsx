/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, MessageSquareText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { i18n } from '../../i18n/ru';
import { ChefChatMessage } from '../../types/chefChat';

interface ChefChatProps {
  history: ChefChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChefChat: React.FC<ChefChatProps> = ({ history, onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const quickButtons = [
    { key: 'isGoodForTarget', text: i18n.cooking.chefChat.quickButtons.isGoodForTarget },
    { key: 'makeSatiating', text: i18n.cooking.chefChat.quickButtons.makeSatiating },
    { key: 'makeTastier', text: i18n.cooking.chefChat.quickButtons.makeTastier },
    { key: 'moreProtein', text: i18n.cooking.chefChat.quickButtons.moreProtein },
    { key: 'lessCarbs', text: i18n.cooking.chefChat.quickButtons.lessCarbs },
    { key: 'removeProduct', text: i18n.cooking.chefChat.quickButtons.removeProduct },
    { key: 'otherOption', text: i18n.cooking.chefChat.quickButtons.otherOption },
    { key: 'whyTheseMacros', text: i18n.cooking.chefChat.quickButtons.whyTheseMacros },
  ];

  return (
    <div className="bg-stone-50 border border-stone-100 rounded-[32px] overflow-hidden flex flex-col h-[500px]" id="chef-chat-container">
      {/* Header */}
      <div className="p-5 border-b border-stone-100 bg-white flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 bg-natural-primary/10 text-natural-primary rounded-xl flex items-center justify-center">
          <MessageSquareText size={20} />
        </div>
        <div>
          <h3 className="font-serif font-black text-sm text-stone-800 tracking-tight">
            {i18n.cooking.chefChat.title}
          </h3>
          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">
            {i18n.cooking.chefChat.subtitle.split('.')[0]}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar"
      >
        <AnimatePresence initial={false}>
          {history.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center opacity-40 px-6 space-y-3"
            >
              <Sparkles size={32} className="text-natural-primary" />
              <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                {i18n.cooking.chefChat.subtitle}
              </p>
            </motion.div>
          )}

          {history.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center ${
                  msg.role === 'user' ? 'bg-stone-800 text-white' : 'bg-natural-primary text-white shadow-sm'
                }`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-stone-800 text-white rounded-tr-none' 
                    : 'bg-white border border-stone-100 text-stone-700 shadow-sm rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2 text-natural-primary">
                <div className="w-6 h-6 rounded-lg bg-natural-primary/10 flex items-center justify-center">
                  <Loader2 size={12} className="animate-spin" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {i18n.cooking.chefChat.thinking}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-stone-100 space-y-3 shrink-0">
        {/* Quick Buttons Overlay */}
        <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar -mx-1 px-1">
          {quickButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => {
                setInput(btn.text);
                // We don't submit immediately so user can edit if they want, 
                // but actually most of these are direct commands.
                // Let's submit them if they end with '?' or just are short.
                onSendMessage(btn.text);
              }}
              disabled={isLoading}
              className="shrink-0 px-3 py-1.5 bg-stone-50 border border-stone-100 rounded-lg text-[9px] font-black text-stone-500 uppercase tracking-tight hover:bg-stone-100 hover:text-stone-700 transition-all disabled:opacity-50"
            >
              {btn.text}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={i18n.cooking.chefChat.placeholder}
            className="flex-1 bg-stone-50 border border-stone-100 rounded-2xl p-4 pr-12 text-xs font-medium text-stone-700 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-natural-primary/5 focus:border-natural-primary/20 transition-all"
            id="chef-chat-input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2.5 bg-natural-primary text-white rounded-xl shadow-lg shadow-natural-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            id="btn-send-chef-msg"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
};
