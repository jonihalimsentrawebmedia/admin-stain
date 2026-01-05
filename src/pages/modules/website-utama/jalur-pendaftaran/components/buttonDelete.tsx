import { useState } from 'react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import type { IRegistrationPath } from '@/pages/modules/website-utama/jalur-pendaftaran/data/types.ts'
import { Switch } from '@/components/ui/switch.tsx'

interface Props {
  data: IRegistrationPath
}

export const ButtonDeleteRegistrationPath = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/jalur-pendaftaran/${data?.id_jalur_pendaftaran}`)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['register-path'],
          })
          toast.success(res.data.message || 'Success Tambah Jalur Pendaftaran')
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
        className={'p-2 text-white bg-red-500 hover:bg-red-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500 text-2xl'}>Hapus Jalur Pendaftaran</p>}
        className={'rounded lg:max-w-4xl'}
        description={'Apakah Anda yakin ingin menghapus Jalur Pendaftaran ini?'}
        disableOutsideDialog
      >
        <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
          <p className={'text-gray-500'}>Jalur Pendaftaran</p>
          <p>{data?.nama_jalur_pendaftaran}</p>
          <p className={'text-gray-500'}>Deskripsi</p>
          <div
            className={'tiptap ProseMirror simple-editor'}
            dangerouslySetInnerHTML={{ __html: data?.deskripsi ?? '' }}
          />
          <p className={'text-gray-500'}>Status</p>
          <Switch checked={data?.status === 'Y'} disabled />
        </div>
        <div className="flex justify-end gap-2 mt-5">
          <Button
            variant={'outline'}
            className={'text-primary hover:text-primary border-primary'}
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
              setOpen(!open)
            }}
          >
            <BiX />
            Batal
          </Button>

          <Button variant={'destructive'} disabled={loading} onClick={HandleSave}>
            <FaTrash />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}
