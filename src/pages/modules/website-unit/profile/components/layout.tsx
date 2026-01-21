import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { Separator } from '@/components/ui/separator.tsx'
import { Outlet } from 'react-router-dom'

export const LayoutProfileUnit = () => {
  const { session } = UseGetSessionUnit()
  return (
    <>
      <div className={'flex flex-col gap-4'}>
        <p className="text-2xl font-semibold text-primary">Profile Unit</p>
        <p className="text-sm text-gray-500">Nama Unit</p>
        <p className={'text-green-500 font-semibold text-2xl'}>{session?.nama_unit}</p>
        <p className="text-sm text-gray-500">Universitas Asal</p>
        <p>{session?.nama_universitas}</p>
        <Separator />

        <Outlet />
      </div>
    </>
  )
}
