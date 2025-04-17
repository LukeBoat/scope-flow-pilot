
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Upload, Trash2, Image, CheckCircle } from "lucide-react";

export function BrandingSettings() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [tempLogoUrl, setTempLogoUrl] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#8A63D2");
  const [isWhiteLabel, setIsWhiteLabel] = useState(false);
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, this would upload to storage
      // For now, we'll just use a local URL
      const url = URL.createObjectURL(file);
      setTempLogoUrl(url);
      setIsLogoDialogOpen(true);
    }
  };

  const confirmLogoUpload = () => {
    setLogoUrl(tempLogoUrl);
    setIsLogoDialogOpen(false);
  };

  const cancelLogoUpload = () => {
    if (tempLogoUrl) {
      URL.revokeObjectURL(tempLogoUrl);
      setTempLogoUrl(null);
    }
    setIsLogoDialogOpen(false);
  };

  const removeLogo = () => {
    if (logoUrl) {
      URL.revokeObjectURL(logoUrl);
      setLogoUrl(null);
    }
  };

  const previewStyle = {
    "--brand-color": primaryColor,
  } as React.CSSProperties;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Client Branding</CardTitle>
          <CardDescription>
            Customize the client portal with your client's branding elements. Changes will be visible to clients when they log in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-2">
            <Label htmlFor="logo-upload">Client Logo</Label>
            <div className="flex gap-4 items-center">
              <div 
                className="w-24 h-24 border rounded flex items-center justify-center overflow-hidden bg-muted"
              >
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="Client logo" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image className="w-10 h-10 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button type="button" size="sm" className="relative">
                    <input
                      id="logo-upload"
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="image/png, image/jpeg, image/svg+xml"
                      onChange={handleLogoUpload}
                    />
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                  {logoUrl && (
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={removeLogo}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Recommended: 512×512px PNG or SVG
                </p>
              </div>
            </div>
          </div>

          {/* Brand Color */}
          <div className="space-y-2">
            <Label htmlFor="brand-color">Brand Color</Label>
            <div className="flex gap-4 items-center">
              <Input
                id="brand-color"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-16 h-10 p-1"
              />
              <Input 
                type="text" 
                value={primaryColor} 
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-28"
              />
              <div className="flex-1">
                <div 
                  className="h-10 w-full rounded-md" 
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            </div>
          </div>

          {/* White Label Option */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium">White Label Client Portal</p>
              <p className="text-sm text-muted-foreground">
                Remove "Scope Sentinel" branding from the client portal
              </p>
            </div>
            <Switch 
              checked={isWhiteLabel} 
              onCheckedChange={setIsWhiteLabel}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Branding Settings</Button>
        </CardFooter>
      </Card>

      {/* Preview Panel */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            This is how the client portal will appear to your clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 bg-background" style={previewStyle}>
            <div className="flex items-center gap-2 mb-4">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Client logo preview" 
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                ></div>
              )}
              <span className="font-semibold">
                {isWhiteLabel ? "Client Portal" : "Scope Sentinel"}
              </span>
            </div>
            <div 
              className="w-full h-2 rounded-full mb-4"
              style={{ backgroundColor: primaryColor }}
            ></div>
            <div className="flex gap-2 mb-4">
              <div 
                className="px-3 py-1 text-xs rounded-full text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Dashboard
              </div>
              <div className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                Projects
              </div>
              <div className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                Deliverables
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo Crop/Preview Dialog */}
      <AlertDialog open={isLogoDialogOpen} onOpenChange={setIsLogoDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Preview Client Logo</AlertDialogTitle>
            <AlertDialogDescription>
              Confirm this logo to use it in the client portal
            </AlertDialogDescription>
          </AlertDialogHeader>
          {tempLogoUrl && (
            <div className="flex justify-center p-6 bg-muted rounded-md">
              <img 
                src={tempLogoUrl} 
                alt="Logo preview" 
                className="max-w-full max-h-48 object-contain"
              />
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelLogoUpload}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogoUpload}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Use this logo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
