import { Form } from '@/components/ui/form.tsx'
import type { UseFormReturn } from 'react-hook-form'
import type { IMessageResolver } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/data/resolver.tsx'
import { RichText } from '@/components/common/richtext'
import type { IMessage } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/data/types.tsx'
import { InputManyFile } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/components/inputManyFile.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiX } from 'react-icons/bi'
import type { Dispatch, SetStateAction } from 'react'
import { IoSendSharp } from 'react-icons/io5'

interface Props {
  form: UseFormReturn<IMessageResolver>
  HandleSave: (value: IMessageResolver) => void
  data?: IMessage
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  loading: boolean
}

export const FormsMessage = (props: Props) => {
  const { form, HandleSave, data, open, setOpen, loading } = props
  return (
    <Form {...form}>
      <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
        <div className="flex flex-col gap-1.5">
          <p className="text-gray-500">Pertayaan</p>
          <p className="text-lg">{data?.pesan}</p>
        </div>
        <div className="flex flex-col gap-1.5 text-sm">
          <p className="text-gray-500">Nama Pengirim</p>
          <p>{data?.nama}</p>
        </div>
        <div className="flex flex-col gap-1.5 text-sm">
          <p className="text-gray-500">Email</p>
          <p>{data?.email}</p>
        </div>

        <RichText
          form={form}
          name={'jawaban'}
          label={'Tulis balasan Anda.'}
          labelClassName={'text-primary font-semibold'}
          isRow={false}
          required
        />

        <InputManyFile form={form} name={'dokumens'} label={'Dokumen'} />

        <div className="flex items-center justify-end gap-2">
          <Button
            disabled={loading}
            variant={'outline'}
            className={'text-primary hover:text-primary border-primary'}
            onClick={(e) => {
              e.preventDefault()
              setOpen(!open)
            }}
          >
            <BiX />
            Batal
          </Button>

          <Button disabled={loading}>
            <IoSendSharp />
            Kirim
          </Button>
        </div>
      </form>
    </Form>
  )
}
