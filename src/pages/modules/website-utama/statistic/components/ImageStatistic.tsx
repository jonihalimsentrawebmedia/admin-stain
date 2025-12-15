import { IconDeleteImage, IconEditGreen } from '@/components/common/table/icon'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import AxiosClient from '@/provider/axios'
import { CameraOff } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { toast } from 'react-toastify'
import type { StatistikUniversitasType } from '../model'

interface Props {
  image: string
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minheight?: number
  maxSize?: number
  allowedTypes?: string[]

  isEdit: boolean
  index: number
  setImage: (image: string) => void
  handleSave: (value: StatistikUniversitasType) => void
  form: any
}
const ImageStatistic = ({
  image,
  isEdit,
  index,
  handleSave,
  setImage,
  form,
  allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'],
  maxHeight = 10000,
  maxSize = 2097152,
  maxWidth = 10000,
  minWidth = 200,
  minheight = 200,
}: Props) => {
  const [preview, setPreview] = useState<string | null>('')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const handleFile = async (file: File | undefined) => {
    if (!file) return

    const formData = new FormData()
    formData.append('berkas', file)
    setLoading(true)
    try {
      const res = await AxiosClient.post(`/upload`, formData)

      if (res.data.status) {
        toast.success(res.data.message)
        setImage(res.data.url)
        setPreview(res.data.url)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    console.log(file)
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
    if (image) {
      setPreview(image)
    }
  }, [image])
  if (loading) {
    return <Skeleton className="max-h-[60px] min-h-60 w-full" />
  }
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`w-full relative flex items-center flex-col justify-center  h-80 ${isEdit ? 'border border-primary bg-[#F5FFFA]' : 'bg-[#E9E9E9]'}`}
      >
        {preview !== '' ? (
          <img src={preview ?? ''} className="h-full w-full object-center object-cover" alt="" />
        ) : (
          <div
            className={`flex text-center justify-center items-center flex-col  ${isEdit ? 'text-primary' : 'text-[#999999]'}`}
          >
            <CameraOff />
            <div>Gambar {index + 1}</div>
            {!isEdit && <div>Tidak ada Gambar</div>}
          </div>
        )}

        {isEdit && preview !== '' && (
          <div className="flex gap-1 absolute top-2 right-2 items-center">
            <button
              disabled={loading}
              onClick={(e) => {
                e.preventDefault()
                fileRef.current?.click()
              }}
            >
              <IconEditGreen />
            </button>
            <button
              disabled={loading}
              onClick={(e) => {
                e.preventDefault()
                setImage('')
                setPreview('')
              }}
            >
              <IconDeleteImage />
            </button>
          </div>
        )}
      </div>
      {isEdit && (
        <Button
          className="disabled:bg-gray-300"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault()
            if (preview == '') {
              fileRef.current?.click()
            } else {
              handleSave(form.watch())
            }
          }}
        >
          {preview == '' ? 'Upload Gambar' : 'Simpan'}
        </Button>
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

export default ImageStatistic
