import { Label } from '@/components/ui/label.tsx'
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { Link } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { MdInfo, MdOutlineFileUpload } from 'react-icons/md'
import { cn } from '@/lib/utils.ts'

interface Props<T extends FieldValues> {
  label: string
  form: UseFormReturn<T>
  name: Path<T>
  required?: boolean
}

interface documents {
  url: string
  nama_lampiran: string
}

export const UploadDocWithDescription = <T extends FieldValues>(props: Props<T>) => {
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
        temp.push({ url: res.data.url, nama_lampiran: file[0].name })
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
        <div className="flex flex-col gap-5 w-full">
          <div className={'flex items-stretch gap-2 w-full'}>
            <div
              className={cn(
                'border rounded border-primary text-primary hover:text-primary p-4',
                'flex items-center gap-4 justify-center max-w-[350px] cursor-pointer'
              )}
              onClick={(e) => {
                e.preventDefault()
                uploadRef.current?.click()
              }}
            >
              <MdOutlineFileUpload className={'size-8'} />
              <div className={'space-y-1.5'}>
                <p>Upload Dokumen</p>
                <p className={'text-xs'}>Kilik Atau Seret File Ke sini Untuk Mengunggah</p>
              </div>
            </div>
            <div className={'border rounded border-primary p-2'}>
              <div className={'flex items-start gap-2'}>
                <MdInfo className={'text-primary size-8'} />
                <div className={'space-y-1.5'}>
                  <p className="text-primary font-semibold">Bisa Lebih Dari 1 File</p>
                  <p className={'text-gray-500 text-xs'}>
                    Format Yang Didukung : PDF, DOC , DOCX, XLS, XLSX,
                  </p>
                  <p className={'text-gray-500 text-xs'}>Maksimal Ukuran File : 10MB Per file</p>
                </div>
              </div>
            </div>
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
                  <Link to={doc?.url ?? '#'} target="_blank">
                    {index + 1}. {doc?.nama_lampiran}
                  </Link>
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
