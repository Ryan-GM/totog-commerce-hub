
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2 } from 'lucide-react';
import { useUpdateProfile } from '@/hooks/useProfile';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileImageUploadProps {
  currentImageUrl?: string | null;
  userName?: string;
}

const ProfileImageUpload = ({ currentImageUrl, userName }: ProfileImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user } = useAuth();
  const { mutate: updateProfile } = useUpdateProfile();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      toast({
        title: "Invalid file type",
        description: "Please select a JPG or PNG image.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create a preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Upload to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      
      let uploadResult = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadResult.error) {
        // If bucket doesn't exist, create it
        if (uploadResult.error.message.includes('Bucket not found')) {
          const { error: bucketError } = await supabase.storage.createBucket('avatars', {
            public: true,
            allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
            fileSizeLimit: 2097152 // 2MB
          });
          
          if (bucketError) throw bucketError;
          
          // Retry upload
          uploadResult = await supabase.storage
            .from('avatars')
            .upload(fileName, file);
            
          if (uploadResult.error) throw uploadResult.error;
        } else {
          throw uploadResult.error;
        }
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      // Update user profile
      updateProfile({ avatar_url: publicUrl });

      // Clean up preview
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl(null);

    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={previewUrl || currentImageUrl || undefined} />
          <AvatarFallback className="text-lg">
            {userName?.[0]?.toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        )}
      </div>
      
      <div className="relative">
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        <Button variant="outline" disabled={isUploading}>
          <Camera className="h-4 w-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Change Photo'}
        </Button>
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        JPG or PNG, max 2MB
      </p>
    </div>
  );
};

export default ProfileImageUpload;
