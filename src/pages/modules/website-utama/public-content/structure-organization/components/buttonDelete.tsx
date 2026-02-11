import { FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import type { IGroupOrganization } from '../data/index'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

export const ButtonDeleteStructureOrganization = (data: IGroupOrganization) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/kelompok-organisasi/${data?.id_kelompok_organisasi}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-group-organization'],
          })
        }
        toast.success(res.data.message || 'Success menghapus data kelompok')
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
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        className={'rounded lg:max-w-2xl'}
        open={open}
        setOpen={setOpen}
        title={<p className={'text-red-500'}>Hapus Kelompok</p>}
        description={'Apakah anda yakin untuk menghapus kelompok ini?'}
      >
        <div className={'grid grid-cols-[15rem_1fr] gap-5'}>
          <p className="text-gray-500">Kelompok</p>
          <p>{data?.kelompok}</p>
          <p className="text-gray-500">Nama Kelompok</p>
          <p>{data?.nama_kelompok}</p>
          <p className="text-gray-500">Urutan</p>
          <p>{data?.urutan}</p>

          <Form {...form}>
            <form className={'col-span-2 my-2'}>
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

          <div className="col-span-2 flex items-center justify-end w-full gap-2">
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
              onClick={HandlerDelete}
              disabled={form.watch('validator') !== 'DELETE' || loading}
            >
              <FaTrash /> Hapus
            </Button>
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
