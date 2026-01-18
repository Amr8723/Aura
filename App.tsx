
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Globe, Zap, Fingerprint, Menu, X, Package, Shield, Layers } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProductCard from './components/ProductCard';
import AIChat from './components/AIChat';
import { Product } from './types';

const CATALOG: Product[] = [
  { 
    id: '1', 
    name: 'Ghost Shell v1', 
    category: 'Outerwear', 
    price: '$580', 
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop',
    description: 'A liquid-resistant membrane crafted for city dwellers. Zero-noise textile construction allows for total urban invisibility.',
    materials: ['Bio-Nylon', 'Aramid Fibers']
  },
  { 
    id: '2', 
    name: 'Void Hoodie', 
    category: 'Mid-layer', 
    price: '$240', 
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    description: '450GSM ultra-dense organic cotton. Features an oversized architectural hood designed for sensory isolation.',
    materials: ['100% Obsidian Cotton', 'Recycled Zips']
  },
  { 
    id: '3', 
    name: 'Aura-1 Footwear', 
    category: 'Tech-Wear', 
    price: '$395', 
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1000&auto=format&fit=crop',
    description: 'Responsive foam core with a structural knit upper. Designed for high-velocity movement across various terrains.',
    materials: ['Knit Tech', 'Responsive Foam']
  },
  { 
    id: '4', 
    name: 'Neural Cargo', 
    category: 'Trousers', 
    price: '$310', 
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop',
    description: 'Articulated knees and 8 modular storage zones. Constructed with memory fabric that adapts to your silhouette.',
    materials: ['Memory Poly', 'Carbon Threads']
  },
  { 
    id: '5', 
    name: 'Signal Scarf', 
    category: 'Accessory', 
    price: '$120', 
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1000&auto=format&fit=crop',
    description: 'Infused with conductive silver threads to block localized RFID signals. Protection and warmth in a single piece.',
    materials: ['Silver Infused Wool']
  },
  { 
    id: '6', 
    name: 'Prism Vest', 
    category: 'Tech-Wear', 
    price: '$450', 
    image: 'https://images.unsplash.com/photo-1511405946472-a37e3b5ccd4f?q=80&w=1000&auto=format&fit=crop',
    description: 'Retro-reflective glass bead coating creates a shimmering effect under direct light. High visibility for night operations.',
    materials: ['Glass Bead Coating', 'Mesh Lining']
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [purchaseStep, setPurchaseStep] = useState<'idle' | 'scanning' | 'complete'>('idle');

  const initiatePurchase = () => {
    setPurchaseStep('scanning');
    setTimeout(() => setPurchaseStep('complete'), 2500);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen text-white bg-[#050505] selection:bg-[#bef264] selection:text-black cursor-auto md:cursor-none">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-8 mix-blend-difference">
        <div className="font-heading text-2xl font-bold tracking-tighter cursor-default">AURA</div>
        
        <div className="hidden md:flex gap-12 text-[10px] font-bold tracking-[0.3em] uppercase opacity-70">
          {['Catalog', 'Craft', 'Mission'].map((item) => (
            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="hover:text-[#bef264] transition-colors">{item}</button>
          ))}
        </div>

        <button 
          onClick={() => scrollToSection('catalog')}
          className="flex items-center gap-2 border border-white/20 px-6 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
        >
          <ShoppingBag className="w-3 h-3" />
          <span>Shop</span>
        </button>
      </nav>

      {/* HERO */}
      <header className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-[10px] font-mono tracking-[0.5em] text-[#bef264] uppercase bg-black/40 px-6 py-2 rounded-full border border-[#bef264]/20"
          >
            Spring / Summer Collective 2025
          </motion.div>

          <GradientText 
            text="FUTURE" 
            as="h1" 
            className="text-[18vw] leading-[0.8] font-black tracking-tighter" 
          />
          <GradientText 
            text="HUMAN" 
            as="h1" 
            className="text-[18vw] leading-[0.8] font-black tracking-tighter -mt-2 opacity-80" 
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 text-lg font-light max-w-lg opacity-60 px-6"
          >
            Limitless garments for the digital vanguard. Designed in Tokyo, forged for the void.
          </motion.p>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20" />
      </header>

      {/* ASYMMETRICAL CATALOG */}
      <section id="catalog" className="relative z-10 py-32 px-4 md:px-8">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline mb-24 gap-4">
             <h2 className="text-6xl md:text-[10rem] font-heading font-bold uppercase leading-none">Archive</h2>
             <div className="text-right">
                <span className="text-sm font-mono opacity-40 block tracking-widest">S/S 2025</span>
                <span className="text-xs font-mono text-[#bef264] uppercase tracking-[0.4em]">Construction in progress</span>
             </div>
          </div>

          {/* Design Grid: Randomized column spanning */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-4 lg:gap-8">
            <div className="md:col-span-8">
              <ProductCard product={CATALOG[0]} onClick={() => setSelectedProduct(CATALOG[0])} />
            </div>
            <div className="md:col-span-4 flex flex-col gap-4 lg:gap-8">
              <ProductCard product={CATALOG[1]} onClick={() => setSelectedProduct(CATALOG[1])} />
              <div className="hidden lg:block p-8 border border-white/5 bg-white/5 aspect-square flex flex-col justify-end">
                  <Layers className="w-8 h-8 text-[#bef264] mb-4" />
                  <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">Aura Materials Lab / 092-X</p>
                  <h4 className="text-xl font-heading font-bold mt-2">MULTI-PHASE TEXTILE SYSTEMS</h4>
              </div>
            </div>
            
            <div className="md:col-span-4">
              <ProductCard product={CATALOG[2]} onClick={() => setSelectedProduct(CATALOG[2])} />
            </div>
            <div className="md:col-span-8">
              <ProductCard product={CATALOG[3]} onClick={() => setSelectedProduct(CATALOG[3])} />
            </div>

            <div className="md:col-span-6">
              <ProductCard product={CATALOG[4]} onClick={() => setSelectedProduct(CATALOG[4])} />
            </div>
            <div className="md:col-span-6">
              <ProductCard product={CATALOG[5]} onClick={() => setSelectedProduct(CATALOG[5])} />
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT */}
      <section id="craft" className="relative z-10 py-48 bg-white text-black">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-6xl md:text-8xl font-heading font-bold mb-12 leading-none">
                The <br/> <span className="text-gray-400">Tactile</span> <br/> Digital.
              </h2>
              <div className="space-y-12">
                {[
                  { icon: Layers, title: 'Multi-Phase Textiles', desc: 'Fabrics that change density based on ambient moisture and heat.' },
                  { icon: Shield, title: 'Signal Isolation', desc: 'Integrated faraday pockets for true digital privacy on the move.' },
                  { icon: Globe, title: 'Bio-Circular', desc: 'Every piece is 100% compostable or infinitely recyclable.' },
                ].map((feat, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-black/10 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                      <feat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase tracking-tight mb-2">{feat.title}</h4>
                      <p className="text-gray-500 max-w-sm">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
               <img src="https://images.unsplash.com/photo-1549174291-58230778a45a?q=80&w=1000&auto=format&fit=crop" alt="Craftsmanship" className="w-full h-full object-cover" />
               <div className="absolute inset-0 border-[20px] border-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-32 px-8 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between gap-16">
          <div className="font-heading text-6xl md:text-[12rem] font-bold opacity-10 select-none tracking-tighter">AURA</div>
          <div className="flex flex-col justify-end gap-4 text-[10px] font-mono opacity-50 uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-[#bef264]">Newsletter</a>
            <a href="#" className="hover:text-[#bef264]">Stockists</a>
            <a href="#" className="hover:text-[#bef264]">Sustainability Report</a>
            <p className="mt-8">© 2025 AURA COLLECTIVE / HUMAN CENTRIC DIGITAL WEAR</p>
          </div>
        </div>
      </footer>

      {/* ACQUISITION MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl"
            onClick={() => { setSelectedProduct(null); setPurchaseStep('idle'); }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#0a0a0a] border border-white/5 flex flex-col md:flex-row overflow-hidden shadow-2xl"
            >
              <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-30 p-2 text-white/40 hover:text-white"><X /></button>
              
              {/* Product View */}
              <div className="w-full md:w-1/2 h-96 md:h-auto relative bg-black">
                <motion.img 
                  layoutId={`img-${selectedProduct.id}`}
                  src={selectedProduct.image} 
                  className="w-full h-full object-cover opacity-80" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              </div>

              {/* Purchase Content */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col bg-[#050505]">
                <div className="mb-auto">
                  <span className="text-[#bef264] text-xs font-mono tracking-[0.5em] mb-4 block uppercase">{selectedProduct.category}</span>
                  <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-6 leading-none">{selectedProduct.name}</h3>
                  <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">{selectedProduct.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-12">
                    {selectedProduct.materials.map((m, i) => (
                      <div key={i} className="px-4 py-3 border border-white/10 text-[10px] font-mono uppercase tracking-[0.3em] opacity-40">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-8">
                    <span className="text-xs font-mono opacity-40 tracking-widest uppercase">Acquisition Price</span>
                    <span className="text-4xl font-bold text-[#bef264]">{selectedProduct.price}</span>
                  </div>

                  <button 
                    onClick={initiatePurchase}
                    disabled={purchaseStep !== 'idle'}
                    className={`w-full py-6 text-xs font-bold uppercase tracking-[0.5em] transition-all relative overflow-hidden flex items-center justify-center gap-4
                      ${purchaseStep === 'complete' ? 'bg-[#bef264] text-black' : 'bg-white text-black hover:bg-[#bef264]'}
                    `}
                  >
                    {purchaseStep === 'idle' && <><Package className="w-4 h-4" /> Secure Piece</>}
                    {purchaseStep === 'scanning' && <><Zap className="w-4 h-4 animate-spin" /> Verifying DNA...</>}
                    {purchaseStep === 'complete' && <><Fingerprint className="w-4 h-4" /> Ownership Verified</>}
                    
                    {purchaseStep === 'scanning' && (
                      <motion.div 
                        initial={{ left: '-100%' }} animate={{ left: '100%' }} transition={{ duration: 1, repeat: Infinity }}
                        className="absolute inset-0 bg-white/30 skew-x-12"
                      />
                    )}
                  </button>

                  {purchaseStep === 'complete' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-6 text-[9px] font-mono opacity-40 tracking-widest">
                      TRANSACTION RECORDED IN AURA ARCHIVE // ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
