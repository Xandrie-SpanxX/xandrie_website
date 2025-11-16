import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'

export default function ClientInquiry() {
  const [formData, setFormData] = useState({
    name: '',
    alias: '',
    email: '',
    phone: '',
    dominanceType: 'findom',
    experience: '',
    interests: '',
    tributeAmount: '',
    availability: '',
    questions: '',
    agreeTerms: false,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      dominanceType: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim()) {
      toast.error('Name is required')
      return
    }
    if (!formData.email.trim()) {
      toast.error('Email is required')
      return
    }
    if (!formData.phone.trim()) {
      toast.error('Phone number is required')
      return
    }
    if (!formData.agreeTerms) {
      toast.error('You must agree to the terms and conditions')
      return
    }

    setLoading(true)

    try {
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/xyzgvwvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          alias: formData.alias,
          email: formData.email,
          phone: formData.phone,
          dominanceType: formData.dominanceType,
          experience: formData.experience,
          interests: formData.interests,
          tributeAmount: formData.tributeAmount,
          availability: formData.availability,
          questions: formData.questions,
        }),
      })

      if (response.ok) {
        toast.success('Application submitted successfully!')
        // Play whip crack sound
        const audio = new Audio('/whip-crack.mp3')
        audio.play().catch(err => console.log('Audio play failed:', err))
        
        // Redirect to thank you page
        setTimeout(() => {
          window.location.href = '/thank-you'
        }, 1500)
      } else {
        toast.error('Failed to submit application. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => window.location.href = '/'} className="mb-6">
            ← Back to Home
          </Button>
          <h1 className="text-4xl font-bold text-red-500 mb-2">Client Inquiry Form</h1>
          <p className="text-gray-300">
            Complete this form to inquire about services with Madame Xandrie Spanxx
          </p>
        </div>

        {/* Form */}
        <Card className="bg-gray-900/50 border-red-900/30">
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
            <CardDescription>All fields marked with * are required</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Alias */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Full Name or Legal Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="alias" className="text-white">
                    Preferred Alias or Nickname
                  </Label>
                  <Input
                    id="alias"
                    name="alias"
                    type="text"
                    placeholder="How you'd like to be addressed"
                    value={formData.alias}
                    onChange={handleChange}
                    className="mt-2 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-bold text-red-500 mb-4">Service Preferences</h3>
              </div>

              {/* Dominance Type Selection */}
              <div>
                <Label className="text-white font-semibold mb-3 block">
                  What type of service are you interested in? *
                </Label>
                <RadioGroup value={formData.dominanceType} onValueChange={handleRadioChange}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-red-500/50 cursor-pointer">
                      <RadioGroupItem value="findom" id="findom" />
                      <Label htmlFor="findom" className="cursor-pointer flex-1 m-0">
                        <span className="font-semibold text-red-500">Financial Domination (Findom)</span>
                        <p className="text-sm text-gray-400">Tribute-based financial submission and worship</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-red-500/50 cursor-pointer">
                      <RadioGroupItem value="bdsm" id="bdsm" />
                      <Label htmlFor="bdsm" className="cursor-pointer flex-1 m-0">
                        <span className="font-semibold text-red-500">BDSM & Domination</span>
                        <p className="text-sm text-gray-400">Bondage, discipline, and power exchange</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-700 hover:border-red-500/50 cursor-pointer">
                      <RadioGroupItem value="niche" id="niche" />
                      <Label htmlFor="niche" className="cursor-pointer flex-1 m-0">
                        <span className="font-semibold text-red-500">Niche Fetish Services</span>
                        <p className="text-sm text-gray-400">Specialized roleplay and fantasy services</p>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Experience Level */}
              <div>
                <Label htmlFor="experience" className="text-white">
                  Experience Level with BDSM/Domination
                </Label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  className="mt-2 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                >
                  <option value="">Select your experience level</option>
                  <option value="beginner">Beginner / New to this</option>
                  <option value="intermediate">Intermediate / Some experience</option>
                  <option value="experienced">Experienced / Well-versed</option>
                  <option value="expert">Expert / Professional background</option>
                </select>
              </div>

              {/* Interests */}
              <div>
                <Label htmlFor="interests" className="text-white">
                  Specific Interests or Fantasies
                </Label>
                <Textarea
                  id="interests"
                  name="interests"
                  placeholder="Describe your interests, fantasies, or what you're looking for..."
                  value={formData.interests}
                  onChange={handleChange}
                  className="mt-2 bg-gray-800 border-gray-700 text-white min-h-24"
                />
              </div>

              {/* Conditional Tribute Amount */}
              {(formData.dominanceType === 'findom' || formData.dominanceType === 'bdsm') && (
                <div>
                  <Label htmlFor="tributeAmount" className="text-white">
                    Initial Tribute Amount (if applicable)
                  </Label>
                  <Input
                    id="tributeAmount"
                    name="tributeAmount"
                    type="text"
                    placeholder="e.g., $100, $500, etc."
                    value={formData.tributeAmount}
                    onChange={handleChange}
                    className="mt-2 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              )}

              {/* Availability */}
              <div>
                <Label htmlFor="availability" className="text-white">
                  Your Availability
                </Label>
                <Textarea
                  id="availability"
                  name="availability"
                  placeholder="When are you typically available? (timezone, hours, etc.)"
                  value={formData.availability}
                  onChange={handleChange}
                  className="mt-2 bg-gray-800 border-gray-700 text-white min-h-20"
                />
              </div>

              {/* Additional Questions */}
              <div>
                <Label htmlFor="questions" className="text-white">
                  Additional Questions or Comments
                </Label>
                <Textarea
                  id="questions"
                  name="questions"
                  placeholder="Anything else you'd like me to know?"
                  value={formData.questions}
                  onChange={handleChange}
                  className="mt-2 bg-gray-800 border-gray-700 text-white min-h-20"
                />
              </div>

              {/* Terms Agreement */}
              <div className="border-t border-gray-700 pt-6">
                <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mt-1 cursor-pointer"
                    required
                  />
                  <Label htmlFor="agreeTerms" className="cursor-pointer text-sm text-gray-300">
                    I confirm that I am 18 years or older and agree to the terms and conditions. I understand that all interactions are confidential and professional. I agree to respectful communication and understand that Madame Xandrie Spanxx reserves the right to decline any inquiry.
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-lg"
              >
                {loading ? 'Submitting...' : 'Submit Inquiry'}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Your information will be kept confidential and used only for responding to your inquiry.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

