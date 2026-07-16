import { useEffect, useState } from 'react'
import { UseGetUniversityDomainExist } from '@/pages/modules/website-utama/select-university/hooks'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { FaGear } from 'react-icons/fa6'
import { UseGetSessionSIMRS } from './get-session'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { SelectBasicInput } from '@/components/common/form/selectBasicInput.tsx'
import { Form } from '@/components/ui/form.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

export const DialogSessionSIMRS = () => {
  const [open, setOpen] = useState(false)

  const { satuanOrganisasi: university, loading: load1 } = UseGetUniversityDomainExist({
    kelompok: 'UNIVERSITAS',
  })
  const { session } = UseGetSessionSIMRS()

  useEffect(() => {
    if (session) {
      form.reset({
        id_satuan_organisasi: session?.id_satuan_organisasi,
      })
    }
  }, [session])

  const loading = load1
  const form = useForm()

  const HandleSaveSession = async (value: any) => {
    await AxiosClient.post('/simrs/user-session', {
      id_satuan_organisasi: value?.id_satuan_organisasi,
    })
      .then((res) => {
        if (res.data.status) {
          toast.success('Berhasil membuat session')
          window.location.reload()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal membuat session')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'border-primary text-primary hover:text-primary max-w-[120px] sm:max-w-none'}
        disabled={loading}
      >
        <FaGear className="shrink-0" />
        <span className="truncate hidden sm:inline">{session?.nama_satuan_organisasi}</span>
        <span className="truncate sm:hidden">Ganti</span>
      </Button>

      <DialogBasic title={'Ganti Session SIM-RS'} open={open} setOpen={setOpen}>
        <Form {...form}>
          <form
            className={'flex flex-col gap-4 mt-2'}
            onSubmit={form.handleSubmit(HandleSaveSession)}
          >
            <SelectBasicInput
              form={form}
              name={'id_satuan_organisasi'}
              isDisabled={loading}
              placeholder={'Pilih Universitas digunakan'}
              selectClassName={'z-50'}
              data={
                university?.map((row: SatuanOrganisasiList) => ({
                  label: row?.nama,
                  value: row?.id_satuan_organisasi,
                })) ?? []
              }
            />
            <div className="flex justify-center">
              <Button>Simpan</Button>
            </div>
          </form>
        </Form>
      </DialogBasic>
    </>
  )
}
