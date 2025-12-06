import { useRef } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { MdUpload } from 'react-icons/md'

interface Props<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder?: string
  required?: boolean
  form: UseFormReturn<T>
  uploadUrl: string
}

export const UploadImageBasic = <T extends FieldValues>({
  name,
  label,
  placeholder = 'Upload gambar',
  required,
  form,
  uploadUrl,
}: Props<T>) => {
  const uploadRef = useRef<HTMLInputElement | null>(null)

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('berkas', file)

    try {
      const res = await AxiosClient.post(uploadUrl, formData)
      if (res.data.status) {
        toast.success(res.data.message)
        form.setValue(name, res.data.url as any)

        if (uploadRef.current) uploadRef.current.value = ''
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan saat upload.')

      if (uploadRef.current) uploadRef.current.value = ''
    }
  }

  const pickImage = () => uploadRef.current?.click()

  const handleFileChange = (files: FileList | null) => {
    if (!files || !files[0]) return
    uploadImage(files[0])
  }

  const imageUrl = form.watch(name)

  return (
    <div className="space-y-2">
      {/* LABEL */}
      <label className="font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {/* HIDDEN INPUT */}
      <input
        type="file"
        hidden
        accept="image/png, image/jpeg, image/jpg"
        ref={uploadRef}
        onChange={(e) => handleFileChange(e.target.files)}
      />

      {/* IMAGE PREVIEW / UPLOAD AREA */}
      {imageUrl ? (
        <div className="space-y-2 mt-2">
          <div className="w-[512px] h-[191.2px] rounded overflow-hidden border">
            <img src={imageUrl} alt="Uploaded image" className="w-full h-full object-cover" />
          </div>

          <Button
            className="w-fit"
            onClick={(e) => {
              e.preventDefault()
              pickImage()
            }}
          >
            <MdUpload />
            Ganti Gambar
          </Button>
        </div>
      ) : (
        <div
          className="bg-primary/5 mt-2 border border-dashed border-primary w-[512px] h-[191.2px] rounded flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition"
          onClick={pickImage}
        >
          <BiSolidImageAdd className="text-primary size-8" />
          <p className="text-xs text-primary font-semibold">{placeholder}</p>
          <p className="text-gray-500 text-sm">Max 5 MB</p>
          <p className="text-gray-500 text-sm">PNG, JPG, JPEG</p>
        </div>
      )}
    </div>
  )
}
