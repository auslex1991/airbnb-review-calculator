import Calculator from '@/components/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-airbnb-light">
      {/* Nav */}
      <nav className="border-b border-airbnb-border bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-airbnb-red text-2xl">★</span>
            <span className="font-semibold text-airbnb-dark text-sm">
              Airbnb Review Calculator
            </span>
          </div>
          <a
            href="#how-it-works"
            className="text-sm text-airbnb-gray hover:text-airbnb-dark transition-colors"
          >
            How it works
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-1.5 bg-[#FFF1EE] text-airbnb-red text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <span>★</span>
          <span>FREE TOOL FOR AIRBNB HOSTS</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-airbnb-dark leading-tight mb-4">
          How many 5-star reviews
          <br className="hidden md:block" /> do you need?
        </h1>
        <p className="text-lg text-airbnb-gray max-w-xl mx-auto mb-10">
          Enter your listing's current stats and target rating — we'll tell you
          exactly how many perfect reviews it takes to get there.
        </p>

        {/* Calculator */}
        <Calculator />
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="max-w-3xl mx-auto px-4 py-16 border-t border-airbnb-border"
      >
        <h2 className="text-2xl font-bold text-airbnb-dark text-center mb-10">
          How it works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Enter your stats',
              desc: 'Input your total number of reviews and your current average rating from your Airbnb host dashboard.',
            },
            {
              step: '2',
              title: 'Set your target',
              desc: 'Choose the average rating you want to reach — even a small jump like 4.90 → 4.91 makes a difference.',
            },
            {
              step: '3',
              title: 'See your number',
              desc: 'The calculator instantly shows you exactly how many 5-star reviews are needed to hit your goal.',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-airbnb-red text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                {step}
              </div>
              <h3 className="font-semibold text-airbnb-dark mb-2">{title}</h3>
              <p className="text-sm text-airbnb-gray leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ – great for SEO */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-airbnb-dark mb-8">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-6">
          {[
            {
              q: 'Why do I need so many reviews to move my rating?',
              a: 'The more reviews you have, the harder it is to shift your average. A single 5-star review has much more impact on a listing with 10 reviews than one with 500. This is called the "anchoring effect" of large sample sizes.',
            },
            {
              q: 'Does Airbnb round or truncate the displayed rating?',
              a: 'Airbnb rounds the displayed rating to 2 decimal places using standard rounding (e.g., 4.905 rounds to 4.91). This calculator uses the same method.',
            },
            {
              q: 'What if my target is 5.00?',
              a: 'Reaching a perfect 5.00 average is extremely difficult once you have many reviews, since any non-5-star review pulls the average down. The calculator will show you the number, but it may be in the thousands.',
            },
            {
              q: 'How can I get more 5-star reviews?',
              a: 'Communicate clearly before and during the stay, keep your listing immaculately clean, provide small extras that exceed expectations, and follow up with a friendly message after checkout. Responding promptly to any issues also makes guests more forgiving.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-airbnb-border pb-6">
              <h3 className="font-semibold text-airbnb-dark mb-2">{q}</h3>
              <p className="text-sm text-airbnb-gray leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-airbnb-border bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-airbnb-gray">
          <span>
            © {new Date().getFullYear()} Airbnb Review Calculator. Not affiliated
            with Airbnb, Inc.
          </span>
          <span>Built for hosts, by hosts.</span>
        </div>
      </footer>
    </main>
  )
}
