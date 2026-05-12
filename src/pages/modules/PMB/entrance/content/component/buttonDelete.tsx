import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import type { IContentEntrance } from '@/pages/modules/PMB/entrance/content/data/types.ts'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

interface props {
  data: IContentEntrance
}

const ButtonDeleteContentEntrance = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/pmb/jalur-masuk-konten/${data?.id_jalur_masuk_konten}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['content-entrance-pmb'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 p-1.5 text-white hover:bg-red-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic title={'Hapus Konten'} open={open} setOpen={setOpen} className={'min-w-3xl'}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Judul</p>
          <p>{data?.judul_konten}</p>
          <p className="text-gray-500">Isi Konten</p>
          <RenderHTMLContent content={data?.isi_konten ?? ''} />

          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', onClick: () => setOpen(!Option) },
            {
              type: 'custom',
              element: (
                <Button variant={'destructive'} onClick={HandleSave} disabled={loading}>
                  <FaTrash />
                  Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
export default ButtonDeleteContentEntrance
