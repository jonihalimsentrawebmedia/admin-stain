import { UseGetRegisterPricing } from '@/pages/modules/Pulsikom/training/list-training/hooks'
import { ButtonAddRegisterPricing } from './buttonAdd.tsx'
import { ButtonEditRegisterPricing } from '@/pages/modules/Pulsikom/training/list-training/component/register-pricing/buttonEdit.tsx'
import { ButtonDeleteRegisterPricing } from '@/pages/modules/Pulsikom/training/list-training/component/register-pricing/buttonDelete.tsx'

export const RegisterPricing = () => {
  const id = window.localStorage.getItem('id_training')
  const { registerPricing } = UseGetRegisterPricing(id as string)

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
      </div>
    </>
  )
}
