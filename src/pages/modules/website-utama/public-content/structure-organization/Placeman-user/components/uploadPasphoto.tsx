import type { UseFormReturn } from 'react-hook-form'
import { useRef } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  label: string
  name: string
  form: UseFormReturn<any>
  required?: boolean
  placeholder?: string
}

export const UploadPasPhoto = (props: Props) => {
  const { label, name, form, required, placeholder } = props
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
        <label htmlFor={name}>
          {label} {required && <span className={'text-red-500'}>*</span>}
        </label>
        <input
          type="file"
          hidden
          accept={'.png,.jpeg,.jpg'}
          ref={refButton}
          onChange={async (e) => {
            await HandleUpload(e.target.files)
          }}
        />

        {form.watch(name) ? (
          <div className={'flex items-center gap-1.5'}>
            <img
              src={form?.watch(name)}
              alt="gambar"
              className="w-[160px] h-[200px] object-cover rounded"
            />
            <div className="flex items-center gap-1.5">
              <Button onClick={() => refButton.current.click()}>Ganti foto</Button>
              <Button
                variant={'destructive'}
                onClick={() => {
                  form.setValue(name, '')
                }}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              refButton.current.click()
            }}
            className={
              'border border-primary rounded p-2 flex flex-col gap-1 items-center justify-center h-[200px] w-[160px]'
            }
          >
            <BiSolidImageAdd className="text-primary size-8" />
            <p className="text-sm">{placeholder ?? 'Upload Pas Foto'}</p>
            <p className={'text-sm text-gray-500'}>Max 2MB</p>
            <p className={'text-sm text-gray-500'}>PNG, JPG, JPEG</p>
          </div>
        )}
      </div>
    </>
  )
}
