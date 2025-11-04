"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";


interface FileUploadFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  accept?: string;
  maxSizeMB?: number;
  previewEnabled?: boolean;
}

export default function InputImage2<T extends FieldValues>({
  form,
  name,
  label = "Upload File",
  description = "Klik untuk mengunggah file",
  accept = "image/png, image/jpeg, image/jpg",
  maxSizeMB = 2,
  previewEnabled = true,
}: FileUploadFieldProps<T>) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran
    if (file.size > maxSizeMB * 1024 * 1024) {
      form.setError(name, { message: `Ukuran maksimal ${maxSizeMB} MB` });
      return;
    }

    // Validasi tipe file
    const validTypes = accept.split(",").map((t) => t.trim());
    if (!validTypes.includes(file.type)) {
      form.setError(name, { message: "Format file tidak valid" });
      return;
    }

    // Bersihkan error dan set value ke form
    form.clearErrors(name);
    field.onChange(e.target.files);

    // Set preview jika aktif
    if (previewEnabled) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemove = (field: any) => {
    setPreview(null);
    field.onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-[#464646] ">{label}</FormLabel>
          <FormControl>
            <div
              onClick={preview ? undefined : handleClick}
              className="bg-green-50 border border-green-200 min-w-[300px] rounded-md flex flex-col items-center justify-center cursor-pointer text-center p-6 hover:bg-green-100 transition relative"
            >
              {previewEnabled && preview ? (
                <>
                  <img
                    src={preview}
                    alt="preview"
                    className="h-[50px] w-[50px] object-contain mb-2"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(field);
                    }}
                    className="absolute top-2 right-2 bg-red-500 rounded-lg  p-1 shadow hover:bg-red-400"
                  >
                    <Trash2 className="w-4 h-4 text-white " />
                  </button>
                  <button
                    type="button"
                    onClick={handleClick}
                    className="absolute top-2 right-10 bg-primary rounded-lg  p-1 shadow hover:bg-primary/90"
                  >
                    <Pencil className="w-4 h-4 text-white " />
                  </button>
                </>
              ) : (
                <ImagePlus className="w-8 h-8 text-green-600 mb-2" />
              )}

              {preview ? (
                <></>
              ) : (
                <>
                  <p className="text-green-700 text-xs font-medium">
                    {description}
                  </p>
                  <p className="text-gray-500 text-xs ">Max {maxSizeMB} MB</p>
                  <p className="text-gray-500 text-xs ">
                    {accept.toUpperCase()}
                  </p>
                </>
              )}
            </div>
          </FormControl>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => handleFileChange(e, field)}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
