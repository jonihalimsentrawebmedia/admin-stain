import { IoIosNotifications } from 'react-icons/io'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormsMessage } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/components/formsMessage.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import type { IMessage } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/data/types.tsx'
import {
  type IMessageResolver,
  MessageResolver,
} from '@/pages/modules/website-utama/pertayaan/kotak-masuk/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetNotificationUnit } from '@/pages/modules/LPPM/components/notification/hooks'

export const NotificationListUnit = () => {
  const { notification } = UseGetNotificationUnit()
  const count = notification?.length ?? 0

  const form = useForm<IMessageResolver>({
    resolver: zodResolver(MessageResolver),
  })

  const [data, setData] = useState<IMessage>()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleReply = async (value: IMessageResolver) => {
    setLoading(true)
    await AxiosClient.post(`/unit/pertanyaan/${data?.id_pertanyaan}/kirim-jawaban`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Kirim Jawaban')
          queryClient.invalidateQueries({
            queryKey: ['notification'],
          })
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative cursor-pointer">
            <IoIosNotifications className="size-7 text-primary" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                {count}
              </span>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-2 rounded shadow-lg border bg-white">
          <p className="text-sm font-semibold px-2 pb-2">Notifications</p>
          <div className="max-h-96 overflow-y-auto space-y-1">
            {notification?.map((row, k) => (
              <div
                key={k}
                onClick={() => {
                  setData({
                    id_pertanyaan: row?.id,
                    nama: row?.judul,
                    email: row?.email,
                    pesan: row?.content,
                    status: row?.status,
                  })
                  setOpen(true)
                }}
                className="
                p-3 rounded cursor-pointer
                hover:bg-muted transition-all
                border border-transparent hover:border-primary/20
              "
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-primary">{row?.judul}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{row?.content}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{row?.email}</p>
                  </div>

                  <span
                    className={`w-2 min-w-2 h-2 mt-1 rounded-full ${
                      row?.status === 'BELUM_TERJAWAB' ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                  />
                </div>
              </div>
            ))}

            {count === 0 && (
              <div className="text-center text-xs text-muted-foreground py-6">
                No notifications yet ✨
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

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
