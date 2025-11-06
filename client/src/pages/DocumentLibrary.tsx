import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Download } from 'lucide-react'
import { toast } from 'sonner'

interface DocumentTemplate {
  id: number
  name: string
  documentType: string
  description?: string
  version: string
}

export default function DocumentLibrary() {
  const [documents, setDocuments] = useState<DocumentTemplate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/document-templates')
      if (response.ok) {
        setDocuments(await response.json())
      } else {
        toast.error('Failed to load documents')
      }
    } catch (error) {
      toast.error('Error loading documents')
      console.error('Load error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (docId: number, docName: string) => {
    try {
      const response = await fetch(`/api/document-templates/${docId}/download`)
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${docName}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success('Document downloaded successfully')
      } else {
        toast.error('Failed to download document')
      }
    } catch (error) {
      toast.error('Download error')
      console.error('Download error:', error)
    }
  }

  const getDocumentCategory = (type: string) => {
    if (type.includes('performer')) return 'Performer Documents'
    if (type.includes('client')) return 'Client Documents'
    return 'General Documents'
  }

  const groupedDocuments = documents.reduce((acc, doc) => {
    const category = getDocumentCategory(doc.documentType)
    if (!acc[category]) acc[category] = []
    acc[category].push(doc)
    return acc
  }, {} as Record<string, DocumentTemplate[]>)

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading documents...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Document Library</h1>
          <p className="text-muted-foreground">Download and review important documents and agreements</p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            ← Back to Home
          </Button>
        </div>

        {/* Documents by Category */}
        {Object.entries(groupedDocuments).map(([category, docs]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docs.map((doc) => (
                <Card key={doc.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5 text-primary" />
                          {doc.name}
                        </CardTitle>
                        <CardDescription className="mt-2">{doc.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-sm text-muted-foreground mb-4">Version {doc.version}</p>
                    <Button
                      onClick={() => handleDownload(doc.id, doc.name)}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No documents available at this time.</p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            All documents are confidential and proprietary to Omerta Angels. Unauthorized reproduction or distribution is prohibited.
          </p>
        </div>
      </div>
    </div>
  )
}

