import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IProdiLandingPage } from '@/pages/modules/website-prodi/settings/landing-page/data/types.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FaTrash } from 'react-icons/fa'

interface props {
  data: IProdiLandingPage
}

export const ButtonDeleteLandingProdi = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/prodi/landing-page/${data?.id_prodi_landing_page}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['landing-page'],
          })
          toast.success(res.data.message || 'Success tambah gambar')
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
        className={'bg-red-500 hover:bg-red-600 text-white p-1.5 rounded'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Edit Gambar'}
        className={'rounded lg:max-w-2xl'}
      >
        <div className={'flex-col flex gap-5'}>
          <img
            src={data?.gambar_url}
            alt="img"
            className={'lg:max-w-[400px] object-contain h-[200px] mx-auto'}
          />
          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                isDisabled: loading,
                onClick: () => setOpen(false),
              },
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
        </div>
      </DialogCustom>
    </>
  )
}
