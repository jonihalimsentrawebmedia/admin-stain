import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IStructuralPosition } from '@/pages/modules/settings/reference/structural-official/data/types.ts'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  data: IStructuralPosition
}

const ButtonDeleteStructural = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/pengaturan/referensi/jabatan-struktural/${data?.id_jabatan_struktural}`
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message)
          queryClient.invalidateQueries({
            queryKey: ['structural-official'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        className={'bg-red-500 text-white hover:bg-red-600 p-1.5 rounded'}
        onClick={() => {
          setOpen(true)
        }}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Hapus Jabatan Struktural'}
        className={'max-w-2xl! w-full! rounded'}
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Jabatan Struktural</p>
          <p>{data?.nama_jabatan_struktural}</p>
        </div>
        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              onClick: () => setOpen(false),
            },
            {
              type: 'custom',
              element: (
                <Button onClick={HandleSave} disabled={loading} variant={'destructive'}>
                  <FaTrash /> Hapus
                </Button>
              ),
            },
          ]}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonDeleteStructural
