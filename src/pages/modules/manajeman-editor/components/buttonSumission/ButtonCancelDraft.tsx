import { Button } from '@/components/ui/button'
import { X, XCircle } from 'lucide-react'
import { IconCancel } from '@/components/common/table/icon'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { Textarea } from '@/components/ui/textarea'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MdOutlineCancel } from 'react-icons/md'

interface Props {
  isIcon: boolean
  url: string
  queryKey: string
}
const ButtonCancelDraft = ({ isIcon, url, queryKey }: Props) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reason, setReason] = useState('')
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  async function handleCancel() {
    setLoading(true)
    try {
      const res = await AxiosClient.patch(url ?? '', {
        alasan_ditolak: reason,
        status_publish: 'TOLAK_EDITOR',
        type_pengajuan: searchParams.get('jenis_konten'),
      })

      if (res.data.status) {
        toast.success(res.data.message)
        navigate(-1)
        await queryClient.invalidateQueries({
          queryKey: [queryKey],
        })
        setOpen(false)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {isIcon ? (
        <button
          onClick={() => {
            setOpen(true)
          }}
        >
          <IconCancel />
        </button>
      ) : (
        <Button
          onClick={() => {
            setOpen(true)
          }}
          variant={'outline'}
          className="text-red-500 border border-red-500 hover:text-red-500"
        >
          <XCircle />
          Tolak
        </Button>
      )}
      <DialogCustom
        className="max-w-2xl! w-full! rounded-md"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Tolak Pengajuan Data</p>}
      >
        <p>Tulis alasan penolakan</p>
        <Textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value)
          }}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => {
              setOpen(false)
            }}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-500 hover:bg-red-500/90 text-white"
          >
            <MdOutlineCancel />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonCancelDraft
