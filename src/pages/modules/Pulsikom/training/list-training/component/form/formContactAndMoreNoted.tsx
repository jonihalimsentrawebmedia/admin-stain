import { useForm, useWatch } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import { ContactMoreNoted, type TContactMoreNoted } from '../../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'
import CheckboxInputBasic from '@/components/common/form/checkbox.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { RichText } from '@/components/common/richtext'
import { UseGetDetailDataPulsikom } from '@/pages/modules/Pulsikom/data-pulsikom/hooks'
import { useEffect, useState } from 'react'
import ButtonForm from '@/components/common/button/ButtonForm.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { UseGetContactAndMoreNote } from '@/pages/modules/Pulsikom/training/list-training/hooks'

interface IProps {
  prev_value: string
}

export const FormContactAndMoreNoted = (props: IProps) => {
  const { prev_value } = props
  const [loading, setLoading] = useState(false)

  const id = window.localStorage.getItem('id_training')
  const { contact } = UseGetContactAndMoreNote(id)
  const navigate = useNavigate()
  const { carrierCenter } = UseGetDetailDataPulsikom({
    real_data: true,
  })
  const form = useForm<TContactMoreNoted>({
    resolver: zodResolver(ContactMoreNoted),
  })

  const contactUnit = useWatch({
    control: form.control,
    name: 'is_kontak_unit',
  })

  useEffect(() => {
    if (!contact) return

    form.reset({
      is_kontak_unit: contact.is_kontak_unit ?? false,
      no_telepon: contact.no_telepon ?? '',
      email: contact.email ?? '',
      alamat: contact.alamat ?? '',
      catatan_tambahan: contact.catatan_tambahan ?? '',
    })
  }, [contact])

  useEffect(() => {
    if (!contactUnit) return
    form.setValue('email', carrierCenter?.email ?? '')
    form.setValue('alamat', carrierCenter?.alamat ?? '')
    form.setValue('no_telepon', carrierCenter?.telepon ?? '')
  }, [contactUnit, carrierCenter, form])

  const HandleSave = async (value: TContactMoreNoted) => {
    setLoading(true)
    await AxiosClient.post(`/pusilkom/training/${id}/kontak-dan-catatan-tambahan`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success')
          navigate('/modules/pulsikom/training/list-training')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  const [_, setSearchParams] = useSearchParams()

  const HandlePrev = () => {
    const Params = new URLSearchParams()
    Params.append('step', prev_value)
    setSearchParams(Params)
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
          <p className="text-xl font-semibold text-primary">6. Kontak & Catatan Tambahan </p>
          <CheckboxInputBasic
            name={'is_kontak_unit'}
            form={form}
            label={'Gunakan kontak dan alamat Pusat Ilmu Komputer'}
          />

          <TextInput
            name={'no_telepon'}
            isDisabled={form.watch('is_kontak_unit') === true}
            form={form}
            label={'Nomor Telepon'}
            placeholder={'Nomor Telepon'}
            type={'number'}
            isRow
            isRequired
          />
          <TextInput
            name={'email'}
            isDisabled={form.watch('is_kontak_unit') === true}
            form={form}
            label={'Email'}
            placeholder={'Email'}
            type={'email'}
            isRow
            isRequired
          />
          <TextInput
            name={'alamat'}
            isDisabled={form.watch('is_kontak_unit') === true}
            form={form}
            label={'Alamat'}
            placeholder={'Alamat'}
            isRow
            isRequired
          />

          <RichText
            form={form}
            name={'catatan_tambahan'}
            label={'Catatan Tambahan'}
            isRow
            required
          />

          <div className="flex items-center justify-between">
            <Button
              variant={'outline'}
              className={'border-primary text-primary hover:text-primary'}
              onClick={(e) => {
                e.preventDefault()
                HandlePrev()
              }}
            >
              <ArrowLeft className={'size-4'} />
              Rekening Penerimaan
            </Button>
            <ButtonForm loading={loading} />
          </div>
        </form>
      </Form>
    </>
  )
}
