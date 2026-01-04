import { Button } from '@/components/ui/button'
import AxiosClient from '@/provider/axios'
import { Trash2, Upload } from 'lucide-react'
import { useRef, type ChangeEvent, type DragEvent } from 'react'
import { MdAddPhotoAlternate } from 'react-icons/md'
import { toast } from 'react-toastify'

interface Props {
  image: string
  setImage: (value: string) => void
  isEdit: boolean
  maxWidth?: number
  maxHeight?: number
  minWidth?: number
  minheight?: number
  maxSize?: number
  allowedTypes?: string[]
}

const ImageOrganization = (props: Props) => {
  const {
    image,
    isEdit,
    setImage,
    maxHeight = 10000,
    maxSize = 2097152,
    maxWidth = 10000,
    minWidth = 200,
    minheight = 200,
    allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'],
  } = props
  const fileRef = useRef<HTMLInputElement | null>(null)

  const handleFile = async (file: File | undefined) => {
    if (!file) return

    const formData = new FormData()
    formData.append('berkas', file)

    try {
      const res = await AxiosClient.post(`/upload`, formData)

      if (res.data.status) {
        setImage(res.data.url)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
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
  return (
    <div className="flex flex-col gap-4">
      {isEdit && (
        <div className="flex gap-4 items-center">
          <Button
            onClick={(e) => {
              e.preventDefault()
              fileRef.current?.click()
            }}
            variant={'outline'}
            className="border border-primary text-primary hover:text-primary"
          >
            <Upload />
            Ganti Gambar
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault()
              setImage('')
            }}
            variant={'destructive'}
          >
            <Trash2 />
          </Button>
        </div>
      )}
      {image == '' && isEdit ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className="flex justify-center rounded border border-primary flex-col h-[600px] bg-[#F5FFFA] text-center items-center w-full"
        >
          <MdAddPhotoAlternate className="text-primary size-16" />
          <p>
            Seret dan letakkan gambar anda disini atau{' '}
            <span className="text-primary font-bold">CARI GAMBAR</span>
          </p>
          <ul className="list-disc ml-4 pl-4 list-outside text-start text-[#2769CD]">
            <li>Ukuran 4x3</li>
            <li>Jenis .jpg/.jpeg/.png</li>
            <li>Max 2 MB</li>
          </ul>
        </div>
      ) : (
        <img src={image} className="w-full  object-cover object-center" alt="" />
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

export default ImageOrganization
