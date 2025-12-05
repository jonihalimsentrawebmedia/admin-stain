"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AxiosClient from "@/provider/axios";
import { toast } from "react-toastify";

interface FileUploadFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  accept?: string;
  maxSizeMB?: number;
  previewEnabled?: boolean;
}

export default function InputImage<T extends FieldValues>({
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
  const [, setLoading] = useState(false);
  const handleClick = (e: any) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    e.preventDefault();
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

    // Set preview jika aktif
    if (previewEnabled) {
      const formData = new FormData();
      formData.append("berkas", file);
      setLoading(true);
      try {
        const res = await AxiosClient.post(`/upload`, formData);

        if (res.data.status) {
          toast.success(res.data.message);
          field.onChange(res.data.url);
          setPreview(res.data.url);
        }
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message || "Terjadi kesalahan, silakan coba lagi."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRemove = (field: any) => {
    setPreview(null);
    field.onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (form.watch(name)) {
      setPreview(form.watch(name));
    }
  }, [form.watch(name)]);

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
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </>
              ) : (
                <ImagePlus className="w-8 h-8 text-green-600 mb-2" />
              )}

              {preview ? (
                <Button
                  onClick={handleClick}
                  variant={"outline"}
                  className="bg-white text-primary hover:text-primary border-primary"
                >
                  <Pencil />
                  Ganti
                </Button>
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
