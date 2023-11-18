"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";

import defaultFallbackImages from "@/constants/defaultFallbackImages.json";
import Link from "next/link";
import FormErrors from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>(
    defaultFallbackImages
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const fetchedImages = result.response as Array<Record<string, any>>;
          setImages(fetchedImages);
        } else {
          console.error("Failed to get images from UnSplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultFallbackImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
          >
            <input
              type="radio"
              name={id}
              id={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              alt="Unsplash image"
              className="object-cover rounded-sm"
              src={image.urls.thumb}
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full flex items-center justify-center bg-black/30">
                <Check className="h-6 w-6 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-center text-white hover:underline bg-black/60 bg-opacity-50"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors errors={errors} id={id} />
    </div>
  );
};

export default FormPicker;
