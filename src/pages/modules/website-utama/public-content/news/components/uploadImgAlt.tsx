import { useRef } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { InputText } from '@/components/common/form/InputText.tsx'
import { HiPencil } from 'react-icons/hi'
import { FaTrash } from 'react-icons/fa'

interface Props<T extends FieldValues> {
  name: Path<T>
  label: string
  placeholder?: string
  required?: boolean
  form: UseFormReturn<T>
  uploadUrl: string
  width?: string
  height?: string
  alt: string
}

export const UploadImageWitAlt = <T extends FieldValues>(props: Props<T>) => {
  const {
    name,
    label,
    placeholder = 'Upload gambar',
    required,
    form,
    uploadUrl,
    alt,
    width = 'w-[512px]',
    height = 'h-[191.2px]',
  } = props

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

  const RemoveImage = () => {
    form.setValue(name, null as any)
  }

  return (
    <>
      <div>
        <label className="font-medium">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex items-start gap-5 mt-2">
          <div>
            <input
              type="file"
              hidden
              accept="image/png, image/jpeg, image/jpg"
              ref={uploadRef}
              onChange={(e) => handleFileChange(e.target.files)}
            />

            {imageUrl ? (
              <div className="relative">
                <div className={`${width} ${height} rounded overflow-hidden border`}>
                  <img src={imageUrl} alt="Uploaded image" className="w-full h-full object-cover" />
                  <div className="absolute flex items-center gap-1 top-2 right-2">
                    <button
                      className="bg-yellow-500 p-1.5 text-white rounded"
                      onClick={(e) => {
                        e.preventDefault()
                        pickImage()
                      }}
                    >
                      <HiPencil className={'size-3'} />
                    </button>
                    <button onClick={RemoveImage} className="bg-red-500 p-1.5 text-white rounded">
                      <FaTrash className={'size-3'} />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`bg-primary/5 border border-dashed border-primary ${width} ${height} rounded flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition`}
                onClick={pickImage}
              >
                <BiSolidImageAdd className="text-primary size-8" />
                <p className="text-xs text-primary font-semibold">{placeholder}</p>
                <p className="text-gray-500 text-sm">Max 5 MB</p>
                <p className="text-gray-500 text-sm">PNG, JPG, JPEG</p>
              </div>
            )}
          </div>
          <InputText
            inputClassName={''}
            form={form}
            name={alt}
            placeholder={'Keterangan gambar'}
          />
        </div>
      </div>
    </>
  )
}
