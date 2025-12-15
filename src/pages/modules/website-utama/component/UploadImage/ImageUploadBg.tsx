import AxiosClient from '@/provider/axios'
import { useState, useRef, type DragEvent, type ChangeEvent, useEffect } from 'react'
import { MdNoPhotography } from 'react-icons/md'
import { toast } from 'react-toastify'

import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import ButtonDelete from '@/components/common/button/ButtonDelete'
import { useQueryClient } from '@tanstack/react-query'

export interface ImageDataUploader {
  gambar: string
  urutan: number
  status: 'Y' | 'N'
}
interface Props {
  data: ImageDataUploader
  index: number
  handleSave: (value: ImageDataUploader) => void
  handleChecked: (value: boolean) => void
  urlBg: string
  urlBgDelete: string
  keyUrl: string
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minheight?: number
  maxSize?: number
  allowedTypes?: string[]
}
export default function ImageUploader({
  data,

  index,
  handleChecked,
  urlBg,
  keyUrl,
  urlBgDelete,
  maxHeight = 10000,
  maxSize = 2097152,
  maxWidth = 10000,
  minWidth = 200,
  minheight = 200,
  allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'],
}: Props) {
  const [preview, setPreview] = useState<string | null>()
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const queryClient = useQueryClient()
  const handleFile = async (file: File | undefined) => {
    if (!file) return

    const formData = new FormData()
    formData.append('berkas', file)
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/upload`, formData)

      if (res.data.status) {
        const resBg = await AxiosClient.post(urlBg, [
          {
            gambar: res.data.url,
            urutan: Math.floor(Math.random() * 1000) + index,
            status: data.status,
          },
        ])
        if (resBg.data.status) {
          toast.success(resBg.data.message)
          await queryClient.invalidateQueries({
            queryKey: [keyUrl],
          })

          setPreview(res.data.url)
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      if (!allowedTypes?.includes(file.type)) {
        toast.error(`Format file tidak didukung. ${allowedTypes?.join(',')}`)
        return
      }
      if (file.size > maxSize) {
        toast.error(`Ukuran file maksimal ${maxSize / 1024 / 1024}`)

        return
      }
      const img = new Image()
      const objectUrl = URL.createObjectURL(file)

      img.src = objectUrl
      img.onload = () => {
        const { width, height } = img

        URL.revokeObjectURL(objectUrl)

        if (width < minWidth || height < minheight) {
          toast.error(`Resolusi minimal ${minWidth}x${minheight}px`)
          return
        }

        if (width > maxWidth || height > maxHeight) {
          toast.error(`Resolusi maksimal ${maxWidth}x${maxHeight}px`)
          return
        }

        // ✅ File lolos semua validasi
        console.log('File valid:', file)

        // handleFile(file)
      }
    }
    handleFile(e.dataTransfer.files?.[0])
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!allowedTypes?.includes(file.type)) {
        toast.error(`Format file tidak didukung. ${allowedTypes?.join(',')}`)
        return
      }
      if (file.size > maxSize) {
        toast.error(`Ukuran file maksimal ${maxSize / 1024 / 1024}`)

        return
      }
      const img = new Image()
      const objectUrl = URL.createObjectURL(file)

      img.src = objectUrl
      img.onload = () => {
        const { width, height } = img

        URL.revokeObjectURL(objectUrl)

        if (width < minWidth || height < minheight) {
          toast.error(`Resolusi minimal ${minWidth}x${minheight}px`)
          return
        }

        if (width > maxWidth || height > maxHeight) {
          toast.error(`Resolusi maksimal ${maxWidth}x${maxHeight}px`)
          return
        }

        // ✅ File lolos semua validasi
        console.log('File valid:', file)

        // handleFile(file)
      }
    }
    handleFile(file)
  }

  useEffect(() => {
    if (data) {
      setPreview(data.gambar)
    }
  }, [data])

  if (loading) {
    return <Skeleton className="max-h-[60px] min-h-60 w-full" />
  }

  return (
    <div>
      {preview ? (
        <div
          className={`border-2 border-dotted border-[#70F2B1] bg-green-50 w-full 
      flex flex-col ${!preview ? 'justify-center items-center' : ''} cursor-pointer`}
        >
          <img
            src={preview}
            alt="preview"
            className=" max-h-[60px] min-h-60 object-cover bg-cover w-full"
          />
          <div className="px-4 py-2 flex justify-between">
            <div className="flex gap-2 items-center">
              <Checkbox
                onCheckedChange={(e: boolean) => {
                  handleChecked(e)
                }}
                checked={data.status == 'Y'}
                id={'image' + index}
                name={'image' + index}
              />
              <label htmlFor={'image' + index}>Aktifkan Gambar Ini</label>
            </div>
            <ButtonDelete
              queryKey={keyUrl}
              urlDelete={urlBgDelete}
              description={
                <div>
                  <p>"Apakah anda yakin untuk menghapus gambar ini?"</p>
                  <img className="w-full h-60" src={data.gambar} />
                </div>
              }
              title="Hapus Gambar Background"
            />
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dotted border-[#70F2B1] bg-green-50 w-full 
      flex flex-col ${!preview ? 'justify-center items-center' : ''} min-h-60 cursor-pointer h-full`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
        >
          <span className="text-gray-400 text-xl mb-3">
            <MdNoPhotography />
          </span>
          <p className="text-gray-500 text-sm text-center">
            Seret & lepas gambar di sini, atau{' '}
            <span className="text-green-600 underline">Pilih dari Komputer Anda</span>
          </p>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileRef}
        onChange={onFileChange}
      />
    </div>
  )
}
