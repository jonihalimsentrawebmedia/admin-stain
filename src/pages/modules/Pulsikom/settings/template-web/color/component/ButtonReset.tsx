import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiX } from 'react-icons/bi'
import { FaCheckCircle } from 'react-icons/fa'
import { MdRestartAlt } from 'react-icons/md'
import { useQueryClient } from '@tanstack/react-query'

const ButtonReset = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()
  const HandleReset = async () => {
    setLoading(true)
    await AxiosClient.post(`/pusilkom/thema/${id}/color-reset`)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Reset Default Thema')
          queryClient.invalidateQueries({ queryKey: ['template-detail'] })
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
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
      >
        <MdRestartAlt />
        Reset Default
      </Button>

      <DialogBasic
        description={
          'Apakah Anda yakin ingin mengembalikan warna website ke warna default? Tampilan website akan langsung mengikuti warna template website yang dipilih.'
        }
        title={'Kembalikan ke Warna Default?'}
        open={open}
        setOpen={setOpen}
      >
        <div className="flex items-center justify-end gap-x-4">
          <Button
            variant={'outline'}
            className={'border-primary text-primary hover:text-primary'}
            disabled={loading}
          >
            <BiX />
            Batal
          </Button>
          <Button disabled={loading} onClick={HandleReset}>
            <FaCheckCircle />
            Ya, Saya Yakin
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonReset
