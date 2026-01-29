import { useEffect, useState } from 'react'
import { FaGear } from 'react-icons/fa6'
import { Button } from '@/components/ui/button.tsx'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { SelectCustom } from '@/components/common/form/SelectCustom.tsx'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { UseGetSession } from '@/pages/modules/website-utama/session'
import { UseGetUniversityDomainExist } from '@/pages/modules/website-utama/select-university/hooks'

export const ButtonSession = () => {
  const [open, setOpen] = useState(false)

  const form = useForm()

  const { satuanOrganisasi } = UseGetUniversityDomainExist({ kelompok: 'UNIVERSITAS' })

  const { session } = UseGetSession()

  useEffect(() => {
    if (session) form.setValue('id_university', session?.id_satuan_organisasi)
  }, [session])

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
        {session?.singkatan}
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
            <form onSubmit={form.handleSubmit(HandlerSubmit)}>
              <SelectCustom
                form={form}
                name={'id_university'}
                placeholder={'Pilih Universitas digunakan'}
                data={
                  satuanOrganisasi?.map((row) => ({
                    label: row?.nama,
                    value: row?.id_satuan_organisasi,
                  })) ?? []
                }
                level1
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
