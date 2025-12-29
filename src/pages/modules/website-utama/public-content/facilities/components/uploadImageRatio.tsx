import { BiSolidImageAdd } from 'react-icons/bi'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { HiPencil } from 'react-icons/hi'
import { FaTrash } from 'react-icons/fa'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { AspectRatio } from '@/components/ui/aspect-ratio.tsx'

interface props<T extends FieldValues> {
  placeholder?: string
  name: Path<T>
  form: UseFormReturn<T>
  label?: string
  required?: boolean
  maxWidthClassName?: string
  aspectRatioWidth?: number
  aspectRatioHeight?: number
  isRow?: boolean
}

export const UploadImageRatio = <T extends FieldValues>(props: props<T>) => {
  const {
    placeholder,
    name,
    form,
    label,
    required,
    maxWidthClassName = 'max-w-[300px]',
    aspectRatioWidth = 4,
    aspectRatioHeight = 3,
    isRow,
  } = props

  const refButton = useRef<any | null>(null)

  const HandleUpload = async (e: null | FileList) => {
    const file = e?.[0]

    if (file) {
      const formData = new FormData()
      formData.append('berkas', file)

      await AxiosClient.post('/upload', formData)
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message || 'Success Upload Pas Foto')
            form.setValue(name, res.data.url)

            if (refButton.current) refButton.current.value = ''
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')

          if (refButton.current) refButton.current.value = ''
        })
    }
  }

  return (
    <>
      <div className={`${isRow ? 'grid grid-cols-[12rem_1fr] gap-5' : 'flex flex-col gap-1.5'}`}>
        <label>
          {label} {required && <span className={'text-red-500'}>*</span>}
        </label>
        <div>
          <input
            type="file"
            hidden
            ref={refButton}
            onChange={(e) => HandleUpload(e.target.files)}
          />
          {form.watch(name) ? (
            <div className={`relative ${maxWidthClassName} rounded overflow-hidden`}>
              <div className={'flex absolute z-20 top-1 right-1 gap-1.5'}>
                <button
                  className={'bg-yellow-500 text-white hover:bg-yellow-600 rounded p-1.5'}
                  onClick={(e) => {
                    e.preventDefault()
                    refButton.current.click()
                  }}
                >
                  <HiPencil />
                </button>
                <button
                  className={'bg-red-500 text-white hover:bg-red-600 rounded p-1.5'}
                  onClick={() => {
                    form.setValue(name, '' as any)
                  }}
                >
                  <FaTrash />
                </button>
              </div>
              <AspectRatio className={'z-10'} ratio={aspectRatioWidth / aspectRatioHeight}>
                <img src={form.watch(name)} alt="image" className={'w-full h-full object-cover'} />
              </AspectRatio>
            </div>
          ) : (
            <>
              <div className={`${maxWidthClassName}`}>
                <AspectRatio
                  ratio={aspectRatioWidth / aspectRatioHeight}
                  className={`${form.formState.errors[name] ? 'border-red-500' : ''}
                flex flex-col gap-1.5 text-center hover:cursor-pointer border
                border-primary text-primary rounded justify-center items-center`}
                  onClick={() => refButton.current.click()}
                >
                  <BiSolidImageAdd className="text-primary size-8" />
                  <p className={`text-sm ${form.formState.errors[name] ? 'text-red-500' : ''}`}>
                    {placeholder ?? 'Upload Pas Foto'}
                  </p>
                  <p className={'text-sm text-gray-500'}>Max 2MB</p>
                  <p className={'text-sm text-gray-500'}>PNG, JPG, JPEG</p>
                </AspectRatio>
              </div>
              {form.formState.errors[name] && (
                <p className={'text-red-500 text-sm'}>
                  {form.formState.errors[name].message as any}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
