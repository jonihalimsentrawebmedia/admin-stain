import { GoComment } from 'react-icons/go'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { IoSend } from 'react-icons/io5'
import { UseGetComment } from '@/pages/modules/E-Office/inbox/registration-inbox/detail/comment/hooks'
import { cn } from '@/lib/utils.ts'

interface props {
  id: string
}

export const ButtonComment = (props: props) => {
  const { id } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { comment } = UseGetComment(id ?? '')

  const form = useForm()

  const queryClient = useQueryClient()
  const HandleSave = async (value: any) => {
    setLoading(true)
    await AxiosClient.post(`/eoffice/surat-masuk/komentar/${id}`, {
      komentar: value.komentar,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['comment'],
          })
          form.reset({
            comment: '',
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className={
          'flex items-center gap-1.5 p-1.5 rounded-full border-primary text-primary border px-3'
        }
      >
        <GoComment />
        Komentar
      </button>

      <DialogBasic title={'Komentar'} open={open} setOpen={setOpen} disableOutsideDialog={true}>
        <div>
          {comment?.map((row, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-2 w-full',
                row?.posisi === 'kanan' && 'flex-row-reverse'
              )}
            >
              <img
                src={row?.gambar_penulis ?? '/img/noimg.png'}
                alt="gambar_penulis"
                className="w-10 h-10 rounded-full"
              />
              <div className={'w-full'}>
                <p className={'text-end'}>{row?.nama_penulis}</p>
                <div className={'w-full text-start bg-gray-100 p-4 rounded'}>
                  <p>{row?.komentar}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Form {...form}>
          <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
            <div className="flex items-center gap-1 w-full">
              <TextInput
                name={'komentar'}
                form={form}
                placeholder={'Tulis Pesan ada Disini'}
                className={'w-full'}
                label={''}
              />
              <button className={'p-1.5 bg-primary text-white mt-1.5'}>
                <IoSend />
              </button>
            </div>
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
