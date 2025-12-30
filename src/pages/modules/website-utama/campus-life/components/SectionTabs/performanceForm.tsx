import { useForm } from 'react-hook-form'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { InputRadio } from '@/components/common/form/InputRadio.tsx'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { AccordionCustom } from '@/components/common/accordion'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import type { ICampusLifeAchievements } from '@/pages/modules/website-utama/campus-life/types'
import { useQueryClient } from '@tanstack/react-query'

interface props {
  isEdit: boolean
  setIsEdit: Dispatch<SetStateAction<boolean>>
  data?: ICampusLifeAchievements
}

export const PerformanceForm = (props: props) => {
  const { isEdit, setIsEdit, data } = props

  const [loading, setLoading] = useState(false)
  const form = useForm()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      form.reset({
        is_warna_background: data?.is_warna_background,
        warna_background: data?.is_warna_background ? data?.warna_background : '',
        teks_pengantar: data?.teks_pengantar,
      })
    }
  }, [])

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/kehidupan-kampus-prestasi', e)
      .then((res) => {
        if (res?.data?.status) {
          setLoading(false)
          setIsEdit(!isEdit)
          queryClient.invalidateQueries({
            queryKey: ['campus-life-performance'],
          })
          toast.success(res?.data?.message || 'Data berhasil disimpan')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Prestasi'}
            buttonGroup={[
              {
                type: 'cancel',
                label: ': Batal Edit',
                onClick: () => {
                  setIsEdit(!isEdit)
                },
              },
              {
                isDisabled: loading,
                type: 'save',
                label: 'Simpan',
              },
            ]}
          />
          <AccordionCustom
            name={'performance'}
            title={'Isi'}
            contentClassName={'flex flex-col gap-5'}
          >
            <InputRadio
              form={form}
              isRow
              name={'is_warna_background'}
              label={'Isi Background'}
              data={[
                { label: 'Ya', value: true },
                { label: 'Tidak', value: false },
              ]}
            />
            {form.watch('is_warna_background') ? (
              <TextInput
                name={'warna_background'}
                form={form}
                label={'Warna Background'}
                placeholder={'Warna Background'}
                type={'color'}
                inputClassName={'w-[35px] p-1'}
                isRow
                isRequired
              />
            ) : (
              <div className={'grid grid-cols-[12rem_1fr] gap-5'}>
                <p>Isi Background</p>
                <p>Tidak Ada</p>
              </div>
            )}
            <RichText form={form} name={'teks_pengantar'} label={'Text Pengantar'} isRow required />
          </AccordionCustom>
        </form>
      </Form>
    </>
  )
}
