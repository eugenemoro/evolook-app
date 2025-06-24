export default function HowItWorks() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-8">How It Works</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="text-lg font-medium mb-2">Upload your photo</h3>
          <p className="text-sm text-neutral-600">
            And add your body measurements
          </p>
        </div>
        <div className="p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-lg font-medium mb-2">Define your style</h3>
          <p className="text-sm text-neutral-600">
            Describe it or upload a reference look
          </p>
        </div>
        <div className="p-6 rounded-xl border border-neutral-200 shadow-sm text-center">
          <div className="text-4xl mb-4">🛍️</div>
          <h3 className="text-lg font-medium mb-2">Get styled</h3>
          <p className="text-sm text-neutral-600">
            Browse and shop AI-generated outfits
          </p>
        </div>
      </div>
    </section>
  );
}
