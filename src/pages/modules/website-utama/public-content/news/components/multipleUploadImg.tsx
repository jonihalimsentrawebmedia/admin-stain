import { useRef, useState } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'
import type { FieldValues, Path, UseFormReturn, PathValue } from 'react-hook-form'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { HiPencil } from 'react-icons/hi'
import { FaTrash } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'

interface ImageItem {
  gambar: string
  keterangan: string
}

interface Props<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder?: string
  required?: boolean
  form: UseFormReturn<T>
  uploadUrl: string
  maxFiles?: number
}

export const UploadMultipleImages = <T extends FieldValues>(props: Props<T>) => {
  const {
    name,
    label,
    placeholder = 'Upload gambar',
    required,
    form,
    uploadUrl,
    maxFiles = 10,
  } = props

  const uploadRef = useRef<HTMLInputElement | null>(null)
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null)

  // Get current images from form
  const images: ImageItem[] = form.watch(name as Path<T>) || []
  const hasImages = images.length > 0
  const canAddMore = images.length < maxFiles

  const uploadImage = async (file: File, index?: number) => {
    const formData = new FormData()
    formData.append('berkas', file)

    try {
      const res = await AxiosClient.post(uploadUrl, formData)
      if (res.data.status) {
        toast.success(res.data.message)

        const currentImages = [...(form.getValues(name) || [])] as ImageItem[]
        const newImage: ImageItem = { gambar: res.data.url, keterangan: '' }

        if (index !== undefined && index >= 0) {
          // Edit existing image
          currentImages[index] = newImage
        } else {
          // Add new image
          currentImages.push(newImage)
        }

        form.setValue(name, currentImages as PathValue<T, Path<T>>)

        if (uploadRef.current) uploadRef.current.value = ''
        setCurrentEditIndex(null)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan saat upload.')

      if (uploadRef.current) uploadRef.current.value = ''
      setCurrentEditIndex(null)
    }
  }

  const pickImage = (index?: number) => {
    setCurrentEditIndex(index ?? null)
    uploadRef.current?.click()
  }

  const handleFileChange = (files: FileList | null) => {
    if (!files || !files[0]) {
      setCurrentEditIndex(null)
      return
    }

    if (currentEditIndex !== null) {
      // Editing existing image
      uploadImage(files[0], currentEditIndex)
    } else {
      // Adding new image
      uploadImage(files[0])
    }
  }

  const removeImage = (index: number) => {
    const currentImages = [...(form.getValues(name) || [])] as ImageItem[]
    currentImages.splice(index, 1)
    form.setValue(name, currentImages as PathValue<T, Path<T>>)
  }

  const updateAlt = (index: number, value: string) => {
    const currentImages = [...(form.getValues(name) || [])] as ImageItem[]
    if (currentImages[index]) {
      currentImages[index].keterangan = value
      form.setValue(name, currentImages as PathValue<T, Path<T>>)
    }
  }

  return (
    <div className="grid gap-5 grid-cols-[12rem_1fr] items-start">
      <div className="flex items-center justify-between">
        <label className="text-sm">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      <input
        type="file"
        hidden
        accept="image/png, image/jpeg, image/jpg"
        ref={uploadRef}
        onChange={(e) => handleFileChange(e.target.files)}
      />

      <div>
        <div className="flex items-center justify-end mb-2">
          <span className="text-sm text-gray-500">
            {images.length} / {maxFiles} gambar
          </span>
        </div>
        {hasImages ? (
          <>
            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Existing Images */}
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative group border rounded-lg overflow-hidden bg-gray-50"
                >
                  <div className="aspect-video relative">
                    <img
                      src={image.gambar}
                      alt={image.keterangan || `Gambar ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200" />

                    {/* Image Actions */}
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        className="bg-yellow-500 p-1.5 text-white rounded hover:bg-yellow-600"
                        onClick={() => pickImage(index)}
                      >
                        <HiPencil className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="bg-red-500 p-1.5 text-white rounded hover:bg-red-600"
                      >
                        <FaTrash className="size-3" />
                      </button>
                    </div>
                  </div>

                  {/* Alt Input */}
                  <div className="p-3">
                    <input
                      type="text"
                      value={image.keterangan}
                      onChange={(e) => updateAlt(index, e.target.value)}
                      placeholder="Keterangan gambar"
                      className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              ))}

              {/* Upload New Image Card - hanya tampil jika masih bisa tambah */}
              {canAddMore && (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200"
                  onClick={() => pickImage()}
                >
                  <FiPlus className="text-gray-400 size-8 mb-2" />
                  <p className="text-sm font-medium text-gray-600">{placeholder}</p>
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    Max 5 MB per gambar
                    <br />
                    PNG, JPG, JPEG
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200"
            onClick={() => pickImage()}
          >
            <BiSolidImageAdd className="text-gray-400 size-12 mx-auto mb-3" />
            <p className="font-medium text-gray-700">{placeholder}</p>
            <p className="text-sm text-gray-500 mt-1">Klik untuk upload gambar pertama</p>
            <p className="text-xs text-gray-500 mt-2">Max 5 MB per gambar • PNG, JPG, JPEG</p>
          </div>
        )}

        {required && !hasImages && <p className="text-sm text-red-500">Minimal upload 1 gambar</p>}
      </div>
    </div>
  )
}
