import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import { MdFastForward, MdSend } from 'react-icons/md'
import { useNavigate, useSearchParams } from 'react-router-dom'
interface Props {
  link: string
  queryKey: string
  queryKeyStatus: string
}
export const ButtonSubmission = ({ link, queryKey, queryKeyStatus }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const HandlerDelete = async () => {
    setLoading(true)
    await AxiosClient.patch(link, {
      status_publish: 'PROSES_EDITOR',
      type_pengajuan: searchParams.get('jenis_konten'),
    })
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message)
          queryClient.invalidateQueries({
            queryKey: [queryKey],
          })
          queryClient.invalidateQueries({
            queryKey: [queryKeyStatus],
          })
          navigate(-1)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button className={'text-white bg-primary! hover:text-white'} onClick={() => setOpen(!open)}>
        <MdSend />
        Proses Editor
      </Button>

      <DialogCustom
        open={open}
        className={'rounded lg:max-w-2xl'}
        setOpen={setOpen}
        title={<p className={'text-2xl text-primary'}>Proses Editor</p>}
        description={'Apakah anda yakin untuk memproses konten profil  yang diajukan?'}
      >
        <div className="flex items-center justify-end gap-2">
          <Button
            variant={'outline'}
            onClick={() => setOpen(!open)}
            className={'border border-primary text-primary hover:text-primary'}
          >
            <BiX />
            Batal
          </Button>
          <Button disabled={loading} onClick={HandlerDelete} className={'bg-primary text-white'}>
            <MdFastForward />
            Proses Konten
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}
