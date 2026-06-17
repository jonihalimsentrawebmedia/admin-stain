import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import {
  QuestionItem,
  type TQuestionItem,
} from '@/pages/modules/E-Office/questionnaire/quantitative/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from '@/components/common/form/TextInput.tsx'
import { BiX } from 'react-icons/bi'
import { FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface props {
  HandleAddQuestion: (e: TQuestionItem) => void
}

const ButtonAddQuestion = (props: props) => {
  const { HandleAddQuestion } = props

  const form = useForm<TQuestionItem>({
    resolver: zodResolver(QuestionItem),
  })
  const [open, setOpen] = useState(false)

  const HandleSave = (value: TQuestionItem) => {
    HandleAddQuestion(value)
    form.reset()
    toast.success('Pertanyaan Berhasil Ditambahkan')
    setOpen(false)
  }

  return (
    <>
      <Button
        className={'text-white'}
        onClick={(e) => {
          e.preventDefault()
          setOpen(!open)
        }}
      >
        <FaCirclePlus />
        Tambah Pertanyaan
      </Button>

      <DialogBasic
        title={'Tambah Pertanyaan'}
        open={open}
        setOpen={setOpen}
        className={'min-w-2xl rounded'}
      >
        <Form {...form}>
          <form className={'flex flex-col gap-3'}>
            <TextInput
              name={'pertanyaan'}
              form={form}
              label={'Pertanyaan'}
              htmlFor={'Pertanyaan'}
              placeholder={'Pertanyaan'}
              isRequired
            />

            <p className={'text-primary'}>Daftar Opsi</p>
            {Array.from({ length: 5 }).map((_, index) => (
              <TextInput
                key={index}
                form={form}
                name={`opsi.${index}`}
                label={`Opsi ${index + 1}`}
                placeholder={`Tulskan Opsi ${index + 1}`}
                htmlFor={`opsi.${index}`}
                isRequired
                isRow
              />
            ))}
            <div className="flex gap-1.5 items-center justify-end">
              <Button
                variant={'outline'}
                className={'border-primary text-primary hover:text-primary'}
                onClick={(e) => {
                  e.preventDefault()
                  setOpen(!open)
                }}
              >
                <BiX className={'size-4'} />
                Batal
              </Button>
              <Button type="button" onClick={form.handleSubmit(HandleSave)}>
                <FaSave />
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default ButtonAddQuestion
