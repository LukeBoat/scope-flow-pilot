
import React from "react";
import { 
  FileText,
  Image, 
  FileIcon, 
  Download,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileAttachmentProps {
  url: string;
  showPreview?: boolean;
}

export function FileAttachment({ url, showPreview = false }: FileAttachmentProps) {
  // Determine file type
  const isImage = url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  const isPDF = url.toLowerCase().endsWith('.pdf');
  const fileName = url.split('/').pop() || "file";
  
  const handleDownload = () => {
    window.open(url, '_blank');
  };
  
  return (
    <div className="rounded border bg-muted/20 p-2">
      {isImage && showPreview ? (
        <div className="space-y-2">
          <div className="relative aspect-video w-full rounded overflow-hidden bg-muted">
            <img 
              src={url} 
              alt="Attachment" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs truncate max-w-[200px]">{fileName}</span>
            <Button size="sm" variant="ghost" onClick={handleDownload}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {isImage ? (
            <Image className="h-5 w-5 text-muted-foreground" />
          ) : isPDF ? (
            <FileText className="h-5 w-5 text-muted-foreground" />
          ) : (
            <FileIcon className="h-5 w-5 text-muted-foreground" />
          )}
          
          <span className="text-xs truncate flex-1">{fileName}</span>
          
          <Button size="sm" variant="ghost" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
