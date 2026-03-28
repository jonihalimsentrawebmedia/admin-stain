'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { MdHideImage } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { FaTrash } from 'react-icons/fa'
import { useRef } from 'react'
import AxiosClient from '@/provider/axios'
import type { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form'
import { toast } from 'react-toastify'

interface Props<T extends FieldValues> {
  name: Path<T>
  form: UseFormReturn<T>
  ratio_width?: number
  ratio_height?: number
}

export const UploadPhotoImage = <T extends FieldValues>({
  name,
  form,
  ratio_height = 4,
  ratio_width = 3,
}: Props<T>) => {
  const refUpload = useRef<HTMLInputElement | null>(null)

  const HandleUpload = async (file: FileList | null) => {
    if (file) {
      const files = file[0]
      const formData = new FormData()
      formData.append('berkas', files)

      await AxiosClient.post('/upload', formData)
        .then((res) => {
          if (res.data.status) {
            toast.success(res.data.message || 'Success')
            form.setValue(name, res.data.url)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const HandleRemoveImage = () => {
    form.setValue(name, '' as PathValue<T, Path<T>>)

    if (refUpload.current) {
      refUpload.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-[200px]">
        <AspectRatio ratio={ratio_width / ratio_height}>
          {form?.watch(name) ? (
            <img src={form.watch(name)} alt={'image'} className={'object-cover w-full h-full'} />
          ) : (
            <div className="w-full h-full bg-gray-100 text-gray-500 flex flex-col items-center justify-center">
              <MdHideImage className="size-5" />
              <p>belum ada foto</p>
            </div>
          )}
        </AspectRatio>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Foto Profil</p>

        <ul className="list-disc pl-5">
          <li>
            Ukuran {ratio_width}:{ratio_height}
          </li>
          <li>Max. 2MB</li>
          <li>Jenis File: .jpg/.jpeg/.png</li>
        </ul>

        <div className="flex items-center gap-1.5">
          <Button
            onClick={(e) => {
              e.preventDefault()
              refUpload.current?.click()
            }}
            className="rounded border-primary hover:text-primary text-primary"
            size="sm"
            variant="outline"
          >
            Upload
          </Button>

          <input
            ref={refUpload}
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => HandleUpload(e.target.files)}
          />

          <Button
            size="sm"
            variant="destructive"
            className="rounded"
            onClick={(e) => {
              e.preventDefault()
              HandleRemoveImage()
            }}
          >
            <FaTrash />
          </Button>
        </div>
      </div>
    </div>
  )
}
