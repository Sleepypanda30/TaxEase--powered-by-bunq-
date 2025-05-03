import { FileText, Cloud, Lightbulb, FileImage, FileIcon as FilePdf, Camera } from "lucide-react"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "document-text":
        return <FileText className="w-7 h-7 text-blue-600" />
      case "cloud":
        return <Cloud className="w-7 h-7 text-blue-600" />
      case "lightbulb":
        return <Lightbulb className="w-7 h-7 text-blue-600" />
      case "image":
        return <FileImage className="w-7 h-7 text-blue-600" />
      case "pdf":
        return <FilePdf className="w-7 h-7 text-blue-600" />
      case "camera":
        return <Camera className="w-7 h-7 text-blue-600" />
      default:
        return <FileText className="w-7 h-7 text-blue-600" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <div className="bg-blue-100 p-3 rounded-full mb-4">{getIcon()}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
