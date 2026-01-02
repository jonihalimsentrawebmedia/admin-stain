'use client'

import { useRef, useState, type ChangeEvent,  } from 'react'
import { FormField, FormItem, FormMessage, FormControl } from '@/components/ui/form'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useMobile } from '@/utils/useMobile'
import { Trash2, Upload } from 'lucide-react'
import { BiPhotoAlbum } from 'react-icons/bi'
import { Button } from '@/components/ui/button'

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

export default function ImageUplaod<T extends FieldValues>({
  form,
  name,

  accept = 'image/png, image/jpeg, image/jpg',
  maxSizeMB = 2,
  previewEnabled = true,
  isRow = false,
  className = '',
}: FileUploadFieldProps<T>) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { isMobile } = useMobile()

  const [, setLoading] = useState(false)
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
            <FormControl>
              <div className="flex gap-4 items-center">
                <div>
                  {form.watch(name) ? (
                    <img
                      src={form.watch(name)}
                      className="w-[120px] h-40 object-center object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 items-center">
                      <div className="border w-[120px] h-40 text-primary px-4 py-2   rounded border-[#70F2B1] flex justify-between items-center bg-[#F5FFFA]">
                        <BiPhotoAlbum className="text-primary" size={16} />
                        Upload Foto
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <ul className="list-disc ml-4 pl-4 list-outside text-[#2769CD]">
                    <li>Ukuran 4x3</li>
                    <li>Jenis .jpg/.jpeg/.png</li>
                    <li>Max 2 MB</li>
                  </ul>
                  <Button
                    onClick={(e) => {
                      handleClick(e)
                    }}
                    variant={'outline'}
                    className="border border-primary text-primary hover:text-primary"
                  >
                    <Upload />
                    {form.watch(name) ? 'Ganti' : 'Upload'}
                  </Button>
                  {form.watch(name) && (
                    <Button
                      onClick={() => {
                        field.onChange('')
                      }}
                      variant={'destructive'}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </div>
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
