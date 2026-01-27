import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import type { IUnitFacilities } from '../data'
import { useNavigate } from 'react-router-dom'

const ButtonAggreManagementEditor = (data: IUnitFacilities) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const HandleApprove = async () => {
    setLoading(true)
    await AxiosClient.patch(`/editor/unit-fasilitas/${data?.id_unit_fasilitas}/status-publish`, {
      status_publish: 'DISETUJUI_EDITOR',
    })
      .then((res) => {
        if (res?.data?.status) {
          navigate('/modules/editor/dashboard')
          toast.success(res.data.message || 'Success Mengajukan data fasilitas unit')
          setOpen(false)
          setLoading(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        size={'sm'}
        variant={'outline'}
        className={'border-green-500 text-green-500 hover:text-green-600'}
      >
        <Check />
        Setujui
      </Button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={'Setujui Fasilitas Unit'}
        description={'Apakah anda yakin untuk menyetujui fasilitas?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          <div className="flex items-center justify-center">
            <img src={data?.gambar} alt="image" className={'w-[320px] h-60 object-cover'} />
          </div>
          <p className="text-gray-500">Nama Fasilitas</p>
          <p>{data?.nama_fasilitas}</p>

          <div className="flex items-center justify-end">
            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
                {
                  type: 'add',
                  label: '',
                  element: (
                    <Button
                      disabled={loading}
                      className={'bg-green-500 hover:bg-green-600'}
                      onClick={HandleApprove}
                    >
                      <Check />
                      Setujui Sekarang
                    </Button>
                  ),
                  onClick: () => {},
                },
              ]}
            />
          </div>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonAggreManagementEditor
