import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import AxiosClient from '@/provider/axios'
import { Trash2, Upload } from 'lucide-react'
import { type ChangeEvent, useRef, useState } from 'react'
import { MdImageNotSupported } from 'react-icons/md'
import { toast } from 'react-toastify'
import { Switch } from '@/components/ui/switch.tsx'

interface Props {
  img: { is_thumbnail: boolean; url: string }
  setImage: (value: { is_thumbnail: boolean; url: string }) => void
  isEdit: boolean
}

const ImageAbout = ({ img, setImage, isEdit }: Props) => {
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const handleFile = async (file: File) => {
    const formData = new FormData()
    formData.append('berkas', file)

    setLoading(true)
    try {
      const res = await AxiosClient.post('/upload', formData)

      if (res.data.status && res.data.url) {
        setImage({
          is_thumbnail: img.is_thumbnail, // pertahankan status thumbnail
          url: res.data.url,
        })
        toast.success('Gambar berhasil diupload')
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal upload gambar')
    } finally {
      setLoading(false)
    }
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validasi ukuran & tipe (bisa ditambah validasi resolusi jika perlu)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 2 MB')
      return
    }

    handleFile(file)
  }

  if (loading) return <Skeleton className="w-full h-40" />

  return (
    <div>
      {isEdit && (
        <div className="border p-1.5 my-2 rounded w-full flex items-center gap-2">
          <Switch
            disabled={img.url === ''}
            checked={img.is_thumbnail}
            onCheckedChange={(checked) => {
              setImage({ ...img, is_thumbnail: checked })
            }}
          />
          Jadikan Thumbnail
        </div>
      )}

      {img.url ? (
        <img
          src={img.url}
          className="w-full h-[250px] rounded-lg object-cover object-center"
          alt="preview"
        />
      ) : (
        <div className="flex justify-center items-center text-center text-[#999] h-40 rounded-lg bg-[#F5FFFA] border border-[#70F2B1]">
          <div>
            <MdImageNotSupported className="mx-auto text-4xl mb-2" />
            Belum ada gambar
          </div>
        </div>
      )}

      {isEdit && (
        <div className="flex gap-2 justify-center mt-4">
          <Button
            onClick={(e) => {
              e.preventDefault()
              fileRef.current?.click()
            }}
            variant="outline"
            className="border-primary text-primary"
          >
            <Upload className="mr-2" />
            {img.url ? 'Ganti' : 'Upload'}
          </Button>

          {img.url && (
            <Button
              onClick={(e) => {
                e.preventDefault()
                setImage({ is_thumbnail: false, url: '' })
              }}
              variant="destructive"
            >
              <Trash2 className="mr-2" />
              Hapus
            </Button>
          )}
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
