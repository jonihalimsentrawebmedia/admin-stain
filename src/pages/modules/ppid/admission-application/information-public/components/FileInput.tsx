import { Label } from '@/components/ui/label'

import { useRef } from 'react'
import { FormMessage } from '@/components/ui/form'
import { toast } from 'react-toastify'
import AxiosClient from '@/provider/axios.tsx'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useMobile } from '@/utils/useMobile'
import { Upload } from 'lucide-react'
import { FaTrash } from 'react-icons/fa'

interface Props<T extends FieldValues & Record<string, string>> {
  label?: string
  form: UseFormReturn<T>
  name: Path<T>
  keyname: Path<T>
  isRow?: boolean
  required?: boolean
  innerClassName?: string
  accept?: string
}

export const FileInput = <T extends FieldValues>(props: Props<T>) => {
  const { label, required, form, name, isRow, accept } = props

  const HandleUploadBerkas = async (e: FileList | null) => {
    if (e) {
      const formdata = new FormData()
      formdata.append('berkas', e[0])
      await AxiosClient.post('/upload', formdata)
        .then((res) => {
          if (res?.data?.status) {
            toast.success('Success Upload Berkas')
            console.log(form.watch(name), res?.data?.url)
            const temp: any = [...(form.watch(name) as unknown as string[]), res?.data?.url]
            // console.log(temp)
            form.setValue(name, temp)
            // form.setValue(keyname, e[0]?.name as PathValue<T, Path<T>>)
          }
        })
        .catch((err) => {
          // console.log(err)
          toast.error(err?.response?.data?.error?.message || 'Internal System Error')
        })
    }
  }

  const refButtton = useRef<HTMLInputElement | null>(null)

  const getFileName = (fileUrl: string) => {
    try {
      const pathname = new URL(fileUrl).pathname
      return pathname.substring(pathname.lastIndexOf('/') + 1)
    } catch {
      return ''
    }
  }

  const { isMobile } = useMobile()

  return (
    <>
      <div
        className={`w-full whitespace-pre-wrap ${isRow ? `${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-[12rem_1fr] flex-row items-center gap-5'} ` : 'flex flex-col gap-2'}`}
      >
        {label && (
          <Label htmlFor={'file'} className={'text-gray-500'}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        <div
          onClick={() => {
            refButtton.current?.click()
          }}
          className="px-2 flex text-[#999] relative items-center border justify-between py-1"
        >
          <div className="text-[#999] top-0">Klik untuk mengupload file</div>
          <Upload />
        </div>

        <input
          accept={accept}
          type={'file'}
          className="w-full"
          hidden
          ref={refButtton}
          onChange={(e) => HandleUploadBerkas(e.target.files)}
        />
        <FormMessage />
      </div>
      <div
        className={`w-full whitespace-pre-wrap ${isRow ? `${isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-[12rem_1fr] flex-row items-center gap-5'} ` : 'flex flex-col gap-2'}`}
      >
        <div></div>
        <div className="flex flex-col gap-2">
          {form.watch(name)?.map((item: string, index: number) => (
            <div className="flex gap-4 border px-2 py-1 border-[#999] w-full items-center justify-between">
              {getFileName(item)}

              <button
                onClick={() => {
                  const currentFiles = form.watch(name)
                  const newFiles = currentFiles.filter((_: any, i: number) => i !== index)
                  form.setValue(name, newFiles as any)
                }}
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
