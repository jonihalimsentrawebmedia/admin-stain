import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import AxiosClient from '@/provider/axios'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { toast } from 'react-toastify'

interface Props {
  img: string
 
}

const PhotoProfile = ({ img, }: Props) => {
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
    <div className="flex flex-col">
      <div className="max-w-40 mx-auto rounded-full bg-gray-100 flex justify-center items-center border relative max-h-40">
        {loading ? (
          <Skeleton className="h-40 w-40 rounded-full" />
        ) : (
          <img className="rounded-full" src={image} alt="" />
        )}

        <input
          ref={ref}
          accept=".png, .jpg, .jpeg, image/png, image/jpeg"
          onChange={handleUpload}
          type="file"
          className="hidden"
        />
      </div>
      <Button
        onClick={(e) => {
          e.preventDefault()
          ref.current?.click()
        }}
        variant={'outline'}
        className="bg-white mt-4 w-fit mx-auto text-primary border border-primary"
      >
        Ganti Foto
      </Button>

      <div>
        Ketentuan Foto Profil
        <ul className="ml-4 pl-4 list-disc list-outside">
          <li>Format file: .jpg / .png / .jpeg</li>
          <li>Ukuran Maks: 2MB</li>
        </ul>
      </div>
    </div>
  )
}

export default PhotoProfile
