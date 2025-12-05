import { IconEdit } from '@/components/common/table/icon'
import { Skeleton } from '@/components/ui/skeleton'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { toast } from 'react-toastify'

interface Props {
  img: string
  isEdit?: boolean
}

const ImageProfile = ({ img, isEdit }: Props) => {
  const [image, setImage] = useState('')
  const ref = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const formData = new FormData()
      formData.append('berkas', file)
      setLoading(true)
      const res = await AxiosClient.post(`/upload`, formData)

      if (res.data.status) {
        const res1 = await AxiosClient.patch(`/profil/ganti-photo`, {
          url_berkas: res.data.url,
        })

        if (res1.data.status) {
          setImage(res.data.url)
          toast.success(res1.data.message)
          await queryClient.invalidateQueries({
            queryKey: ['profile'],
          })
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (img) {
      setImage(img)
    }
  }, [img])

  return (
    <div className="max-w-[250px] flex justify-center items-center border relative max-h-[250px]">
      {loading ? <Skeleton className="h-[250px] w-[250px]" /> : <img src={image} alt="" />}

      {isEdit && (
        <div className="flex gap-2 absolute top-2 right-2">
          <button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
              ref.current?.click()
            }}
          >
            <IconEdit />
          </button>
        </div>
      )}

      <input ref={ref} onChange={handleUpload} type="file" className="hidden" />
    </div>
  )
}

export default ImageProfile
