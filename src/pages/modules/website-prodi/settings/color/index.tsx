import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetProdiPrimary } from './hooks/index'
import { useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input.tsx'

export const PrimaryAndFooterColorProdi = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm()
  const { colorPrimary } = UseGetProdiPrimary()

  useEffect(() => {
    if (colorPrimary) {
      form.reset({
        warna_admin: colorPrimary?.warna_admin,
        warna_halaman_utama: colorPrimary?.warna_halaman_utama,
        warna_background_footer: colorPrimary?.warna_background_footer,
      })
    }
  }, [colorPrimary])

  const queryClient = useQueryClient()

  const HandleSave = async (e: any) => {
    await AxiosClient.post('/prodi/pengaturan-warna-halaman', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          setLoading(false)
          toast.success(
            res.data.message || 'Success Pengajuan tambah data pengaturan warna halaman'
          )
          queryClient.invalidateQueries({
            queryKey: ['prodi-primary'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <div className={'flex flex-col gap-4'}>
        {!isEdit ? (
          <>
            <ButtonTitleGroup
              label={'Pengaturan Warna Halaman'}
              buttonGroup={[
                {
                  type: 'edit',
                  label: 'Edit Warna',
                  onClick: () => {
                    setIsEdit(!isEdit)
                  },
                },
              ]}
            />

            <p className="text-gray-500">Warna Admin</p>
            <div className="flex items-center gap-2.5">
              <Input
                type={'color'}
                value={colorPrimary?.warna_admin}
                readOnly
                className={'w-[50px]'}
              />
              <p>{colorPrimary?.warna_admin}</p>
            </div>
            <p className="text-gray-500">Warna Halaman Utama</p>
            <div className="flex items-center gap-2.5">
              <Input
                type={'color'}
                value={colorPrimary?.warna_halaman_utama}
                readOnly
                className={'w-[50px]'}
              />
              <p>{colorPrimary?.warna_halaman_utama}</p>
            </div>

            <p className="text-gray-500">Warna background Footer</p>
            <div className="flex items-center gap-2.5">
              <Input
                type={'color'}
                value={colorPrimary?.warna_background_footer}
                readOnly
                className={'w-[50px]'}
              />
              <p>{colorPrimary?.warna_background_footer}</p>
            </div>
          </>
        ) : (
          <>
            <Form {...form}>
              <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
                <ButtonTitleGroup
                  label={'Pengaturan Warna Halaman'}
                  buttonGroup={[
                    {
                      type: 'cancel',
                      label: 'Batal',
                      onClick: () => {
                        setIsEdit(!isEdit)
                      },
                    },
                    {
                      type: 'save',
                      label: 'Simpan',
                      isDisabled: loading,
                    },
                  ]}
                />

                <div className="flex items-center gap-1.5">
                  <TextInput
                    name={'warna_admin'}
                    form={form}
                    label={'Warna Admin'}
                    type={'color'}
                    inputClassName={'w-[50px]'}
                    isRow
                  />
                  {form.watch('warna_admin')}
                </div>

                <div className="flex items-center gap-1.5">
                  <TextInput
                    name={'warna_halaman_utama'}
                    form={form}
                    label={'Warna Halaman Utama'}
                    type={'color'}
                    inputClassName={'w-[50px]'}
                    isRow
                  />
                  {form.watch('warna_halaman_utama')}
                </div>

                <div className="flex items-center gap-1.5">
                  <TextInput
                    name={'warna_background_footer'}
                    form={form}
                    label={'Warna Background Footer'}
                    type={'color'}
                    inputClassName={'w-[50px]'}
                    isRow
                  />
                  {form.watch('warna_background_footer')}
                </div>

                <ButtonTitleGroup
                  label={''}
                  buttonGroup={[
                    {
                      type: 'cancel',
                      label: 'Batal',
                      onClick: () => {
                        setIsEdit(!isEdit)
                      },
                    },
                    {
                      type: 'save',
                      label: 'Simpan',
                      isDisabled: loading,
                    },
                  ]}
                />
              </form>
            </Form>
          </>
        )}
      </div>
    </>
  )
}
