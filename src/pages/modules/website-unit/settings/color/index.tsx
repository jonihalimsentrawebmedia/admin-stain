import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import TextInput from '@/components/common/form/TextInput.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetUnitPrimary } from './hooks/index'
import { useQueryClient } from '@tanstack/react-query'
import { Input } from '@/components/ui/input.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

interface IColorForm {
  warna_admin: string
}

export const PrimaryAndFooterColorUnit = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IColorForm>()
  const { colorPrimary } = UseGetUnitPrimary()

  useEffect(() => {
    if (colorPrimary) {
      form.reset({
        warna_admin: colorPrimary?.warna_admin,
      })
    }
  }, [colorPrimary])

  const queryClient = useQueryClient()

  const HandleSave = async (e: IColorForm) => {
    await AxiosClient.post('/unit/pengaturan-warna-halaman', e)
      .then((res) => {
        if (res.data.status) {
          setIsEdit(false)
          setLoading(false)
          toast.success(
            res.data.message || 'Success Pengajuan tambah data pengaturan warna halaman'
          )
          queryClient.invalidateQueries({
            queryKey: ['unit-primary'],
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
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide="Pengaturan Warna Halaman"
                      valueGuide="PERPUSTAKAAN_PENGATURAN_WARNA_HALAMAN"
                    />
                  ),
                },
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
                value={colorPrimary?.warna_admin ?? ''}
                readOnly
                className={'w-[50px]'}
              />
              <p>{colorPrimary?.warna_admin}</p>
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
                      type: 'custom',
                      element: (
                        <ButtonGoToGuide
                          titleGuide="Pengaturan Warna Halaman"
                          valueGuide="PERPUSTAKAAN_PENGATURAN_WARNA_HALAMAN"
                        />
                      ),
                    },
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
