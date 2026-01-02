import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import AxiosClient from '@/provider/axios'
import { Trash2, Upload } from 'lucide-react'
import { useRef, useState, type ChangeEvent } from 'react'
import { MdImageNotSupported } from 'react-icons/md'
import { toast } from 'react-toastify'

interface Props {
  img: string
  setImage: (value: any) => void
  isEdit: boolean
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minheight?: number
  maxSize?: number
  allowedTypes?: string[]
}
const ImageAbout = ({
  img,
  setImage,
  isEdit,
  maxHeight = 10000,
  maxSize = 2097152,
  maxWidth = 10000,
  minWidth = 200,
  minheight = 200,
  allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'],
}: Props) => {
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
        setImage(res.data.url)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
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
  if (loading) {
    return <Skeleton className="w-full h-40" />
  }
  return (
    <div>
      {img == '' ? (
        <div className="flex justify-center text-center text-[#999] h-40 rounded-lg bg-[#F5FFFA] border border-[#70F2B1] items-center">
          <div className="text-center">
            <MdImageNotSupported className="text-center mx-auto" />
            belum ada gambar
          </div>
        </div>
      ) : (
        <img src={img} className="w-full h-40 rounded-lg object-cover object-center" alt="img" />
      )}
      {isEdit && (
        <div className="flex gap-2 mx-auto justify-center mt-4">
          <Button
            onClick={(e) => {
              e.preventDefault()
              fileRef.current?.click()
            }}
            variant={'outline'}
            className="border text-primary border-primary"
          >
            <Upload />
            {img == '' ? 'Upload' : 'Ganti'}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault()
              setImage('')
            }}
            variant={'destructive'}
          >
            <Trash2 />
            Hapus
          </Button>
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

export default ImageAbout
