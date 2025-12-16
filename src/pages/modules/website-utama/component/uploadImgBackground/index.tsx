import React, { useRef, useState } from 'react'
import { IconPhoto } from '@/components/common/icon'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Checkbox } from '@/components/ui/checkbox'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'
import { cn } from '@/lib/utils'
import { ButtonDelete } from '@/pages/modules/website-utama/public-content/achievement/background/buttonDelete.tsx'

interface Props {
  background: IBGThumbnail[]
  context: string
  max?: number
  queryName: string
}

export const UploadImgBackground = ({ background, context, max = 4, queryName }: Props) => {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()
  const [isDragging, setIsDragging] = useState(false)

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return

    try {
      const formData = new FormData()
      formData.append('berkas', files[0])

      const upload = await AxiosClient.post('/upload', formData)
      if (!upload.data.status) return

      const payload = [
        ...background.map((i) => ({
          gambar: i.gambar,
          urutan: i.urutan,
          status: i.status,
        })),
        {
          gambar: upload.data.url,
          urutan: background.length + 1,
          status: background.length === 0 ? 'Y' : 'N',
        },
      ]

      await AxiosClient.post(`/website-utama/${context}`, payload)

      await queryClient.invalidateQueries({
        queryKey: [queryName],
      })

      toast.success('Upload berhasil')
      if (fileRef.current) fileRef.current.value = ''
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Upload gagal')
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    await handleUpload(e.dataTransfer.files)
  }

  // const HandleDelete = async (id: number) => {
  //   await AxiosClient.delete(`/website-utama/${context}/${id}`)
  //     .then((res) => {
  //       if (res.data.status) {
  //         queryClient.invalidateQueries({ queryKey: [queryName] })
  //         toast.success('Berhasil menghapus gambar')
  //       }
  //     })
  //     .catch((err) => toast.error(err?.response?.data?.message || 'Terjadi kesalahan.'))
  // }

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleUpload(e.target.files)}
      />

      <div className="grid grid-cols-2 gap-6">
        {background.map((item, idx) => (
          <div key={idx} className="border border-primary h-[360px]">
            <img src={item.gambar} className="w-full h-[315px] object-cover" />
            <div className="p-2.5 flex items-center justify-between gap-5">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={item.status === 'Y'}
                  onCheckedChange={async (e: boolean) => {
                    AxiosClient.patch(`/website-utama/${context}/${item.id_background}/status`, {
                      status: e ? 'Y' : 'N',
                    })
                      .then((res) => {
                        if (res.data.status) {
                          queryClient.invalidateQueries({ queryKey: [queryName] })
                        }
                      })
                      .catch((err) =>
                        toast.error(err?.response?.data?.message || 'Terjadi kesalahan.')
                      )
                  }}
                />
                Aktifkan Gambar Ini
              </label>
              <ButtonDelete context={context} queryName={queryName} data={item} />
              {/*<button*/}
              {/*  onClick={() => HandleDelete(item?.id_background)}*/}
              {/*  className={'bg-red-500 p-1.5 rounded text-white'}*/}
              {/*>*/}
              {/*  <FaTrash />*/}
              {/*</button>*/}
            </div>
          </div>
        ))}

        {Array.from({ length: max - background.length }).map((_, i) => (
          <div
            key={i}
            onClick={() => fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            className={cn(
              'cursor-pointer flex flex-col items-center justify-center h-[360px] border transition',
              isDragging ? 'border-primary bg-primary/10' : 'border-primary bg-[#F5FFFA]'
            )}
          >
            <IconPhoto />
            <p className="text-sm text-center">
              Seret & lepas gambar di sini atau klik untuk upload
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
