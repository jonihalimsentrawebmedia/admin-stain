import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { IoMdMail } from 'react-icons/io'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormsMessage } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/components/formsMessage.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { IMessage } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/data/types.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import {
  type IMessageResolver,
  MessageResolver,
} from '@/pages/modules/website-utama/pertayaan/kotak-masuk/data/resolver.tsx'
import { RiHistoryFill } from 'react-icons/ri'

interface Props {
  data: IMessage
}

export const ButtonReplyMessageProdi = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IMessageResolver>({
    resolver: zodResolver(MessageResolver),
  })

  const queryClient = useQueryClient()

  const status = data?.status === 'BELUM_TERJAWAB' ? 'kirim-jawaban' : 'kirim-ulang'

  const HandleReply = async (value: IMessageResolver) => {
    setLoading(true)
    await AxiosClient.post(`/prodi/pertanyaan/${data?.id_pertanyaan}/${status}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['inbox-message'],
          })
          toast.success(res.data.message || 'Success Kirim Jawaban')
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      {data?.status === 'BELUM_TERJAWAB' ? (
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => setOpen(!open)}
          disabled={loading}
        >
          <IoMdMail className={'size-4'} />
        </button>
      ) : (
        <>
          <button
            className="text-blue-500 p-2 hover:text-blue-600 rounded border border-blue-500"
            onClick={() => setOpen(!open)}
            disabled={loading}
          >
            <RiHistoryFill className={'size-4'} />
          </button>
        </>
      )}

      <DialogCustom
        disableOutsideDialog={true}
        className={'rounded lg:max-w-5xl'}
        open={open}
        setOpen={setOpen}
        title={'Kirim Jawaban'}
      >
        <div>
          <FormsMessage
            loading={loading}
            open={open}
            setOpen={setOpen}
            data={data}
            form={form}
            HandleSave={HandleReply}
          />
        </div>
      </DialogCustom>
    </>
  )
}
