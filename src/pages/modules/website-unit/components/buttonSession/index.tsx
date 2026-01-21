import { useEffect, useState } from 'react'
import { FaGear } from 'react-icons/fa6'
import { Button } from '@/components/ui/button.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'
import { UseGetGroupOrganizationFlexible } from '@/pages/modules/website-prodi/select-prodi/hooks'

export const ButtonSessionUnit = ({ session }: { session?: ISessionUnit }) => {
  const [open, setOpen] = useState(false)
  const [parentId, setParentId] = useState({
    id_university: '',
  })

  const { dataSatuan: university } = UseGetGroupOrganizationFlexible({ kelompok: 'UNIVERSITAS' })
  const { dataSatuan: unit } = UseGetGroupOrganizationFlexible({
    kelompok: 'UNIT',
    id_parent: parentId?.id_university,
  })

  const form = useForm()

  useEffect(() => {
    if (session) {
      form.setValue('id_university', session?.id_universitas)
      form.setValue('id_unit', session?.id_unit)
      setParentId({
        id_university: session?.id_universitas,
      })
    }
  }, [session])

  const HandlerSubmit = async (e: any) => {
    await AxiosClient.post('/unit/user-session', {
      id_universitas: e?.id_university,
      id_unit: e?.id_unit,
    })
      .then((res) => {
        toast.success(res.data.message)
        window.location.reload()
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'text-primary border-primary hover:text-primary'}
      >
        Session Prodi
        <FaGear />
      </Button>

      <DialogBasic
        className={'lg:max-w-2xl rounded'}
        open={open}
        disableOutsideDialog
        setOpen={setOpen}
        title={'Ganti Data: Universitas'}
      >
        <div>
          <Form {...form}>
            <form
              className={'flex flex-col gap-4 mt-2'}
              onSubmit={form.handleSubmit(HandlerSubmit)}
            >
              <SelectBasicInput
                form={form}
                name={'id_university'}
                placeholder={'Pilih Universitas digunakan'}
                selectClassName={'z-50'}
                data={
                  university?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
                fx={() => {
                  if (form.watch('id_university')) {
                    setParentId({
                      ...parentId,
                      id_university: form.watch('id_university'),
                    })
                  }
                  form.setValue('id_unit', '')
                }}
              />
              <SelectBasicInput
                form={form}
                name={'id_unit'}
                placeholder={'Pilih Unit'}
                selectClassName={'z-40'}
                data={
                  unit?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
              />
              <div className="flex justify-center">
                <Button>Lanjutkan</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogBasic>
    </>
  )
}
