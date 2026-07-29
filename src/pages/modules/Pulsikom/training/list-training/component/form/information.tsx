import { Controller, useForm } from 'react-hook-form'
import {
  ResolverInformationTraining,
  type TResolverInformationTraining,
} from '@/pages/modules/Pulsikom/training/list-training/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { UploadPhotoImage } from '@/pages/modules/pusat-karir/component/common/uploadPhoto.tsx'
import { RichText } from '@/components/common/richtext'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Label } from '@/components/ui/label.tsx'
import { UseGetDetailInformation } from '../../hooks/index'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { ChevronRight } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { format } from 'date-fns'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

interface IProps {
  next_value: string
  status?: 'DRAFT' | 'DITERBITKAN' | 'DITUTUP'
  title?: string
}

const FormInformation = (props: IProps) => {
  const { next_value, status, title } = props
  const [_, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const form = useForm<TResolverInformationTraining>({
    resolver: zodResolver(ResolverInformationTraining),
    defaultValues: {
      is_tidak_ada_batas: false,
    },
  })
  const uuid = uuidv4()

  const id = localStorage.getItem('id_training')
  const { detail } = UseGetDetailInformation(id)

  useEffect(() => {
    if (detail) {
      form.reset({
        nama_training: detail?.nama_training,
        deskripsi: detail?.deskripsi,
        minimal_pendaftar: detail?.minimal_pendaftar,
        maksimal_pendaftar: detail?.maksimal_pendaftar,
        is_tidak_ada_batas: detail?.is_tidak_ada_batas,
        url_gambar: detail?.url_gambar ?? '',
        tgl_buka_pendaftaran: detail?.tgl_buka_pendaftaran
          ? format(detail?.tgl_buka_pendaftaran, 'yyyy-MM-dd')
          : '',
        tgl_tutup_pendaftaran: detail?.tgl_tutup_pendaftaran
          ? format(detail?.tgl_tutup_pendaftaran, 'yyyy-MM-dd')
          : '',
      })
    }
  }, [detail])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverInformationTraining | any) => {
    setLoading(true)
    const myUUid = id ?? uuid
    await AxiosClient.post(`/pusilkom/training/${myUUid}/informasi`, {
      ...value,
      tgl_buka_pendaftaran: value?.tgl_buka_pendaftaran
        ? new Date(value?.tgl_buka_pendaftaran).toISOString()
        : null,
      tgl_tutup_pendaftaran: value?.tgl_tutup_pendaftaran
        ? new Date(value?.tgl_tutup_pendaftaran).toISOString()
        : null,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          window.localStorage.setItem('id_training', res.data.data.id_training)
          form.reset()
          toast.success(res.data.message || 'Success')
          queryClient.invalidateQueries({
            queryKey: ['status-training'],
          })
          if (value.draft) {
            navigate('/modules/pulsikom/training/list-training')
          } else {
            const Params = new URLSearchParams()
            Params.append('step', next_value)
            setSearchParams(Params)
          }
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <Form {...form}>
        <form
          className={'flex flex-col gap-4 w-full mt-0 lg:mt-[55px]'}
          onSubmit={form.handleSubmit(HandleSave)}
        >
          <div className="static lg:absolute w-full top-0 left-0 py-2 z-20">
            <ButtonTitleGroup
              label={title ?? ''}
              buttonGroup={[
                {
                  type: 'custom',
                  element: (
                    <ButtonGoToGuide
                      titleGuide={`1. Informasi Training`}
                      valueGuide="PUSILKOM_TRAINING_DAFTAR_TRAINING_FORM_INFORMASI"
                    />
                  ),
                },
                {
                  type: 'cancel',
                  label: 'Batal',
                  onClick: () => navigate('/modules/pulsikom/training/list-training'),
                },
                {
                  type: 'custom',
                  element: (
                    <Button disabled={loading} className={'text-white'}>
                      Lanjutkan <ChevronRight className={'size-4'} />
                    </Button>
                  ),
                },
              ]}
            />
          </div>
          <p className="text-lg font-semibold text-primary">1. Informasi Training</p>

          <UploadPhotoImage
            form={form}
            label={'Upload Gambar'}
            name={'url_gambar'}
            ratio_width={4}
            ratio_height={3}
            className={'w-full sm:w-[320px]'}
          />
          <TextInput
            name={'nama_training'}
            form={form}
            label={'Nama Training'}
            placeholder={'Nama Training'}
            isRequired
          />

          <RichText form={form} name={'deskripsi'} label={'Deskripsi'} isRow={false} required />

          <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
            <TextInput
              name={'minimal_pendaftar'}
              form={form}
              label={'Minimal Pendaftar'}
              placeholder={'Minimal Pendaftar'}
              className={'w-full'}
              type={'number'}
              isNumber
              isRequired
            />

            <div className={'w-full'}>
              <TextInput
                name={'maksimal_pendaftar'}
                form={form}
                label={'Maksimal Pendaftar'}
                placeholder={'Maksimal Pendaftar'}
                className={'w-full'}
                type={'number'}
                isDisabled={form.watch('is_tidak_ada_batas') === true}
                isNumber
                isRequired
              />

              <Controller
                control={form.control}
                name="is_tidak_ada_batas"
                render={({ field }) => (
                  <Label htmlFor="infinite" className="mt-1 flex items-center gap-1.5">
                    <input
                      type="checkbox"
                      id="infinite"
                      checked={field.value ?? false}
                      onChange={(e) => {
                        field.onChange(e.target.checked)
                        form.setValue('maksimal_pendaftar', null)
                      }}
                    />
                    Tidak ada batas
                  </Label>
                )}
              />
            </div>
          </div>

          {status === 'DITERBITKAN' && (
            <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
              <TextInput
                name={'tgl_buka_pendaftaran'}
                form={form}
                label={'Tanggal Buka Pendaftaran'}
                className={'w-full'}
                type={'date'}
                isRequired
              />
              <TextInput
                name={'tgl_tutup_pendaftaran'}
                form={form}
                label={'Tanggal Tutup Pendaftaran'}
                className={'w-full'}
                type={'date'}
                isRequired
              />
            </div>
          )}

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              {
                type: 'cancel',
                label: 'Batal',
                onClick: () => navigate('/modules/pulsikom/training/list-training'),
              },
              {
                type: 'custom',
                element: (
                  <Button disabled={loading} className={'text-white'}>
                    Lanjutkan <ChevronRight className={'size-4'} />
                  </Button>
                ),
              },
            ]}
          />
        </form>
      </Form>
    </>
  )
}

export default FormInformation
