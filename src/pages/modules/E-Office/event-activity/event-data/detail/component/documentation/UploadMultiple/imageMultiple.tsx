import { Label } from '@/components/ui/label.tsx'
import { type ChangeEvent, type Dispatch, type SetStateAction, useRef, useState } from 'react'
import { FaSave, FaTrash } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
  setLoading: Dispatch<SetStateAction<boolean>>
  loading: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  open: boolean
}

const UploadImageMultiple = (props: Props) => {
  const { setLoading, loading, setOpen, open } = props
  const { id } = useParams()
  const btnRef = useRef<any>(null)
  const [images, setImages] = useState<{ file: File; preview: string }[]>([])

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const files = e.target.files
    if (!files) return
    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setImages((prev) => [...prev, ...newImages])
    setLoading(false)
  }

  const HandleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const queryClient = useQueryClient()
  const HandlePostImage = async () => {
    setLoading(true)
    for (const image of images) {
      const formData = new FormData()
      formData.append('berkas', image.file)
      await AxiosClient.post(`/upload`, formData)
        .then(async (res) => {
          if (res.data.status) {
            await AxiosClient.post(`/eoffice/acara/${id}/dokumentasi`, {
              jenis_file: 'UPLOAD',
              url_file: res.data.url,
            })
              .then((res2) => {
                if (res2.data.status) {
                  queryClient.invalidateQueries({
                    queryKey: ['documentation'],
                  })
                  setImages((prev) => prev.filter((item) => item.file !== image.file))
                  setLoading(false)
                }
              })
              .catch((err) => {
                toast.error(err?.response?.data?.message || 'Error')
                setLoading(false)
              })
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message || 'Error')
          setLoading(false)
        })
    }
    toast.success('Berhasil Upload Semua Foto')
    setOpen(!open)
  }

  return (
    <>
      <div className={'flex flex-col gap-2'}>
        <Label>Photo Dokumentasi</Label>
        <input
          type="file"
          multiple
          className="hidden"
          ref={btnRef}
          accept="image/*"
          onChange={handleUpload}
        />
        <button
          className={'p-1 text-sm w-1/2 border border-primary'}
          onClick={() => btnRef.current.click()}
        >
          Klik Untuk Mencari File
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4 overflow-y-scroll max-h-[450px]">
        {images.map((image, index) => (
          <div key={index} className="relative border shadow">
            <button
              className="absolute top-1 right-1 rounded bg-red-500 p-1 text-white"
              onClick={() => HandleDeleteImage(index)}
            >
              <FaTrash />
            </button>
            <img src={image.preview} alt="" className="h-[250px] w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end mt-4">
        <Button
          onClick={HandlePostImage}
          disabled={images.length === 0 || loading}
          className="w-fit"
        >
          <FaSave className={'size-4'} />
          Simpan
        </Button>
      </div>
    </>
  )
}

export default UploadImageMultiple
