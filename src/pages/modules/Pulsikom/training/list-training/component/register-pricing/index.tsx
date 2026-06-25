import { UseGetRegisterPricing } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import { ButtonAddRegisterPricing } from './buttonAdd.tsx'
import { ButtonEditRegisterPricing } from '@/pages/modules/Pulsikom/training/list-training/component/register-pricing/buttonEdit.tsx'
import { ButtonDeleteRegisterPricing } from '@/pages/modules/Pulsikom/training/list-training/component/register-pricing/buttonDelete.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide.tsx'

interface Props {
  prev_value: string
  next_value: string
  title?: string
}

export const RegisterPricing = (props: Props) => {
  const { prev_value, next_value, title } = props
  const id = window.localStorage.getItem('id_training')
  const { registerPricing } = UseGetRegisterPricing(id as string)
  const [_, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const HandlePrev = () => {
    const Params = new URLSearchParams()
    Params.append('step', prev_value)
    setSearchParams(Params)
  }

  const HandleNext = () => {
    if (prev_value) {
      const Params = new URLSearchParams()
      Params.append('step', next_value)
      setSearchParams(Params)
    }
  }

  return (
    <>
      <div className={'space-y-5 mt-[55px]'}>
        <div className="absolute w-full top-0 left-0 py-2 z-20">
          <ButtonTitleGroup
            label={title ?? ''}
            buttonGroup={[
              {
                type: 'custom',
                element: (
                  <ButtonGoToGuide
                    titleGuide={`4. Biaya Pendaftaran`}
                    valueGuide="PUSILKOM_TRAINING_DAFTAR_TRAINING_FORM_BIAYA_PENDAFTARAN"
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
                  <Button onClick={HandleNext} className={'text-white'}>
                    Lanjutkan <ChevronRight className={'size-4'} />
                  </Button>
                ),
              },
            ]}
          />
        </div>
        <p className="text-xl font-semibold text-primary">4. Biaya Pendaftaran</p>

        {registerPricing?.length === 0 ? (
          <p className={'text-red-500'}>Belum ada Biaya Pendaftaran</p>
        ) : (
          <>
            {registerPricing?.map((row, k) => (
              <div key={k} className={'flex flex-col gap-2 border p-4 border-primary rounded'}>
                <p className="text-primary text-sm">urutan {row?.urutan}</p>
                <p>{row?.nama_biaya}</p>
                <p className={'text-xl font-semibold text-primary'}>
                  {row?.harga
                    ? new Intl.NumberFormat('id-ID', {
                        currency: 'IDR',
                        style: 'currency',
                        maximumFractionDigits: 0,
                      }).format(row?.harga ?? 0)
                    : ''}
                </p>
                <p>{row?.keuntungan}</p>
                <div className="flex items-center gap-2">
                  <ButtonEditRegisterPricing data={row} />
                  <ButtonDeleteRegisterPricing data={row} />
                </div>
              </div>
            ))}
          </>
        )}
        <ButtonAddRegisterPricing />

        <div className="flex items-center justify-between">
          <Button
            variant={'outline'}
            className={'border-primary text-primary hover:text-primary'}
            onClick={HandlePrev}
          >
            <ArrowLeft className={'size-4'} />
            Persyaratan
          </Button>
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
                  <Button onClick={HandleNext} className={'text-white'}>
                    Lanjutkan <ChevronRight className={'size-4'} />
                  </Button>
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}
