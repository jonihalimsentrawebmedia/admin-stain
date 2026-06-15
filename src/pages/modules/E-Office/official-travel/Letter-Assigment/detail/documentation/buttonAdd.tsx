import { type ChangeEvent, useRef, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { FaSave, FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

const ButtonAddDocumentation = () => {
  const { id } = useParams()

  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [images, setImages] = useState<
    {
      file: File
      preview: string
    }[]
  >([])

  const refButton = useRef<HTMLInputElement>(null)

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    setImages((prev) => [...prev, ...newImages])

    e.target.value = ''
  }
  const handleRemoveImage = (index: number) => {
    const image = images[index]

    if (image?.preview) {
      URL.revokeObjectURL(image.preview)
    }

    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    try {
      setLoading(true)

      const currentImages = [...images]

      for (const image of currentImages) {
        const formData = new FormData()
        formData.append('berkas', image.file)

        const uploadRes = await AxiosClient.post('/upload', formData)

        if (!uploadRes.data?.status) continue

        const documentationRes = await AxiosClient.post(
          `/eoffice/mail-surat-tugas/${id}/dokumentasi`,
          {
            url_file: uploadRes.data.url,
          }
        )

        if (documentationRes.data?.status) {
          URL.revokeObjectURL(image.preview)
          queryClient.invalidateQueries({
            queryKey: ['documentation-tugas'],
          })

          setImages((prev) => prev.filter((item) => item.preview !== image.preview))
        }
      }

      toast.success('Berhasil upload dokumentasi')
      setOpen(false)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gagal upload dokumentasi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button className="rounded-full text-white hover:text-white" onClick={() => setOpen(true)}>
        <BiPlus />
        Upload Dokumentasi
      </Button>

      <DialogBasic title="Upload Dokumentasi" open={open} setOpen={setOpen} className="min-w-4xl">
        <div className="space-y-4">
          <Button
            disabled={loading}
            onClick={() => refButton.current?.click()}
            className="text-white"
          >
            Pilih Gambar
          </Button>

          <input
            ref={refButton}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleSelectImage}
          />

          {images.length > 0 && (
            <>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 max-h-[450px] overflow-y-auto">
                {images.map((image, index) => (
                  <div
                    key={`${image.file.name}-${index}`}
                    className="relative overflow-hidden rounded-lg border"
                  >
                    <img
                      src={image.preview}
                      alt={image.file.name}
                      className="h-40 w-full object-cover"
                    />

                    <button
                      type="button"
                      className="absolute top-2 right-2 rounded bg-white p-2 text-red-500 shadow"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <FaTrash />
                    </button>

                    <div className="truncate p-2 text-xs">{image.file.name}</div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button className="text-white" disabled={loading} onClick={handleUpload}>
                  <FaSave />
                  {loading ? 'Mengupload...' : 'Simpan'}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonAddDocumentation
