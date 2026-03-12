import { ButtonAddService } from '@/pages/modules/pusat-karir/service/main/component/buttonAdd.tsx'
import { UseGetMainService } from '@/pages/modules/pusat-karir/service/main/hooks'
import { clsx } from 'clsx'
import { ButtonEditService } from '@/pages/modules/pusat-karir/service/main/component/buttonEdit.tsx'
import { ButtonDeleteService } from '@/pages/modules/pusat-karir/service/main/component/buttonDelete.tsx'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'

export const MainService = () => {
  const { mainService } = UseGetMainService()
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup label={'Layanan Utama'} buttonGroup={[]} />
        <div
          className={
            'bg-blue-50 border-blue-500 p-2 text-sm text-blue-500 rounded-full flex items-center gap-2 w-fit border'
          }
        >
          <MdInfo className={'size-5'} />
          Layanan utama adalah layanan yang ditampilkan di beranda website. Maksimal 4 Layanan
        </div>

        <div className="grid-cols-4 grid gap-5">
          {mainService.map((item, index) => (
            <div key={index} className={'flex flex-col gap-4'}>
              <div className="flex p-5 text-center gap-1.5 flex-col items-center justify-center w-full h-[255px] rounded-md border">
                <img src={item.url_gambar} alt={'logo'} className={'size-10 object-cover'} />
                <p>{item?.nama_layanan}</p>
                <p className={'text-sm text-gray-500'}>{item?.uraian_singkat}</p>
              </div>
              <div className="w-fit mx-auto flex items-center gap-2">
                <ButtonEditService data={item} />
                <ButtonDeleteService data={item} />
              </div>
            </div>
          ))}
          {Array.from({ length: 4 - mainService.length }).map((_, index) => (
            <div className={'flex flex-col gap-4'} key={index}>
              <div
                className={clsx(
                  'w-full h-[255px] border bg-gray-100',
                  'flex items-center justify-center rounded-md'
                )}
              >
                Belum ada layanan
              </div>
              <div className="w-fit mx-auto">
                <ButtonAddService />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
