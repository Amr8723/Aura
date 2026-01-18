
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, X, Send, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to the AURA Collective. How should we construct your silhouette today? ◈' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    const responseText = await sendMessageToGemini(input);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-6 w-[90vw] md:w-[400px] bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-sm overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#bef264] rounded-full animate-pulse" />
                <h3 className="font-heading font-bold text-xs tracking-[0.3em] text-white uppercase">Vibe Architect</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="h-[400px] overflow-y-auto p-6 space-y-6 scroll-smooth">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] text-xs leading-relaxed tracking-wide ${
                    msg.role === 'user' ? 'text-white font-bold' : 'text-gray-400 font-light'
                  }`}>
                    {msg.role === 'model' && <span className="mr-2 text-[#bef264]">◈</span>}
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <span className="text-[10px] font-mono text-[#bef264] animate-pulse">TRANSMITTING...</span>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-white/5">
              <div className="flex gap-4">
                <input
                  type="text" value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Describe your mood..."
                  className="flex-1 bg-transparent text-white placeholder-white/20 text-xs focus:outline-none uppercase tracking-widest"
                />
                <button onClick={handleSend} disabled={isLoading || !input.trim()} className="text-[#bef264] disabled:opacity-20 transition-opacity">
                  <Command className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border border-white/20 group relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Fingerprint className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#bef264] translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
      </motion.button>
    </div>
  );
};

export default AIChat;
