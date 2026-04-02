import { UseGetRegisterPricingProgram } from '../../hooks/index.tsx'
import { ButtonAddRegisterPricing } from './buttonAdd.tsx'
import { ButtonEditRegisterPricing } from './buttonEdit.tsx'
import { ButtonDeleteRegisterPricing } from './buttonDelete.tsx'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

interface Props {
  prev_value: string
  next_value: string
}

export const RegisterPricing = (props: Props) => {
  const { prev_value, next_value } = props

  const id = window.localStorage.getItem('id_program')
  const { registerPricing } = UseGetRegisterPricingProgram(id as string)

  const [_, setSearchParams] = useSearchParams()

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
      <div className={'space-y-5'}>
        <p className="text-xl font-semibold">4. Biaya Pendaftaran</p>
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
              },
              {
                type: 'custom',
                element: (
                  <Button onClick={HandleNext}>
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
