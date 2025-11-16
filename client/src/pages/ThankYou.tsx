import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-gray-900/50 border-red-900/30">
        <CardContent className="pt-12 pb-12 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Thank You!
          </h1>
          
          <p className="text-gray-300 mb-6">
            Your inquiry has been received successfully. Madame Xandrie Spanxx will review your application and contact you within 24-48 hours.
          </p>

          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">
              <strong>What happens next:</strong>
            </p>
            <ul className="text-sm text-gray-400 space-y-2 text-left">
              <li>✓ Your information is being reviewed</li>
              <li>✓ You'll receive a response via email or phone</li>
              <li>✓ We'll discuss your interests and availability</li>
              <li>✓ Professional contracts will be provided</li>
            </ul>
          </div>

          <p className="text-xs text-gray-500 mb-6">
            For urgent inquiries, you can also reach out directly at:
          </p>
          
          <div className="space-y-2 mb-8">
            <p className="text-gray-300">
              <strong>Phone:</strong> <span className="text-red-500">727-613-6157</span>
            </p>
            <p className="text-gray-300">
              <strong>Email:</strong> <span className="text-red-500">contact@xandriespanxx.com</span>
            </p>
          </div>

          <Button 
            onClick={() => window.location.href = '/'} 
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

