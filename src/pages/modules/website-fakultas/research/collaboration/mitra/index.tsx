import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddMitra } from '@/pages/modules/website-fakultas/research/collaboration/mitra/component/buttonAdd.tsx'
import { UseGetPartnerMitra } from '@/pages/modules/website-fakultas/research/collaboration/mitra/hooks'
import TablePaginate from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { ButtonEditMitra } from '@/pages/modules/website-fakultas/research/collaboration/mitra/component/buttonEdit.tsx'
import { ButtonDeletePartnerMitra } from '@/pages/modules/website-fakultas/research/collaboration/mitra/component/buttonDelete.tsx'

export const MitraOurPartners = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const { partnerMitra, meta, loading } = UseGetPartnerMitra({
    page: page,
    limit: limit,
  })

  if (loading) return <></>

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={'Bekerjasama Dengan Kami'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddMitra />,
            },
          ]}
        />

        <div className="grid grid-cols-4 gap-5">
          {partnerMitra.map((mitra, i) => (
            <div key={i} className={'flex flex-col gap-2'}>
              <div
                className={
                  'flex items-center justify-center bg-white border p-5 py-8 border-primary'
                }
              >
                <img
                  src={mitra?.url_gambar}
                  alt="asdas"
                  className={'h-[120px] object-contain w-auto mx-auto'}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <ButtonEditMitra data={mitra} />
                <ButtonDeletePartnerMitra data={mitra} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {meta && (
            <p>
              Menampilkan 1- {Number(limit) > meta?.total ? meta?.total : limit} dari {meta?.total}{' '}
              Data
            </p>
          )}
          <TablePaginate length={meta?.total ?? 0} meta={meta} />
        </div>
      </div>
    </>
  )
}
