import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LogOut, Upload, FileText } from 'lucide-react'
import { toast } from 'sonner'

interface Document {
  id: number
  name: string
  documentType: string
  status: string
  submittedAt?: string
}

interface UserProfile {
  id: number
  avatarUrl?: string
  bio?: string
  isPublic: number
}

export default function ClientDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadingDoc, setUploadingDoc] = useState(false)

  useEffect(() => {
    loadClientData()
  }, [])

  const loadClientData = async () => {
    try {
      const [profileRes, docsRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/documents'),
      ])

      if (profileRes.ok) {
        setProfile(await profileRes.json())
      }
      if (docsRes.ok) {
        setDocuments(await docsRes.json())
      }
    } catch (error) {
      toast.error('Failed to load dashboard')
      console.error('Load error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingDoc(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('documentType', 'contract')

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.success('Document uploaded successfully!')
        loadClientData()
      } else {
        toast.error('Upload failed')
      }
    } catch (error) {
      toast.error('Upload error')
      console.error('Upload error:', error)
    } finally {
      setUploadingDoc(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/'
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Client Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Profile Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Manage your account and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile && (
              <>
                <div>
                  <Label>Avatar</Label>
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt="Avatar" className="h-24 w-24 rounded-lg mt-2" />
                  ) : (
                    <p className="text-muted-foreground mt-2">No avatar set</p>
                  )}
                </div>
                <div>
                  <Label>Bio</Label>
                  <p className="text-muted-foreground mt-2">{profile.bio || 'No bio provided'}</p>
                </div>
                <div>
                  <Label>Privacy</Label>
                  <p className="text-muted-foreground mt-2">
                    {profile.isPublic ? 'Public Profile' : 'Private Profile'}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Required Documents</CardTitle>
            <CardDescription>Upload signed contracts and agreements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Document Upload */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <Label htmlFor="doc-upload" className="cursor-pointer">
                <span className="text-lg font-semibold text-primary">Click to upload documents</span>
              </Label>
              <input
                id="doc-upload"
                type="file"
                className="hidden"
                onChange={handleDocumentUpload}
                disabled={uploadingDoc}
                accept=".pdf,.doc,.docx"
              />
              <p className="text-sm text-muted-foreground mt-2">PDF or Word documents</p>
            </div>

            {/* Documents List */}
            {documents.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold">Your Documents</h3>
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.documentType}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${
                      doc.status === 'approved' ? 'text-green-500' :
                      doc.status === 'rejected' ? 'text-red-500' :
                      'text-yellow-500'
                    }`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Browse Performers</CardTitle>
            <CardDescription>Find and connect with performers</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/performers'}>
              View All Performers
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

