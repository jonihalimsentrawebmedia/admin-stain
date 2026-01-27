import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { ISessionProdi } from '@/pages/modules/website-prodi/hooks'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { ICurriculum } from '@/pages/modules/website-prodi/curriculum/data/types.tsx'
import { useQueryClient } from '@tanstack/react-query'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface Props {
  data?: ICurriculum
  session?: ISessionProdi
}

export const ButtonDeleteCurriculum = (props: Props) => {
  const { data, session } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/prodi/kurikulum/${data?.id_kurikulum}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success tambah kurikulum')
          queryClient.invalidateQueries({
            queryKey: ['curriculum'],
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 hover:bg-red-500 text-white p-1.5'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500'}>Hapus Kurikulum</p>}
        description={'Apakah anda yakin untuk menghapus data kurikulum ini?'}
        className={'rounded lg:max-w-2xl'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className="text-gray-500">Universitas</p>
          <p>{session?.nama_universitas}</p>
          <p className="text-gray-500">Fakultas</p>
          <p>{session?.nama_fakultas}</p>
          <p className="text-gray-500">Prodi</p>
          <p>{session?.nama_prodi}</p>
          <p className="text-gray-500">Nama Kurikulum</p>
          <p>{data?.nama_kurikulum}</p>
          <p className="text-gray-500">Lama Kuliah (Tahun)</p>
          <p>{data?.lama_kuliah}</p>

          <div className="col-span-2">
            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                { type: 'cancel', isDisabled: loading, onClick: () => setOpen(false) },
                {
                  type: 'custom',
                  element: (
                    <Button variant={'destructive'} disabled={loading} onClick={HandleSave}>
                      <FaTrash />
                      Hapus
                    </Button>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
