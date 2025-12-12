import { BiSolidImageAdd } from 'react-icons/bi'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import { HiPencil } from 'react-icons/hi'
import { FaTrash } from 'react-icons/fa'

interface props {
  placeholder?: string
  name: string
  form: any
  label?: string
  required?: boolean
}

export const UploadImageRatio = (props: props) => {
  const { placeholder, name, form, label, required } = props

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
      <div>
        <label>
          {label} {required && <span className={'text-red-500'}>*</span>}
        </label>
        <input type="file" hidden ref={refButton} onChange={(e) => HandleUpload(e.target.files)} />

        {form.watch(name) ? (
          <div className={'relative w-[300px] h-[225px] rounded overflow-hidden'}>
            <div className={'flex absolute top-1 right-1 gap-1.5'}>
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
                  form.setValue(name, '')
                }}
              >
                <FaTrash />
              </button>
            </div>
            <img
              src={form.watch(name)}
              alt="image"
              className={'w-[300px] h-[225px] object-cover'}
            />
          </div>
        ) : (
          <>
            <div
              onClick={() => refButton.current.click()}
              className={`
            ${form.formState.errors[name] ? 'border-red-500' : ''}
            flex flex-col gap-1.5 text-center hover:cursor-pointer border
             border-primary text-primary rounded w-[300px] h-[225px] justify-center items-center
            `}
            >
              <BiSolidImageAdd className="text-primary size-8" />
              <p className={`text-sm ${form.formState.errors[name] ? 'text-red-500' : ''}`}>
                {placeholder ?? 'Upload Pas Foto'}
              </p>
              <p className={'text-sm text-gray-500'}>Max 2MB</p>
              <p className={'text-sm text-gray-500'}>PNG, JPG, JPEG</p>
            </div>
            {form.formState.errors[name] && (
              <p className={'text-red-500 text-sm'}>{form.formState.errors[name].message}</p>
            )}
          </>
        )}
      </div>
    </>
  )
}
