import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils.ts'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import type { ILetterOrigin } from '@/pages/modules/E-Office/reference/letter-origin/data/types.ts'
import { Button } from '@/components/ui/button.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import TextAreaInput from '@/components/common/form/textAreaInput.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

interface props {
  letterOrigin?: ILetterOrigin[]
  HandlerSave?: (value: any) => void
  value?: string
}

const DialogSender = (props: props) => {
  const { letterOrigin, HandlerSave, value } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const form = useForm()

  useEffect(() => {
    if (value) {
      form.setValue('id_asal_surat', value)
    }
  }, [value])

  const queryClient = useQueryClient()
  const HandleSubmit = async (value: any) => {
    setLoading(true)
    if (isAdded) {
      await AxiosClient.post('/eoffice/asal-surat', value)
        .then((res) => {
          if (res.data.status) {
            queryClient.invalidateQueries({
              queryKey: ['letter-origin'],
            })
            form.reset()
            setLoading(false)
            setIsAdded(false)
            toast.success(res.data.message || 'Success')
          }
        })
        .catch((err) => {
          setLoading(false)
          toast.error(err.response.data.message || 'Error')
        })
    } else {
      HandlerSave && HandlerSave(value?.id_asal_surat)
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <div className="flex flex-col w-full gap-1.5 col-span-2">
        <p className="text-gray-500">Pengirim / Asal Surat *</p>
        <div
          onClick={() => setOpen(!open)}
          className={cn(
            'w-full border p-1.5 cursor-pointer rounded',
            'flex items-center gap-2 justify-between'
          )}
        >
          <p className={'text-gray-500'}>
            {value
              ? letterOrigin?.find((row) => row.id_asal_surat === value)?.instansi
              : 'Pilih Pengirim / Asal Surat'}
          </p>
          <Search className={'size-4'} />
        </div>
      </div>

      <DialogBasic
        title={'Pilih Pengirim'}
        disableOutsideDialog={true}
        open={open}
        setOpen={setOpen}
      >
        <Button
          onClick={(e) => {
            e.preventDefault()
            setIsAdded(!isAdded)
          }}
        >
          Tambah Pengirim
        </Button>
        <Form {...form}>
          <form className={'flex flex-col gap-4'}>
            {isAdded ? (
              <>
                <TextInput
                  name={'instansi'}
                  form={form}
                  label={'Instansi'}
                  placeholder={'instansi'}
                  htmlFor={'instansi'}
                  isRequired
                />

                <TextAreaInput
                  name={'alamat'}
                  form={form}
                  label={'Alamat'}
                  placeholder={'Alamat'}
                  htmlFor={'nama'}
                  isRequired
                />

                <TextInput
                  name={'telepon'}
                  form={form}
                  label={'Telepon (Opsional)'}
                  placeholder={'Telepon'}
                  htmlFor={'Telepon'}
                  type={'number'}
                />

                <TextInput
                  name={'email'}
                  form={form}
                  label={'Email (Opsional)'}
                  placeholder={'Email'}
                  htmlFor={'email'}
                  type={'email'}
                />
              </>
            ) : (
              <SelectBasicInput
                form={form}
                label={'Pengirim / Asal Surat'}
                placeholder={'Pengirim / Asal surat'}
                name={'id_asal_surat'}
                isRequired
                usePortal
                className={'col-span-2'}
                data={
                  letterOrigin?.map((row) => ({
                    label: row?.instansi,
                    value: row?.id_asal_surat,
                  })) ?? []
                }
              />
            )}

            <ButtonTitleGroup
              label={''}
              buttonGroup={[
                {
                  type: 'cancel',
                  label: 'Batal',
                  onClick: () => setOpen(!open),
                },
                {
                  type: 'custom',
                  element: (
                    <Button
                      type="submit"
                      onClick={form.handleSubmit(HandleSubmit)}
                      disabled={loading}
                    >
                      Simpan
                    </Button>
                  ),
                },
              ]}
            />
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}

export default DialogSender
