import { useEffect, useState } from 'react'
import { FaGear } from 'react-icons/fa6'
import { Button } from '@/components/ui/button.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ISessionProdi } from '@/pages/modules/website-prodi/hooks'
import { UseGetUniversityDomainExist } from '@/pages/modules/website-utama/select-university/hooks'

export const ButtonSessionProdi = ({ session }: { session?: ISessionProdi }) => {
  const [open, setOpen] = useState(false)
  const [parentId, setParentId] = useState({
    id_university: '',
    id_faculty: '',
  })

  const { satuanOrganisasi: university, loading: load1 } = UseGetUniversityDomainExist({
    kelompok: 'UNIVERSITAS',
  })
  const { satuanOrganisasi: faculty, loading: load2 } = UseGetUniversityDomainExist({
    kelompok: 'FAKULTAS',
    id_parent: parentId?.id_university,
  })
  const { satuanOrganisasi: prodi, loading: load3 } = UseGetUniversityDomainExist({
    kelompok: 'PRODI',
    id_parent: parentId?.id_faculty,
  })

  const loading = load1 || load2 || load3

  const form = useForm()

  useEffect(() => {
    if (session) {
      form.setValue('id_university', session?.id_universitas)
      form.setValue('id_faculty', session?.id_fakultas)
      form.setValue('id_prodi', session?.id_prodi)
      setParentId({
        id_university: session?.id_universitas,
        id_faculty: session?.id_fakultas,
      })
    }
  }, [session])

  const HandlerSubmit = async (e: any) => {
    await AxiosClient.post('/prodi/user-session', {
      id_universitas: e?.id_university,
      id_fakultas: e?.id_faculty,
      id_prodi: e?.id_prodi,
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
            <form onSubmit={form.handleSubmit(HandlerSubmit)} className={'flex flex-col gap-2'}>
              <SelectBasicInput
                form={form}
                name={'id_university'}
                isDisabled={loading}
                placeholder={'Pilih Universitas digunakan'}
                selectClassName={'z-40'}
                data={
                  university?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
                fx={() => {
                  setParentId({
                    id_university: form.watch('id_university'),
                    id_faculty: '',
                  })

                  form.setValue('id_faculty', '')
                  form.setValue('id_prodi', '')
                }}
              />

              <SelectBasicInput
                form={form}
                name={'id_faculty'}
                isDisabled={loading}
                placeholder={'Pilih Fakultas'}
                selectClassName={'z-30'}
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
                isDisabled={loading}
                placeholder={'Pilih Program Studi'}
                selectClassName={'z-20'}
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
      </DialogBasic>
    </>
  )
}
