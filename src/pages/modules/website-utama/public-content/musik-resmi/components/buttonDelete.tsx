import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import type { IMarsMusic } from '@/pages/modules/website-utama/public-content/musik-resmi/types'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  data: IMarsMusic
}

export const ButtonDeleteOfficialMusic = (props: props) => {
  const { data } = props
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/mars-musik/${data?.id_mars_musik}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({ queryKey: ['official-music'] })
          toast.success('Berhasil menghapus musik resmi')
        }
      })
      .catch((err) => toast.error(err?.response?.data?.message || 'Terjadi kesalahan.'))
  }

  return (
    <>
      <button className={'bg-red-500 p-1.5 rounded text-white'} onClick={() => setOpen(!open)}>
        <FaTrash />
      </button>

      <DialogCustom
        className={'lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-2xl text-red-500'}>Hapus Musik Resmi</p>}
      >
        <div className={'flex flex-col gap-5'}>
          <div className="col-span-2 max-w-[240px]">
            <AspectRatio ratio={3 / 4}>
              <img src={data?.gambar_url} className={'w-full h-full object-cover'} alt="image" />
            </AspectRatio>
          </div>

          <div className="grid grid-cols-[12rem_1fr]">
            <p className={'text-gray-500'}>Judul</p>
            <p>{data?.judul}</p>
          </div>

          <div className="flex items-center justify-end col-span-2 gap-2">
            <Button
              className={'text-primary border border-primary hover:text-primary'}
              onClick={() => setOpen(!open)}
              variant={'outline'}
            >
              <BiX />
              Batal
            </Button>
            <Button
              disabled={loading}
              className={'bg-red-500 hover:bg-red-600 text-white'}
              onClick={HandlerDelete}
            >
              <FaTrash />
              Hapus
            </Button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
