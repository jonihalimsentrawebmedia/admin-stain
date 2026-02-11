import { Label } from '@/components/ui/label.tsx'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button.tsx'
import { MdUpload } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'

interface Props<T extends FieldValues> {
  label: string
  form: UseFormReturn<T>
  name: Path<T>
  required?: boolean
}

interface documents {
  url_dokumen: string
}

export const UploadDocument = <T extends FieldValues>(props: Props<T>) => {
  const { label, required, name, form } = props

  const uploadRef = useRef<any | null>(null)
  const [documents, setDocuments] = useState<documents[]>([])

  const dataDocuments = form.watch(name)

  useEffect(() => {
    if (dataDocuments) setDocuments(dataDocuments)
  }, [dataDocuments])

  const HandleUpload = async (file: null | FileList) => {
    if (!file) return
    const formData = new FormData()
    formData.append('berkas', file[0])
    await AxiosClient.post('/upload', formData).then((res) => {
      if (res.data.status) {
        const temp = [...documents]
        temp.push({ url_dokumen: res.data.url })
        form.setValue(name, temp as any)
        setDocuments(temp)

        if (uploadRef.current) uploadRef.current.value = ''
      }
    })
  }


  return (
    <>
      <div className="grid grid-cols-[12rem_1fr] gap-5 items-start">
        <Label className={'text-gray-500'}>
          {label} {required && <span className={'text-red-500'}> *</span>}
        </Label>
        <div className="flex flex-col gap-5">
          <div className={'flex items-center gap-2'}>
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
              onClick={(e) => {
                e.preventDefault()
                uploadRef.current?.click()
              }}
            >
              Upload Dokumen
              <MdUpload />
            </Button>
            <p className="text-blue-600 text-sm">Bisa lebih dari 1*</p>
            <input
              onChange={(e) => {
                HandleUpload(e.target.files)
              }}
              ref={uploadRef}
              accept={'.pdf'}
              type="file"
              hidden
            />
          </div>
          <ul className={'flex flex-col gap-2'}>
            {documents.map((doc, index) => (
              <li key={index}>
                <div
                  className={
                    'p-2 border border-primary flex justify-between items-center rounded text-sm w-full max-w-xs text-primary'
                  }
                >
                  <Link to={doc?.url_dokumen ?? '#'}>{index + 1}. File Dokumen.pdf</Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      const temp = documents.filter((_, i) => i !== index)
                      form.setValue(name, temp as any)
                      setDocuments(temp)
                    }}
                  >
                    <FaTrash className={'size-4 text-red-500'} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
