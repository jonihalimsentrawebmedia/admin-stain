import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { UseGetFooter } from '@/pages/modules/website-utama/settings-menu/Footer/hooks'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { MdOutlineHistory } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const FooterContent = () => {
  const form = useForm()

  const [isEdit, setIsEdit] = useState(false)
  const { textFooter } = UseGetFooter()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  useEffect(() => {
    if (textFooter) {
      form.reset({
        text_footer: textFooter?.text_footer,
      })
    }
  }, [textFooter])

  const HandleSave = async (e: any) => {
    await AxiosClient.post('/website-utama/footer', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          queryClient.invalidateQueries({
            queryKey: ['footer'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data footer')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div>
        {!isEdit && (
          <ButtonTitleGroup
            label={'Footer'}
            buttonGroup={[
              { type: 'edit', label: 'Edit', onClick: () => setIsEdit(!isEdit) },
              {
                type: 'custom',
                element: (
                  <>
                    <Button
                      variant={'outline'}
                      onClick={() => navigate('log')}
                      className={'text-blue-500 hover:text-primary border-blue-500'}
                    >
                      <MdOutlineHistory />
                      Lihat Log
                    </Button>
                  </>
                ),
              },
            ]}
          />
        )}

        {isEdit ? (
          <div>
            <Form {...form}>
              <form className={'mt-5 flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
                <ButtonTitleGroup
                  label={'Footer'}
                  buttonGroup={[
                    { type: 'cancel', label: 'Cancel', onClick: () => setIsEdit(false) },
                    { type: 'save', label: 'Simpan' },
                  ]}
                />
                <TextInput
                  isRequired
                  isRow
                  name={'text_footer'}
                  form={form}
                  label={'Text Footer'}
                  placeholder={'Text Footer'}
                />

                <ButtonTitleGroup
                  label={''}
                  buttonGroup={[
                    { type: 'cancel', label: 'Cancel', onClick: () => setIsEdit(false) },
                    { type: 'save', label: 'Simpan' },
                  ]}
                />
              </form>
            </Form>
          </div>
        ) : (
          <div className={'grid grid-cols-[12rem_1fr] gap-5 mt-5'}>
            <p className="text-gray-500">Text Footer</p>
            <p>{textFooter?.text_footer}</p>
          </div>
        )}
      </div>
    </>
  )
}
