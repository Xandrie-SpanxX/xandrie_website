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
              Enter Platform
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = '/documents'}>
              View Documents
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-red-500 text-center">
              About {APP_TITLE}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Omerta Angels is the premier platform for adult entertainers specializing in findom, BDSM, and niche fetish services. We provide a safe, professional, and lucrative environment for performers to showcase their talents and connect with verified clients.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold text-red-500 mb-3">For Performers</h3>
                <p className="text-gray-300">
                  Manage galleries, upload content, and earn 70% commission on all transactions. Full control over your content and privacy.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold text-red-500 mb-3">For Clients</h3>
                <p className="text-gray-300">
                  Browse verified performers, access exclusive content, and connect with specialists in your niche interests safely and discreetly.
                </p>
              </div>
              <div className="bg-gray-800/50 p-6 rounded-lg border border-red-900/30">
                <h3 className="text-xl font-bold text-red-500 mb-3">Professional Standards</h3>
                <p className="text-gray-300">
                  Comprehensive contracts, waivers, and legal protection for all parties. Secure payment processing and confidentiality guaranteed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-red-500 text-center">
              Platform Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-red-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-3">✓ Secure File Storage</h3>
                <p className="text-gray-300">Upload and manage photos, videos, and documents with full approval workflow and privacy controls.</p>
              </div>
              <div className="border border-red-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-3">✓ Gallery Management</h3>
                <p className="text-gray-300">Organize content into galleries with customizable pricing and access controls.</p>
              </div>
              <div className="border border-red-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-3">✓ Legal Documents</h3>
                <p className="text-gray-300">Professional contracts, waivers, and agreements for all service types and dynamics.</p>
              </div>
              <div className="border border-red-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-3">✓ Secure Messaging</h3>
                <p className="text-gray-300">Encrypted communication between performers and clients with full confidentiality.</p>
              </div>
              <div className="border border-red-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-3">✓ Payment Processing</h3>
                <p className="text-gray-300">Multiple payment options with secure processing and detailed earnings reports.</p>
              </div>
              <div className="border border-red-900/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-500 mb-3">✓ Avatar System</h3>
                <p className="text-gray-300">Represent yourself with custom avatars for additional privacy and anonymity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-red-900/20 border-t border-b border-red-900/30">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-red-500">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join Omerta Angels today and connect with a community of professional adult entertainers and verified clients.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => window.location.href = '/login'}>
                Create Account
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = '/documents'}>
                Review Documents
              </Button>
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

