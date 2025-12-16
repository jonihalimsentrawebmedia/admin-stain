import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'

interface props {
  data: IBGThumbnail
  context: string
  queryName: string
}

export const ButtonDelete = (props: props) => {
  const { data, context, queryName } = props
  const [open, setOpen] = useState(false)

  const queryClient = useQueryClient()

  const HandleDelete = async () => {
    await AxiosClient.delete(`/website-utama/${context}/${data?.id_background}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: [queryName] })
          toast.success('Berhasil menghapus gambar')
        }
      })
      .catch((err) => toast.error(err?.response?.data?.message || 'Terjadi kesalahan.'))
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        // onClick={() => HandleDelete(item?.id_background)}
        className={'bg-red-500 p-1.5 rounded text-white'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        className={'lg:max-w-2xl rounded'}
        setOpen={setOpen}
        title={<p className={'text-red-500'}>Hapus Gambar Background</p>}
        description={'Apakah anda yakin untuk menghapus Gambar Background ini?'}
      >
        <div>
          <img src={data?.gambar} alt="gambar" className={'w-full h-[250px] object-cover'} />
          <div className="flex items-center justify-end mt-5 gap-2">
            <Button
              variant={'outline'}
              size={'sm'}
              className={'border-primary text-primary hover:text-primary'}
              onClick={() => setOpen(!open)}
            >
              <BiX /> Batal
            </Button>
            <Button onClick={HandleDelete} variant={'destructive'}>
              <FaTrash /> Hapus
            </Button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
