import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import type { IProgramList } from '../data/types.ts'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { format } from 'date-fns'
import { clsx } from 'clsx'
import { Check } from 'lucide-react'
import { BiX } from 'react-icons/bi'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  data?: IProgramList
}

export const ButtonDeleteProgram = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/pusilkom/program/${data?.id_program}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data')
          queryClient.invalidateQueries({
            queryKey: ['list-program'],
          })
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        className={'p-1.5 text-white bg-red-500 rounded hover:bg-red-600 w-fit'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogBasic title={'Hapus Data Training'} open={open} setOpen={setOpen}>
        <div className={'grid grid-cols-[12rem_1fr] gap-4'}>
          <p className="text-gray-500">Nama Pelatihan</p>
          <p>{data?.nama_program}</p>
          <p className="text-gray-500">data?.status_pengisian Pengisian</p>
          <ul>
            <li
              className={clsx(
                data?.status_pengisian?.is_informasi_pendaftaran
                  ? 'text-green-500'
                  : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {data?.status_pengisian?.is_informasi_pendaftaran ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Informasi Pendaftaran
            </li>
            <li
              className={clsx(
                data?.status_pengisian?.is_topik_bahasan_jadwal
                  ? 'text-green-500'
                  : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {data?.status_pengisian?.is_topik_bahasan_jadwal ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Topik Bahasan & Jadwal
            </li>
            <li
              className={clsx(
                data?.status_pengisian?.is_persyaratan ? 'text-green-500' : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {data?.status_pengisian?.is_persyaratan ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Persyaratan
            </li>
            <li
              className={clsx(
                data?.status_pengisian?.is_biaya_pendaftaran ? 'text-green-500' : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {data?.status_pengisian?.is_biaya_pendaftaran ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Biaya Pendaftaran
            </li>
            <li
              className={clsx(
                data?.status_pengisian?.is_rekening_penerimaan ? 'text-green-500' : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {data?.status_pengisian?.is_rekening_penerimaan ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Rekening Penerimaan
            </li>
            <li
              className={clsx(
                data?.status_pengisian?.is_kontak_catatan_tambahan
                  ? 'text-green-500'
                  : 'text-gray-400',
                'flex items-center gap-1.5'
              )}
            >
              {data?.status_pengisian?.is_kontak_catatan_tambahan ? (
                <Check className={'text-green-500 size-4'} />
              ) : (
                <BiX className={'text-red-500 size-4'} />
              )}
              Kontak & Catatan Tambahan
            </li>
          </ul>
          <p className="text-gray-500">Dibuat</p>
          <p>{data?.created_at ? format(data?.created_at, 'dd-MM-yyyy') : ''}</p>
          <p className="text-gray-500">Terakhir Edit</p>
          <p>{data?.updated_at ? format(data?.updated_at, 'dd-MM-yyyy') : ''}</p>
        </div>

        <ButtonTitleGroup
          label={''}
          buttonGroup={[
            {
              type: 'cancel',
              label: 'Batal',
              onClick: () => setOpen(false),
            },
            {
              type: 'custom',
              element: (
                <button
                  className={
                    'p-1.5 text-white bg-red-500 hover:bg-red-600 flex items-center px-2 gap-1.5 rounded'
                  }
                  onClick={HandleDelete}
                  disabled={loading}
                >
                  <FaTrash className={'size-4'} />
                  Hapus
                </button>
              ),
            },
          ]}
        />
      </DialogBasic>
    </>
  )
}
