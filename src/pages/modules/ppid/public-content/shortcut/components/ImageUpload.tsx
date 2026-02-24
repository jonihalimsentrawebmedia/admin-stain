'use client'

import { useRef, useState, type ChangeEvent, useEffect } from 'react'
import { Upload } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from '@/components/ui/form'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useMobile } from '@/utils/useMobile'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface FileUploadFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>
  name: Path<T>
  label?: string
  description?: string
  accept?: string
  maxSizeMB?: number
  previewEnabled?: boolean
  isRow?: boolean
  className?: string
}

export default function ImageUpload<T extends FieldValues>({
  form,
  name,
  label = 'Upload File',

  accept = 'image/png, image/jpeg, image/jpg',
  maxSizeMB = 2,
  previewEnabled = true,
  isRow = false,
  className = '',
}: FileUploadFieldProps<T>) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { isMobile } = useMobile()
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const handleClick = (e: any) => {
    e.preventDefault()
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, field: any) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (!file) return

    // Validasi ukuran
    if (file.size > maxSizeMB * 1024 * 1024) {
      form.setError(name, { message: `Ukuran maksimal ${maxSizeMB} MB` })
      return
    }

    // Validasi tipe file
    const validTypes = accept.split(',').map((t) => t.trim())
    if (!validTypes.includes(file.type)) {
      form.setError(name, { message: 'Format file tidak valid' })
      return
    }

    // Bersihkan error dan set value ke form
    form.clearErrors(name)

    // Set preview jika aktif
    if (previewEnabled) {
      const formData = new FormData()
      formData.append('berkas', file)
      setLoading(true)
      try {
        const res = await AxiosClient.post(`/upload`, formData)

        if (res.data.status) {
          toast.success(res.data.message)

          field.onChange(res.data.url)
          setPreview(res.data.url)
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      } finally {
        setLoading(false)
      }
      // setPreview(URL.createObjectURL(file));
    }
  }

  //   const handleRemove = (field: any) => {
  //     setPreview(null)
  //     field.onChange(null)
  //     if (fileInputRef.current) fileInputRef.current.value = ''
  //   }
  useEffect(() => {
    if (form.watch(name)) {
      setPreview(form.watch(name))
    }
  }, [form.watch(name)])
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem
            className={`whitespace-nowrap 
          ${isRow ? `${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-[12rem_1fr] flex-row items-center gap-5'} ` : 'flex flex-col gap-2'} 
          ${className}`}
          >
            <FormLabel className="text-sm text-[#464646] ">{label}</FormLabel>
            <FormControl>
              <div>
                {loading ? (
                  <Skeleton className="h-[200px]" />
                ) : preview ? (
                  <div className="flex flex-col gap-2 justify-center items-center">
                    <img
                      src={preview}
                      className=" object-cover w-[200px] max-w-[200px] max-h-[200px] min-w-[200px] min-h-[200px] h-[200px] "
                      alt=""
                    />
                    <Button
                      onClick={(e) => {
                        handleClick(e)
                      }}
                      className="text-primary border-primary mx-auto w-fit hover:text-primary"
                      variant={'outline'}
                    >
                      <Upload />
                      Ganti Gambar
                    </Button>
                  </div>
                ) : (
                  <div className="flex w-full flex-col gap-4">
                    <div
                      onClick={(e) => {
                        handleClick(e)
                      }}
                      className="flex min-w-[200px] min-h-[200px] flex-wrap  gap-2 items-center"
                    >
                      <div className="border flex flex-col w-[200px] min-w-[200px] min-h-[200px]  gap-2 h-[200px] items-center justify-center text-primary  px-4 py-2  aspect-square  rounded border-[#DFDFDF]   bg-[#F9F9F9]">
                        <MdAddPhotoAlternate size={32} />
                        Icon
                        <br />
                        <ul className=" list-disc ml-2 pl-2 list-outside whitespace-pre-line  text-[#2769CD]">
                          <li>Ukuran 1:1</li>
                          <li>Jenis File: .jpg/.png/.jpeg</li>
                          <li>Maks: {maxSizeMB}MB</li>
                        </ul>
                      </div>
                    </div>
                    <Button
                      onClick={(e) => {
                        handleClick(e)
                      }}
                      className="text-primary border-primary mx-auto w-fit hover:text-primary"
                      variant={'outline'}
                    >
                      <Upload />
                      Upload Icon
                    </Button>
                  </div>
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
    </>
  )
}
