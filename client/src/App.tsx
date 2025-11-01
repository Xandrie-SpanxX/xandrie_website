import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Label } from '@/components/ui/label.jsx'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Menu, X, ChevronDown, CheckCircle } from 'lucide-react'
import '@/App.css'
// Using public image paths instead of imports
const dominantWoman1 = '/dominant_woman_1.jpg'
const dominantWoman2 = '/dominant_woman_2.jpg'
const dominantWomanSilhouette = '/dominant_woman_silhouette.jpg'
const gagBall = '/gag_ball.jpg'
const powerControlArt = '/power_control_art.jpg'
const abstractHandControl = '/abstract_hand_control.jpg'
const stAndrewsCross = '/st_andrews_cross.png'

// --- New Thank You Page Component ---
function ThankYouPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-xl mx-auto p-8 text-center bg-gray-900 rounded-xl shadow-2xl border border-red-900/50">
        <CheckCircle size={64} className="text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4 text-red-400">Tribute Received. Thank You.</h1>
        <p className="text-xl text-gray-300 mb-8">
          Your payment has been successfully processed and your transaction is complete.
        </p>
        <p className="text-lg text-gray-400 mb-10">
          A discrete receipt will be sent via email for your records. Xandrie SpanxX acknowledges your commitment and will be in touch shortly regarding your application.
        </p>
        <a href="/" className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-lg transition-all transform hover:scale-105">
          Return to Xandrie SpanxX Home
        </a>
      </div>
    </div>
  );
}
// ------------------------------------

function App() {
  // Check for PayPal return URL parameter
  const isReturnPage = window.location.search.includes('payment_status=completed');

  if (isReturnPage) {
    return <ThankYouPage />;
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    attraction: '',
    seeking: '',
    dominanceType: '',
    engagement: '',
    limits: '',
    discretion: '',
    references: '',
    availability: '',
    expectations: '',
    safewords: '',
    consent: false,
    privacy: false,
  });

  const isTributeRequired = () => {
    const { dominanceType } = formData;
    return dominanceType === 'findom' || dominanceType === 'real_life';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Submit the form data to Formspree
    const form = e.currentTarget
    const formDataToSubmit = new FormData(form)
    
    fetch('https://formspree.io/f/xldobnpe', {
      method: 'POST',
      body: formDataToSubmit,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Play whip crack sound
        const audio = new Audio('/whip-crack.mp3')
        audio.play().catch(err => console.log('Audio play failed:', err))
        
        alert("Application submitted successfully! Xandrie SpanxX will review your application and contact you via the provided email address if you are a good fit. Thank you for your interest!")
        // Reset form
        setFormData({
          name: '',
          age: '',
          email: '',
          phone: '',
          location: '',
          experience: '',
          attraction: '',
          seeking: '',
          dominanceType: '',
          engagement: '',
          limits: '',
          discretion: '',
          references: '',
          availability: '',
          expectations: '',
          safewords: '',
          consent: false,
          privacy: false,
        })
        form.reset()
      } else {
        alert("There was an error submitting your application. Please try again.")
      }
    })
    .catch(error => {
      console.error('Error:', error)
      alert("There was an error submitting your application. Please try again.")
    })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                Xandrie SpanxX
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-red-500 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="hover:text-red-500 transition-colors">About</button>
              <button onClick={() => scrollToSection('services')} className="hover:text-red-500 transition-colors">Services</button>
              <button onClick={() => scrollToSection('application')} className="hover:text-red-500 transition-colors">Apply</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-red-500 transition-colors">Contact</button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-red-900/30">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left px-3 py-2 hover:bg-red-900/20 rounded">Home</button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left px-3 py-2 hover:bg-red-900/20 rounded">About</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left px-3 py-2 hover:bg-red-900/20 rounded">Services</button>
              <button onClick={() => scrollToSection('application')} className="block w-full text-left px-3 py-2 hover:bg-red-900/20 rounded">Apply</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-3 py-2 hover:bg-red-900/20 rounded">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src={dominantWoman1} 
            alt="Xandrie SpanxX" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent">
              Xandrie SpanxX
            </span>
          </h2>
          <p className="text-2xl md:text-3xl mb-8 text-gray-300 font-light">
            Your Assertive Guide to Uncharted Desires
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
            Where control meets craving. An experienced dominatrix, phone sex operator, and adult entertainer ready to guide submissive clients through transformative experiences.
          </p>
          <Button 
            onClick={() => scrollToSection('application')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-lg transition-all transform hover:scale-105"
          >
            Submit Your Application
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-red-500" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              About Xandrie SpanxX
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={dominantWoman2} 
                alt="Xandrie SpanxX Portrait" 
                className="rounded-lg shadow-2xl border-2 border-red-900/50"
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Xandrie SpanxX is not your typical adult entertainer. She embodies a commanding presence that transcends the ordinary, offering an experience rooted in power, control, and sophisticated dominance. With years of experience as a dominatrix, phone sex operator, and filmstar, Xandrie has perfected the art of assertive guidance.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Her philosophy is simple yet profound: she does not solicit sex, but rather serves as an assertive adult playmate who picks up the pieces of those who have lost their way. Through carefully crafted dynamics of dominance and submission, Xandrie helps her clients discover their true nature and embrace their desires with confidence.
              </p>
              
              <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-6 mt-8">
                <h3 className="text-xl font-bold mb-4 text-red-400">Core Principles</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▸</span>
                    <span><strong>Commanding Authority:</strong> Every interaction is guided by unwavering control and intelligence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▸</span>
                    <span><strong>Sophisticated Dominance:</strong> Elegance and refinement in every aspect of the experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▸</span>
                    <span><strong>Transformative Guidance:</strong> Helping submissives embrace their true nature</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">▸</span>
                    <span><strong>Uncompromising Standards:</strong> Only those truly committed need apply</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Services & Experiences
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <a href="https://www.paypal.com/ncp/payment/3NJVLELPT82JW" target="_blank" rel="noopener noreferrer" className="block bg-black border border-red-900/50 rounded-lg p-6 hover:border-red-500 transition-all transform hover:scale-105">
              <div className="mb-4">
                <img 
                  src={dominantWomanSilhouette} 
                  alt="Dominatrix Services" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-red-400">Dominatrix Sessions</h3>
              <p className="text-gray-400">Intense, personalized sessions designed to explore the depths of your submission. For the truly devoted.</p>
            </a>

            {/* Service 2 */}
            <a href="https://premium.chat/Goddess_Xandrie_Spanxx" target="_blank" rel="noopener noreferrer" className="block bg-black border border-red-900/50 rounded-lg p-6 hover:border-red-500 transition-all transform hover:scale-105">
              <div className="mb-4">
                <img 
                  src={gagBall} 
                  alt="Phone Sex Operator" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-red-400">Phone Sex Operator</h3>
              <p className="text-gray-400 mb-4">Experience Xandrie's commanding voice and expert guidance in real-time, intimate phone sessions.</p>
              <p className="text-red-400 font-bold">727-604-6669</p>
              <p className="text-gray-400 text-sm mt-2">Premium.Chat: <a href="https://premium.chat/Goddess_Xandrie_Spanxx" className="text-red-500 hover:text-red-400">Goddess_Xandrie_Spanxx</a></p>
            </a>

            {/* Service 3 */}
            <div className="bg-black border border-red-900/50 rounded-lg p-6">
              <div className="mb-4">
                <img 
                  src={dominantWomanSilhouette} 
                  alt="Adult Filmstar" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-red-400">Adult Filmstar</h3>
              <p className="text-gray-400">Explore a curated selection of Xandrie's powerful performances in the world of adult film.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Section */}
      <section id="application" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Client Application
            </span>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8" method="POST" action="https://formspree.io/f/xldobnpe">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="name" className="text-gray-300">Name/Alias *</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900 border-red-900/50 text-white mt-2"
                  placeholder="Your preferred name"
                />
              </div>
              <div>
                <Label htmlFor="age" className="text-gray-300">Age *</Label>
                <Input 
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900 border-red-900/50 text-white mt-2"
                  placeholder="Must be 18+"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-900 border-red-900/50 text-white mt-2"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-gray-900 border-red-900/50 text-white mt-2"
                  placeholder="(Optional) Your phone number"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="location" className="text-gray-300">Location (City, Country)</Label>
              <Input 
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="bg-gray-900 border-red-900/50 text-white mt-2"
                placeholder="For consideration of in-person sessions"
              />
            </div>

            {/* Experience & Desires */}
            <div>
              <Label htmlFor="experience" className="text-gray-300">Previous Experience with Dominance/Submission</Label>
              <Textarea 
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="bg-gray-900 border-red-900/50 text-white mt-2 min-h-[100px]"
                placeholder="Describe your background, if any..."
              />
            </div>
            
            <div>
              <Label htmlFor="attraction" className="text-gray-300">What attracts you to Xandrie SpanxX? *</Label>
              <Textarea 
                id="attraction"
                name="attraction"
                value={formData.attraction}
                onChange={handleInputChange}
                required
                className="bg-gray-900 border-red-900/50 text-white mt-2 min-h-[100px]"
                placeholder="Be specific about what you find compelling..."
              />
            </div>

            <div>
              <Label htmlFor="seeking" className="text-gray-300">What are you seeking from this experience? *</Label>
              <Textarea 
                id="seeking"
                name="seeking"
                value={formData.seeking}
                onChange={handleInputChange}
                required
                className="bg-gray-900 border-red-900/50 text-white mt-2 min-h-[100px]"
                placeholder="Describe your goals, desires, and expectations..."
              />
            </div>

            {/* Type of Dominance */}
            <div>
              <Label className="text-gray-300 mb-4 block">What type of dominance are you seeking? *</Label>
              <RadioGroup 
                value={formData.dominanceType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, dominanceType: value }))}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 bg-gray-900 p-4 rounded-lg border border-red-900/30 hover:border-red-500 transition-colors">
                  <RadioGroupItem value="findom" id="findom" />
                  <Label htmlFor="findom" className="text-gray-300 cursor-pointer flex-1">
                    <span className="font-bold text-red-400">Financial Domination (Findom)</span> - Dedicated to financial tribute and control.
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-900 p-4 rounded-lg border border-red-900/30 hover:border-red-500 transition-colors">
                  <RadioGroupItem value="real_life" id="real_life" />
                  <Label htmlFor="real_life" className="text-gray-300 cursor-pointer flex-1">
                    <span className="font-bold text-red-400">Real Life Sessions</span> - In-person dominatrix sessions.
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-900 p-4 rounded-lg border border-red-900/30 hover:border-red-500 transition-colors">
                  <RadioGroupItem value="hotline" id="hotline" />
                  <Label htmlFor="hotline" className="text-gray-300 cursor-pointer flex-1">
                    <span className="font-bold text-red-400">Hotline / Phone Sessions</span> - Verbal dominance and control via phone.
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-900 p-4 rounded-lg border border-red-900/30 hover:border-red-500 transition-colors">
                  <RadioGroupItem value="online_chat" id="online_chat" />
                  <Label htmlFor="online_chat" className="text-gray-300 cursor-pointer flex-1">
                    <span className="font-bold text-red-400">Online Chat / Text Sessions</span> - Digital dominance and interaction.
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-900 p-4 rounded-lg border border-red-900/30 hover:border-red-500 transition-colors">
                  <RadioGroupItem value="video_chat" id="video_chat" />
                  <Label htmlFor="video_chat" className="text-gray-300 cursor-pointer flex-1">
                    <span className="font-bold text-red-400">Video Chat Sessions</span> - Visual and verbal dominance via video call.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Conditional Tribute Section */}
            {isTributeRequired() && (
              <div>
                <Label className="text-gray-300 mb-4 block">Tribute Requirement *</Label>
                <p className="text-gray-400 text-sm mb-4">For Financial Domination and Real Life Sessions, a tribute is required to proceed with your application. Please use the PayPal button below.</p>
                <div className="my-4">
                  <form action="https://www.paypal.com/ncp/payment/3NJVLELPT82JW" method="post" target="_blank" style={{display:
                  'inline-grid', justifyContent: 'center', alignContent: 'start', gap: '0.5rem'}}>
                    <input className="pp-3NJVLELPT82JW" type="submit" value="Submit Tribute" />
                    <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" />
                    <section style={{fontSize: '0.75rem'}}> Powered by <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" style={{height:'0.875rem',verticalAlign:'middle'}}/>
                    </section>
                  </form>
                </div>
              </div>
            )}

            {/* Engagement Level */}
            <div>
              <Label htmlFor="engagement" className="text-gray-300">Desired Level of Engagement/Interaction *</Label>
              <Input 
                id="engagement"
                name="engagement"
                value={formData.engagement}
                onChange={handleInputChange}
                required
                className="bg-gray-900 border-red-900/50 text-white mt-2"
                placeholder="e.g., Weekly sessions, monthly check-ins, ongoing relationship"
              />
            </div>

            {/* Limits */}
            <div>
              <Label htmlFor="limits" className="text-gray-300">Limits or Boundaries</Label>
              <Textarea 
                id="limits"
                name="limits"
                value={formData.limits}
                onChange={handleInputChange}
                className="bg-gray-900 border-red-900/50 text-white mt-2 min-h-[100px]"
                placeholder="Describe any hard limits or boundaries..."
              />
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleCheckboxChange('consent', checked as boolean)}
                  className="mt-1 border-red-900/50"
                />
                <Label htmlFor="consent" className="text-gray-300 cursor-pointer leading-relaxed">
                  I acknowledge that I am 18 years or older and consent to engage in adult-oriented dominance/submission dynamics with Xandrie SpanxX. I understand the nature of these services and enter this application of my own free will.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="privacy"
                  checked={formData.privacy}
                  onCheckedChange={(checked) => handleCheckboxChange('privacy', checked as boolean)}
                  className="mt-1 border-red-900/50"
                />
                <Label htmlFor="privacy" className="text-gray-300 cursor-pointer leading-relaxed">
                  I understand that all information provided will be kept strictly confidential and used solely for the purpose of evaluating my suitability as a client of Xandrie SpanxX.
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit"
                disabled={!formData.consent || !formData.privacy}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Submit Application
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>Applications are reviewed personally by Xandrie SpanxX. Only serious inquiries will receive a response.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            For inquiries, collaborations, or to discuss your application, reach out through the following channels.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900 border border-red-900/50 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-red-400">Professional Inquiries</h3>
              <p className="text-gray-300 mb-4">For business collaborations, media requests, or professional opportunities.</p>
              <a href="mailto:Xandrie.SpanxX@bdsmail.com" className="text-red-500 hover:text-red-400 transition-colors">
                Xandrie.SpanxX@bdsmail.com
              </a>
              <p className="text-gray-400 mt-4">Premium.Chat:</p>
              <a href="https://premium.chat/Goddess_Xandrie_Spanxx" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
                premium.chat/Goddess_Xandrie_Spanxx
              </a>
            </div>

            <div className="bg-gray-900 border border-red-900/50 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4 text-red-400">Client Services</h3>
              <p className="text-gray-300 mb-4">For current or prospective clients seeking sessions or guidance.</p>
              <a href="mailto:Xandrie.SpanxX@bdsmail.com" className="text-red-500 hover:text-red-400 transition-colors font-bold">
                Xandrie.SpanxX@bdsmail.com
              </a>
              <p className="text-gray-400 mt-4">Phone:</p>
              <a href="tel:727-604-6669" className="text-red-500 hover:text-red-400 transition-colors font-bold text-lg">
                727-604-6669
              </a>
              <p className="text-gray-400 mt-4">Premium.Chat:</p>
              <a href="https://premium.chat/Goddess_Xandrie_Spanxx" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">
                premium.chat/Goddess_Xandrie_Spanxx
              </a>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4 text-red-400">Discretion Guaranteed</h3>
            <p className="text-gray-300 leading-relaxed">
              All communications with Xandrie SpanxX are handled with the utmost confidentiality and professionalism. Your privacy is paramount, and all interactions are conducted with complete discretion. Whether you're a prospective client or a professional contact, you can trust that your information will be protected.
            </p>
          </div>

          <div className="mt-12">
            <img 
              src={stAndrewsCross} 
              alt="St. Andrew's Cross" 
              className="w-full max-w-md mx-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Tips & Appreciation Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Show Your Appreciation
            </span>
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            If you'd like to show your appreciation for Xandrie SpanxX's time and expertise, tips are always welcome and deeply appreciated.
          </p>
          <div id="paypal-container-PUUUKTNVG2QRG" className="flex justify-center"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-900/30 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p className="mb-2">© 2025 Xandrie SpanxX. All rights reserved.</p>
          <p className="text-sm">This website contains adult-oriented content. By accessing this site, you confirm you are 18 years or older.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

