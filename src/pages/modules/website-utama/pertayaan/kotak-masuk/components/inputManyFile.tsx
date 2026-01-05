import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { MdUpload } from 'react-icons/md'
import { Button } from '@/components/ui/button.tsx'
import { useEffect, useRef, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

interface Props<T extends FieldValues> {
  label?: string
  name: Path<T>
  form: UseFormReturn<T>
  isRow?: boolean
}

export const InputManyFile = <T extends FieldValues>(props: Props<T>) => {
  const { label, name, form } = props

  const [listFileLink, setListFileLink] = useState<string[]>([])

  const data = form.getValues(name)

  useEffect(() => {
    if (data) {
      setListFileLink(data as any)
    }
  }, [data])

  const refInput = useRef<null | HTMLInputElement>(null)

  const HandleUploadFile = async (files: FileList | null) => {
    if (!files?.length) return

    const formData = new FormData()
    formData.append('berkas', files[0])

    const temp: string[] = [...listFileLink]

    try {
      const res = await AxiosClient.post('/upload', formData)

      if (res.data.status) {
        temp.push(res.data.url)

        setListFileLink(temp)

        form.setValue(name, temp as any, { shouldDirty: true })

        toast.success(res.data.message || 'Success Upload File')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    }
  }

  return (
    <>
      <div className="grid grid-cols-[12rem_1fr] gap-5 items-start text-sm">
        <label>{label}</label>
        <div className={'flex flex-col gap-1.5'}>
          <Button
            onClick={(e) => {
              e.preventDefault()
              refInput.current?.click()
            }}
            variant={'outline'}
            className={`border border-primary text-primary hover:text-primary w-fit rounded`}
          >
            Upload Dokumen
            <MdUpload />
          </Button>

          {listFileLink.map((row, index) => (
            <Link
              to={row}
              target={'_blank'}
              key={index}
              className={
                'bg-primary-foreground p-2 w-[15rem] text-primary border border-primary rounded'
              }
            >
              {index + 1}. Dokumen {index + 1}
            </Link>
          ))}

          <input
            type="file"
            hidden
            ref={refInput}
            onChange={(e) => HandleUploadFile(e.target.files)}
          />
        </div>
      </div>
    </>
  )
}
