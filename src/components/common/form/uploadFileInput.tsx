import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { useRef } from 'react'
import { FormMessage } from '@/components/ui/form'
import { toast } from 'react-toastify'
import AxiosClient from '@/provider/axios.tsx'
import type { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'

interface Props<T extends FieldValues & Record<string, string>> {
  label?: string
  form: UseFormReturn<T>
  name: Path<T>
  keyname: Path<T>
  isRow?: boolean
  required?: boolean
  innerClassName?: string
}

export const UploadFileInput = <T extends FieldValues>(props: Props<T>) => {
  const { label, required, form, name, keyname, isRow, innerClassName } = props

  const HandleUploadBerkas = async (e: FileList | null) => {
    if (e) {
      const formdata = new FormData()
      formdata.append('berkas', e[0])
      await AxiosClient.post('/upload', formdata)
        .then((res) => {
          if (res?.data?.status) {
            toast.success('Success Upload Berkas')
            form.setValue(name, res?.data?.url)
            form.setValue(keyname, e[0]?.name as PathValue<T, Path<T>>)
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error?.message || 'Internal System Error')
        })
    }
  }

  const refButtton = useRef<HTMLInputElement | null>(null)

  const RemoveFile = () => {
    form.setValue(name, '' as PathValue<T, Path<T>>)
    form.setValue(keyname, '' as PathValue<T, Path<T>>)
  }

  const getFileName = (fileUrl: string) => {
    try {
      const pathname = new URL(fileUrl).pathname
      return pathname.substring(pathname.lastIndexOf('/') + 1)
    } catch {
      return ''
    }
  }

  return (
    <div className={`w-full ${isRow ? 'grid grid-cols-[12rem_1fr] gap-5' : 'flex flex-col gap-2'}`}>
      {label && (
        <Label htmlFor={'file'} className={'text-gray-500'}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      {form.watch(name) ? (
        <>
          <div
            className={`p-2 bg-white flex items-center justify-between border ${innerClassName}`}
          >
            <Link
              to={form.watch(name)}
              target={'_blank'}
              className={'text-primary whitespace-nowrap text-sm'}
            >
              {getFileName(form.watch(name))}
            </Link>
            <FaTrash
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                RemoveFile()
              }}
              className={'size-4 text-primary'}
            />
          </div>
        </>
      ) : (
        <Input
          id={'file'}
          onChange={(e) => HandleUploadBerkas(e.target.files)}
          className={`bg-white w-full ${innerClassName}`}
          type={'file'}
        />
      )}

      <input
        type="file"
        className="w-full"
        hidden
        ref={refButtton}
        onChange={(e) => HandleUploadBerkas(e.target.files)}
      />
      <FormMessage />
    </div>
  )
}
