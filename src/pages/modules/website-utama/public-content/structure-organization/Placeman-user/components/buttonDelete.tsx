import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IPlacemanUser } from '../data/index'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { FaTrash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

export const ButtonDeletePlaceman = (data: IPlacemanUser) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const queryClient = useQueryClient()

  const HandleSave = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/pejabat/${data?.id_pejabat}`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success menghapus data pejabat')
          queryClient.invalidateQueries({
            queryKey: ['list-placeman'],
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
        className={'bg-red-500 hover:bg-red-600 p-1.5 text-white rounded'}
        onClick={() => setOpen(!open)}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'rounded min-w-4xl'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-2xl text-red-500'}>Hapus Pejabat</p>}
        description={'Apakah anda yakin untuk menghapus pejabat yang dipilih?'}
      >
        <div className="flex items-start gap-x-5">
          <img
            src={data?.gambar}
            alt={data?.nama_lengkap}
            className={'w-[10rem] h-[200px] object-cover rounded'}
          />
          <div className={'grid grid-cols-[15rem_1fr] gap-5'}>
            <p className={'text-gray-500'}>Nama</p>
            <p>{data?.nama_lengkap}</p>
            <p className={'text-gray-500'}>Jabatan</p>
            <p>{data?.jabatan}</p>
            <p className={'text-gray-500'}>NIP</p>
            <p>{data?.nip}</p>
            <p className={'text-gray-500'}>Pangkat/Gol. Ruang</p>
            <p>{data?.nama_golongan}</p>
            <p className={'text-gray-500'}>Pangkat Akademik</p>
            <p>{data?.nama_akademik}</p>
            <p className={'text-gray-500'}>No. HP</p>
            <p>{data?.no_hp}</p>
            <p className={'text-gray-500'}>Email</p>
            <p>{data?.email}</p>
            <p className={'text-gray-500'}>Urutan</p>
            <p>{data?.urutan}</p>

            <Form {...form}>
              <form className="my-2 col-span-2">
                <TextInput
                  form={form}
                  name={'validator'}
                  label={
                    <p className={'text-red-500'}>
                      To confirm, type <b>“DELETE”</b>
                    </p>
                  }
                />
              </form>
            </Form>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant={'outline'}
            className={'border border-primary text-primary hover:text-primary'}
            onClick={() => setOpen(!open)}
          >
            <BiX />
            Batal
          </Button>
          <Button
            variant={'destructive'}
            disabled={form.watch('validator') !== 'DELETE' || loading}
            onClick={HandleSave}
          >
            <FaTrash />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}
