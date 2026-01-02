import React, { useState } from 'react';
import { ShoppingBag, Plus, Edit, Trash2, GripVertical, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedCard, AnimatedCardContent, AnimatedCardHeader, AnimatedCardTitle } from '@/components/ui/AnimatedCard';
import { AnimatedInput } from '@/components/ui/AnimatedInput';

/**
 * TailorShop - Marketplace management for tailors
 */
const TailorShop: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Gold Pearl Buttons (6pc)', price: 250, stock: 45, category: 'Buttons' },
    { id: 2, name: 'Floral Embroidery Patch', price: 450, stock: 30, category: 'Patches' },
    { id: 3, name: 'Crystal Sequin Pack', price: 350, stock: 60, category: 'Sequins' },
    { id: 4, name: 'Zari Thread Bundle', price: 280, stock: 25, category: 'Threads' },
  ]);

  const categories = ['All', 'Buttons', 'Patches', 'Sequins', 'Threads', 'Lace'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-gold" />
            My Shop
          </h1>
          <p className="text-muted-foreground">Manage your accessories inventory</p>
        </div>
        <Button variant="gold" onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <AnimatedCard variant="bordered" className="animate-fade-scale">
          <AnimatedCardHeader>
            <AnimatedCardTitle>Add New Product</AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatedInput label="Product Name" />
              <AnimatedInput label="Price (Rs.)" type="number" />
              <AnimatedInput label="Stock Quantity" type="number" />
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="w-full h-12 px-4 bg-card border-2 border-border rounded-xl focus:border-primary outline-none">
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="gold">
                <Sparkles className="w-4 h-4 mr-2" />
                Add Product
              </Button>
              <Button variant="ghost" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </AnimatedCardContent>
        </AnimatedCard>
      )}

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`
              px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300
              ${selectedCategory === cat
                ? 'bg-gold text-accent-foreground shadow-lg shadow-gold/25'
                : 'bg-muted hover:bg-muted/80'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <AnimatedCard variant="bordered">
        <AnimatedCardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Stock</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b border-border/50 hover:bg-muted/30 transition-colors animate-slide-up stagger-${index + 1}`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-coral/20 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-gold" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-muted rounded-full text-xs">{product.category}</span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-primary">Rs. {product.price}</td>
                    <td className="py-4 px-4">
                      <span className={`${product.stock < 30 ? 'text-destructive' : 'text-mint'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedCardContent>
      </AnimatedCard>
    </div>
  );
};

export default TailorShop;
