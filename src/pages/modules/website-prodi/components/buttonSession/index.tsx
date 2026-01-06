import { useState } from 'react'
import { FaGear } from 'react-icons/fa6'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetGroupOrganizationFlexible } from '@/pages/modules/website-prodi/select-prodi/hooks'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'

export const ButtonSessionProdi = () => {
  const [open, setOpen] = useState(false)
  const [parentId, setParentId] = useState({
    id_university: '',
    id_faculty: '',
  })

  const { dataSatuan: university } = UseGetGroupOrganizationFlexible({ kelompok: 'UNIVERSITAS' })
  const { dataSatuan: faculty } = UseGetGroupOrganizationFlexible({
    kelompok: 'FAKULTAS',
    id_parent: parentId?.id_university,
  })
  const { dataSatuan: prodi } = UseGetGroupOrganizationFlexible({
    kelompok: 'PRODI',
    id_parent: parentId?.id_faculty,
  })

  const form = useForm()

  const HandlerSubmit = async (e: any) => {
    await AxiosClient.post('/website-utama/user-session', {
      id_satuan_organisasi: e?.id_university,
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

      <DialogCustom
        className={'lg:max-w-2xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Ganti Data: Universitas'}
      >
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandlerSubmit)} className={'flex flex-col gap-2'}>
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
                  form.setValue('id_faculty', '')
                  form.setValue('id_prodi', '')
                }}
              />

              <SelectBasicInput
                form={form}
                name={'id_faculty'}
                placeholder={'Pilih Fakultas'}
                selectClassName={'z-40'}
                data={
                  faculty?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
                fx={() => {
                  if (form.watch('id_faculty')) {
                    setParentId({
                      ...parentId,
                      id_faculty: form.watch('id_faculty'),
                    })
                  }
                  form.setValue('id_prodi', '')
                }}
              />

              <SelectBasicInput
                form={form}
                name={'id_prodi'}
                selectClassName={'z-30'}
                placeholder={'Pilih Program Studi'}
                data={
                  prodi?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
              />

              <div className="mt-5 flex justify-center">
                <Button>Lanjutkan</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}
