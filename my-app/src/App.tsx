function App() {
  const dishes = [
    {
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with lemon butter and seasonal greens.',
      price: '$24',
      emoji: '🐟',
      tag: "Chef's Pick",
    },
    {
      name: 'Truffle Pasta',
      description: 'Handmade pappardelle with black truffle and parmesan cream.',
      price: '$19',
      emoji: '🍝',
      tag: 'Fan Favourite',
    },
    {
      name: 'Wagyu Burger',
      description: 'A5 wagyu patty, caramelised onion, aged cheddar, brioche bun.',
      price: '$22',
      emoji: '🍔',
      tag: 'Bestseller',
    },
    {
      name: 'Mezze Platter',
      description: 'Hummus, falafel, tabbouleh, warm pita and roasted vegetables.',
      price: '$16',
      emoji: '🥗',
      tag: 'Veggie',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <span className="text-2xl font-bold text-orange-500 tracking-tight">
          🍴 Foodies
        </span>
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <li><a href="#menu" className="hover:text-orange-500 transition-colors">Menu</a></li>
          <li><a href="#why" className="hover:text-orange-500 transition-colors">Why Us</a></li>
          <li><a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a></li>
        </ul>
        <a
          href="#menu"
          className="bg-orange-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-orange-600 transition-colors"
        >
          Order Now
        </a>
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
                  <span className="text-xl font-bold text-orange-500">{dish.price}</span>
                  <button className="bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-orange-500 hover:text-white transition-colors cursor-pointer">
                    Add +
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
        <a
          href="#menu"
          className="bg-white text-orange-500 font-bold px-8 py-3.5 rounded-full hover:bg-orange-50 transition-colors inline-block"
        >
          Get Started — It's Free
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Foodies. Made with ❤️ and good ingredients.
      </footer>

    </div>
  )
}

export default App
