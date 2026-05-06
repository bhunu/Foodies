import { useState } from 'react'

const dishes = [
  {
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter and seasonal greens.',
    price: 24,
    emoji: '🐟',
    tag: "Chef's Pick",
  },
  {
    name: 'Truffle Pasta',
    description: 'Handmade pappardelle with black truffle and parmesan cream.',
    price: 19,
    emoji: '🍝',
    tag: 'Fan Favourite',
  },
  {
    name: 'Wagyu Burger',
    description: 'A5 wagyu patty, caramelised onion, aged cheddar, brioche bun.',
    price: 22,
    emoji: '🍔',
    tag: 'Bestseller',
  },
  {
    name: 'Mezze Platter',
    description: 'Hummus, falafel, tabbouleh, warm pita and roasted vegetables.',
    price: 16,
    emoji: '🥗',
    tag: 'Veggie',
  },
]

type Form = { name: string; address: string; phone: string }

function OrderDialog({ open, onClose, cart, onAdd, onRemove }: {
  open: boolean
  onClose: () => void
  cart: Record<string, number>
  onAdd: (name: string) => void
  onRemove: (name: string) => void
}) {
  const [form, setForm] = useState<Form>({ name: '', address: '', phone: '' })
  const [placed, setPlaced] = useState(false)

  const cartItems = dishes
    .filter(d => cart[d.name])
    .map(d => ({ ...d, qty: cart[d.name] }))

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPlaced(true)
  }

  const handleClose = () => {
    setPlaced(false)
    setForm({ name: '', address: '', phone: '' })
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Your Order</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer"
          >
            ×
          </button>
        </div>

        {placed ? (
          /* Success state */
          <div className="px-7 py-16 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h3>
            <p className="text-gray-500 mb-8">
              Thanks, <span className="font-semibold text-gray-700">{form.name}</span>!
              Your food will arrive in under 30 minutes.
            </p>
            <button
              onClick={handleClose}
              className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-6">

            {/* Cart items */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                Order Summary
              </h3>

              {cartItems.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-4xl mb-2">🛒</div>
                  <p className="text-sm">Your cart is empty. Add some dishes first!</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {cartItems.map(item => (
                    <li key={item.name} className="flex items-center gap-4">
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">${item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onRemove(item.name)}
                          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold flex items-center justify-center cursor-pointer transition-colors"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-semibold text-gray-900">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => onAdd(item.name)}
                          className="w-7 h-7 rounded-full bg-orange-100 hover:bg-orange-500 hover:text-white text-orange-600 font-bold flex items-center justify-center cursor-pointer transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-12 text-right">
                        ${item.price * item.qty}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {cartItems.length > 0 && (
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                  <span className="font-semibold text-gray-700">Total</span>
                  <span className="text-xl font-extrabold text-orange-500">${total}</span>
                </div>
              )}
            </div>

            {/* Delivery details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                Delivery Details
              </h3>
              <div className="space-y-3">
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                <input
                  required
                  type="text"
                  placeholder="Delivery address"
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={cartItems.length === 0}
              className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-full hover:bg-orange-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Place Order · ${total}
            </button>

          </form>
        )}
      </div>
    </div>
  )
}

function App() {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [dialogOpen, setDialogOpen] = useState(false)

  const addToCart = (name: string) =>
    setCart(prev => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }))

  const removeFromCart = (name: string) =>
    setCart(prev => {
      const updated = { ...prev }
      if (updated[name] <= 1) delete updated[name]
      else updated[name]--
      return updated
    })

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      <OrderDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
      />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-40">
        <span className="text-2xl font-bold text-orange-500 tracking-tight">
          🍴 Foodies
        </span>
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <li><a href="#menu" className="hover:text-orange-500 transition-colors">Menu</a></li>
          <li><a href="#why" className="hover:text-orange-500 transition-colors">Why Us</a></li>
          <li><a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a></li>
        </ul>
        <button
          onClick={() => setDialogOpen(true)}
          className="relative bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-orange-600 transition-colors cursor-pointer"
        >
          Order Now
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* Hero */}
      <section className="px-8 py-20 md:py-32 max-w-5xl mx-auto text-center">
        <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          Fresh · Local · Delicious
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 mb-6">
          Food that makes<br />
          <span className="text-orange-500">you smile</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
          Carefully crafted dishes made with locally sourced ingredients, delivered hot to your door in under 30 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="bg-orange-500 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-orange-600 transition-colors text-base"
          >
            Explore Menu
          </a>
          <a
            href="#why"
            className="border border-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-full hover:bg-gray-50 transition-colors text-base"
          >
            How it works
          </a>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="bg-orange-50 py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why choose Foodies?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌿', title: 'Fresh Ingredients', desc: 'We source produce daily from local farms and markets — no frozen shortcuts.' },
              { icon: '⚡', title: '30-Min Delivery', desc: 'Guaranteed hot delivery in under 30 minutes or your next meal is on us.' },
              { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Our team of award-winning chefs craft every dish with passion and precision.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 text-center shadow-sm">
                <span className="text-4xl">{item.icon}</span>
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">Popular Dishes</h2>
          <p className="text-center text-gray-500 mb-12">Crowd favourites, freshly made every day.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dishes.map((dish) => (
              <div
                key={dish.name}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="text-5xl mb-4">{dish.emoji}</div>
                <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest mb-2">
                  {dish.tag}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{dish.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{dish.description}</p>
                <div className="flex items-center justify-between mt-5">
                  <span className="text-xl font-bold text-orange-500">${dish.price}</span>
                  <button
                    onClick={() => addToCart(dish.name)}
                    className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {cart[dish.name] ? `Add + (${cart[dish.name]})` : 'Add +'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="contact" className="bg-orange-500 py-20 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Ready to eat well?
        </h2>
        <p className="text-orange-100 mb-8 max-w-md mx-auto">
          Join thousands of happy customers and get your first delivery free.
        </p>
        <button
          onClick={() => setDialogOpen(true)}
          className="bg-white text-orange-500 font-bold px-8 py-3.5 rounded-full hover:bg-orange-50 transition-colors inline-block cursor-pointer"
        >
          Get Started — It's Free
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Foodies. Made with ❤️ and good ingredients.
      </footer>

    </div>
  )
}

export default App
