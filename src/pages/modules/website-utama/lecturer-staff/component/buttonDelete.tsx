import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FaTrash } from 'react-icons/fa'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import type { IEmployee } from '../data/types.ts'
import { format } from 'date-fns'

interface Props {
  data: IEmployee
}

const ButtonDeleteEmployee = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/sdm/${data?.id_sdm}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success ')
          queryClient.invalidateQueries({
            queryKey: ['employee'],
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
        onClick={() => setOpen(!open)}
        className={'bg-red-500 p-1.5 text-white hover:bg-red-600 rounded'}
      >
        <FaTrash />
      </button>

      <DialogBasic
        title={'Hapus Dosen / Staff'}
        className={'lg:min-w-2xl'}
        open={open}
        setOpen={setOpen}
      >
        <div className={'grid lg:grid-cols-2 gap-5'}>
          <p className="text-gray-500">Nama</p>
          <p>{data?.nama}</p>
          <p className="text-gray-500">NIK</p>
          <p>{data?.nama_status}</p>
          <p className="text-gray-500">NIP</p>
          <p>{data?.nip}</p>
          <p className="text-gray-500">Golongan</p>
          <p>{data?.golongan}</p>
          <p className="text-gray-500">Status</p>
          <p>{data?.nama_status}</p>
          <p className="text-gray-500">TTL</p>
          <p>
            {data?.tempat_lahir}{' '}
            {data?.tanggal_lahir ? format(data?.tanggal_lahir, 'dd-MM-yyyy') : ''}
          </p>
          <p className="text-gray-500">Unit Kerja</p>
          <p>{data?.nama_unit_kerja}</p>
          <p className="text-gray-500">Sumber Data</p>
          <p>{data?.sumber_data}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            { type: 'cancel', label: 'Batal', onClick: () => setOpen(!open) },
            {
              type: 'custom',
              element: (
                <Button disabled={loading} onClick={HandleSave} variant={'destructive'}>
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

export default ButtonDeleteEmployee
