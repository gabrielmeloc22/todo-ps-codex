import { supabase } from "@/services/supabase";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { ComponentPropsWithoutRef } from "react";
import { Button, Input, Label, Tooltip, TooltipContent, TooltipTrigger } from "ui";

interface ImageUploaderProps extends ComponentPropsWithoutRef<typeof Input> {
  onFileChange: (value: string | null) => void;
  value: string | undefined;
  alt: string;
}

export const updateProfilePic = async (profilePic: string | null, userId: string) => {
  let profilePicPublicUrl = null;

  if (profilePic) {
    const file = await fetch(profilePic).then((r) => r.blob());
    await supabase.storage.from("user-profile-pic").upload(userId, file, {
      upsert: true,
    });
    profilePicPublicUrl = supabase.storage.from("user-profile-pic").getPublicUrl(userId).data.publicUrl;
  } else {
    await supabase.storage.from("user-profile-pic").remove([userId]);
  }

  return profilePicPublicUrl;
};

export function ImageUploader({ value: src, alt, onFileChange, type, ...props }: ImageUploaderProps) {
  return (
    <div className="flex flex-col gap-4 group relative w-fit h-fit z-0">
      <Input
        id="profilePic"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.item(0);
          if (file) {
            onFileChange(URL.createObjectURL(file));
          }
        }}
        {...props}
      />
      <div className="absolute bottom-0 bg-gradient-to-t from-zinc-900 p-4 rounded-none animate-in hidden max-xl:flex group-hover:flex group-hover:slide-in-from-bottom-4 group-hover:fade-in-5 gap-3 w-full z-10">
        <Tooltip>
          <TooltipContent>Editar foto de perfil</TooltipContent>
          <TooltipTrigger asChild>
            <Label htmlFor="profilePic" className="bottom-4">
              <Edit size={16} />
            </Label>
          </TooltipTrigger>
        </Tooltip>
        <Tooltip>
          <TooltipContent>Remover foto de perfil</TooltipContent>
          <TooltipTrigger asChild>
            <Button type="button" variant="icon" onClick={() => onFileChange(null)}>
              <Trash className="z-10" size={16} />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </div>
      <Label htmlFor="profilePic">Foto de perfil</Label>
      <div className="relative w-40 h-40">
        {src ? (
          <Image fill className="absolute object-cover rounded-md aspect-square" src={src} alt={alt} />
        ) : (
          <div className="flex items-center justify-center bg-muted h-full rounded-md" />
        )}
      </div>
    </div>
  );
}
