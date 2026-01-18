
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <motion.div
      className="group relative h-[500px] md:h-full w-full overflow-hidden border border-white/5 bg-[#0a0a0a] cursor-pointer min-h-[400px]"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="absolute inset-0 overflow-hidden bg-black">
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.5, filter: 'grayscale(100%)' },
            hover: { scale: 1.08, opacity: 0.9, filter: 'grayscale(0%)' }
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
      </div>

      {/* Grid Lines Pattern (High Design) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none border-r border-b border-white/10" />

      {/* Overlay Info */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-[10px] font-mono border border-white/20 px-4 py-2 rounded-full backdrop-blur-3xl bg-black/40 text-white tracking-[0.3em] uppercase">
             {product.category}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, scale: 0.8, x: 10 },
               hover: { opacity: 1, scale: 1, x: 0 }
             }}
             className="bg-[#bef264] text-black rounded-full p-4 shadow-2xl"
           >
             <ArrowUpRight className="w-6 h-6" />
           </motion.div>
        </div>

        <div>
          <div className="overflow-hidden mb-4">
            <motion.h3 
              className="font-heading text-3xl md:text-4xl font-bold uppercase text-white leading-none"
              variants={{
                rest: { y: 20, opacity: 0 },
                hover: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {product.name}
            </motion.h3>
          </div>
          <div className="flex items-center gap-6">
            <motion.p 
              className="text-2xl font-mono text-[#bef264]"
              variants={{
                rest: { x: -10, opacity: 0 },
                hover: { x: 0, opacity: 1 }
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {product.price}
            </motion.p>
            <motion.div 
              className="h-px bg-white/20 flex-1"
              variants={{
                rest: { scaleX: 0 },
                hover: { scaleX: 1 }
              }}
              transition={{ duration: 0.6, ease: "circOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
