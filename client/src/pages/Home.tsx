import { Button } from '@/components/ui/button'
import { APP_LOGO, APP_TITLE } from '@/const'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />}
            <span className="text-xl font-bold text-red-500">{APP_TITLE}</span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/documents'}>
              Documents
            </Button>
            <Button onClick={() => window.location.href = '/login'}>
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-red-500">
            {APP_TITLE}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your Assertive Guide to Uncharted Desires
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => window.location.href = '/login'}>
              Browse Performers
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = '/login'}>
              Apply as Performer
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-red-500 text-center">
              Our Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold text-red-500 mb-3">Financial Domination</h3>
                <p className="text-gray-300">
                  Experience the thrill of financial submission with our specialized findom performers. Tribute, worship, and submit to financial control in a safe, consensual environment.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold text-red-500 mb-3">BDSM & Domination</h3>
                <p className="text-gray-300">
                  Connect with experienced dominatrices specializing in bondage, discipline, and power exchange. Explore your submissive fantasies with professional performers.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold text-red-500 mb-3">Niche Fetishes</h3>
                <p className="text-gray-300">
                  Discover performers specializing in your specific interests. From roleplay to humiliation, we connect you with experts in your favorite niches.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-red-500 text-center">
              Why Choose Omerta Angels?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-3">For Clients</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Verified and screened performers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Complete privacy and discretion guaranteed</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Secure payment processing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Professional legal agreements and contracts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Browse exclusive content and galleries</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-500 mb-3">For Performers</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Earn 70% commission on all transactions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Full control over your content and pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Complete privacy and anonymity options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Professional support and resources</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">✓</span>
                    <span>Secure client screening and verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-red-900/20 border-t border-b border-red-900/30">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-red-500">
              Ready to Explore?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join Omerta Angels and connect with a community of professional adult entertainers and verified clients.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => window.location.href = '/login'}>
                Browse Performers
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = '/login'}>
                Apply as Performer
              </Button>
            </div>
          </div>
        </section>

        {/* Platform Information - Small Footer Section */}
        <section className="py-8 px-4 bg-gray-900/30 border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4 text-center">
              Platform Security & Privacy
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-center text-xs text-gray-500">
              <div>
                <p className="font-semibold text-gray-300 mb-1">Secure Storage</p>
                <p>All documents and files securely stored</p>
              </div>
              <div>
                <p className="font-semibold text-gray-300 mb-1">Legal Agreements</p>
                <p>Professional contracts and waivers</p>
              </div>
              <div>
                <p className="font-semibold text-gray-300 mb-1">Privacy Protected</p>
                <p>Your information is never shared</p>
              </div>
              <div>
                <p className="font-semibold text-gray-300 mb-1">Verified Users</p>
                <p>All participants are screened</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-red-900/30 bg-black/50 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>&copy; 2025 Omerta Angels. All rights reserved.</p>
          <p className="mt-2">Operated by Madame Xandrie Spanxx | 727-613-6157</p>
          <p className="mt-4 text-xs text-gray-500">
            This is an adult entertainment platform. All participants must be 18+. By accessing this site, you agree to our terms and conditions.
          </p>
        </div>
      </footer>
    </div>
  )
}

