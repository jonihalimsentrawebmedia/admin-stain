import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'

import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import type { IStudentLetter } from '../types/index'
import { Link } from 'react-router-dom'

interface props {
  data?: IStudentLetter
}
export const ButtonDeleteLetter = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/website-utama/surat-keterangan-mahasiswa/${data?.id_surat_mahasiswa_surat_keterangan_mahasiswa}`
    )
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['surat-keterangan-mahasiswa'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className={'text-white bg-red-500 p-1.5 rounded'}>
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500'}>Hapus Surat Ketrarangan Mahasiswa ?</p>}
        description={'Apakah anda yakin ingin menghapus surat ketrarangan mahasiswa ini?'}
        className={'lg:max-w-2xl rounded'}
      >
        <div className="grid grid-cols-[12rem_1fr] gap-5">
          <p className="text-gray-500">Judul Surat</p>
          <p>{data?.judul_surat}</p>
          <p className="text-gray-500">Keterangan</p>
          <p>{data?.keterangan}</p>
          <p className="text-gray-500">Link Google Form</p>
          <Link to={data?.link_google_form ?? '#'} target="_blank" className="text-primary">
            <Button
              variant={'outline'}
              className={'text-primary border-primary hover:text-primary'}
            >
              Buka Link
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            onClick={(e) => {
              e.preventDefault()
              setOpen(false)
            }}
            variant={'outline'}
            className={'text-primary border-primary hover:text-primary'}
          >
            <BiX />
            Batal
          </Button>
          <Button variant={'destructive'} disabled={loading} onClick={HandleDelete}>
            <FaTrash />
            Simpan
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}
