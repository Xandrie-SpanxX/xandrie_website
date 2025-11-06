import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Upload, LogOut, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface Gallery {
  id: number
  name: string
  description?: string
  isPublic: number
  isPurchaseRequired: number
  price?: number
}

interface File {
  id: number
  fileName: string
  fileType: string
  status: string
  createdAt: string
}

export default function PerformerDashboard() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(true)
  const [newGalleryName, setNewGalleryName] = useState('')
  const [newGalleryDescription, setNewGalleryDescription] = useState('')
  const [uploadingFile, setUploadingFile] = useState(false)

  useEffect(() => {
    loadPerformerData()
  }, [])

  const loadPerformerData = async () => {
    try {
      const [galleriesRes, filesRes] = await Promise.all([
        fetch('/api/galleries'),
        fetch('/api/files'),
      ])

      if (galleriesRes.ok) {
        setGalleries(await galleriesRes.json())
      }
      if (filesRes.ok) {
        setFiles(await filesRes.json())
      }
    } catch (error) {
      toast.error('Failed to load dashboard')
      console.error('Load error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGalleryName.trim()) {
      toast.error('Gallery name is required')
      return
    }

    try {
      const response = await fetch('/api/galleries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newGalleryName,
          description: newGalleryDescription,
          isPublic: 0,
          isPurchaseRequired: 0,
        }),
      })

      if (response.ok) {
        toast.success('Gallery created successfully!')
        setNewGalleryName('')
        setNewGalleryDescription('')
        loadPerformerData()
      } else {
        toast.error('Failed to create gallery')
      }
    } catch (error) {
      toast.error('An error occurred')
      console.error('Create gallery error:', error)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingFile(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileType', 'gallery_image')

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        toast.success('File uploaded successfully! Pending approval.')
        loadPerformerData()
      } else {
        toast.error('Upload failed')
      }
    } catch (error) {
      toast.error('Upload error')
      console.error('Upload error:', error)
    } finally {
      setUploadingFile(false)
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
          <h1 className="text-4xl font-bold">Performer Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Create Gallery Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Gallery</CardTitle>
            <CardDescription>Organize your content into galleries</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateGallery} className="space-y-4">
              <div>
                <Label htmlFor="gallery-name">Gallery Name</Label>
                <Input
                  id="gallery-name"
                  placeholder="e.g., Premium Photos, Exclusive Videos"
                  value={newGalleryName}
                  onChange={(e) => setNewGalleryName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="gallery-desc">Description (Optional)</Label>
                <Textarea
                  id="gallery-desc"
                  placeholder="Describe the contents of this gallery"
                  value={newGalleryDescription}
                  onChange={(e) => setNewGalleryDescription(e.target.value)}
                />
              </div>
              <Button type="submit">
                <Plus className="mr-2 h-4 w-4" />
                Create Gallery
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Galleries List */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Galleries ({galleries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {galleries.length === 0 ? (
              <p className="text-muted-foreground">No galleries yet. Create one to get started!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleries.map((gallery) => (
                  <Card key={gallery.id} className="bg-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{gallery.name}</CardTitle>
                      <CardDescription>{gallery.description || 'No description'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p>Status: {gallery.isPublic ? 'Public' : 'Private'}</p>
                        {gallery.isPurchaseRequired && <p>Price: ${(gallery.price || 0) / 100}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* File Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Content</CardTitle>
            <CardDescription>Upload photos, videos, or documents (pending admin approval)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-lg font-semibold text-primary">Click to upload</span>
                <span className="text-muted-foreground"> or drag and drop</span>
              </Label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploadingFile}
              />
              <p className="text-sm text-muted-foreground mt-2">PNG, JPG, MP4 up to 500MB</p>
            </div>
          </CardContent>
        </Card>

        {/* Files List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Uploads ({files.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <p className="text-muted-foreground">No files uploaded yet.</p>
            ) : (
              <div className="space-y-3">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                    <div>
                      <p className="font-semibold">{file.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        Status: <span className={file.status === 'approved' ? 'text-green-500' : file.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}>{file.status}</span>
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

