import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { IAnnouncement } from '@/pages/modules/website-utama/public-content/announcement/data'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'

export const ButtonDeleteAnnouncement = (data: IAnnouncement) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const queryClient = useQueryClient()

  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/lembaga/pengumuman/${data?.id_pengumuman}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Pengumuman')
          queryClient.invalidateQueries({
            queryKey: ['list-announcement-lembaga'],
          })
          queryClient.invalidateQueries({
            queryKey: ['status-announcement-lembaga'],
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
        onClick={() => setOpen(!open)}
        className={'bg-red-500 p-1.5 rounded text-white hover:bg-red-600'}
      >
        <FaTrash />
      </button>

      <DialogCustom
        open={open}
        isAuto
        className={'rounded lg:max-w-xl'}
        setOpen={setOpen}
        title={<p className={'text-red-500'}>Hapus Pengumuman?</p>}
        description={'Apakah anda yakin untuk menghapus Pengumuman yang ditulis?'}
      >
        <div className={'flex flex-col gap-2.5'}>
          <p className="text-gray-500">Judul</p>
          <p>{data?.judul_pengumuman}</p>
          <p className="text-gray-500">Penulis</p>
          <p>{data?.penulis}</p>

          <Form {...form}>
            <form>
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
                      disabled={form.watch('validator') !== 'DELETE' || loading}
                      variant={'destructive'}
                      onClick={HandlerDelete}
                    >
                      <FaTrash />
                      Hapus
                    </Button>
                  ),
                  onClick: () => setOpen(!open),
                },
              ]}
            />
          </div>
        </div>
      </DialogCustom>
    </>
  )
}
