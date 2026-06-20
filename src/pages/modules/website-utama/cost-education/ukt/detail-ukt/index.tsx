import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetUktByEntranceProdi } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { AddUktEntrance } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/component/addUktEntrance.tsx'
import { ButtonPublish } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/component/buttonPublish.tsx'
import { ButtonDeleteUTKEntrance } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/component/buttonDelete.tsx'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'
import { ProdiUktColumns } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/data/columns.tsx'

export const DetailUktByEntrance = () => {
  const { id_prodi } = useParams()
  const { listPriceUkt } = UseGetUktByEntranceProdi(id_prodi as string)
  const navigate = useNavigate()

  const temp_id_jalur_masuk = listPriceUkt?.data?.map((row) => row?.id_jalur_masuk)
  console.log(listPriceUkt)

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={'Lihat UKT'}
          link={'/modules/website-utama/biaya-pendidikan/ukt'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <AddUktEntrance list_id={temp_id_jalur_masuk} id_prodi={listPriceUkt?.id_prodi} />
              ),
            },
          ]}
        />
        {listPriceUkt?.data ? (
          <>
            {listPriceUkt?.data?.map((row, k) => (
              <div key={k}>
                <div className={'flex items-center justify-between gap-4'}>
                  <div className={'w-full'}>
                    <p className="text-gray-500">Nama Prodi</p>
                    <ButtonTitleGroup
                      rootButtonClassName={'text-primary!'}
                      label={`${listPriceUkt?.nama_prodi} - ${row?.nama_jalur_masuk}`}
                      buttonGroup={[
                        {
                          type: 'custom',
                          element: (
                            <ButtonPublish
                              nama_fakultas={listPriceUkt?.nama_fakultas}
                              data={row}
                              nama_prodi={listPriceUkt?.nama_prodi}
                            />
                          ),
                        },
                        {
                          type: 'edit',
                          label: 'Edit',
                          onClick: () => {
                            navigate(`entrance/${row?.id_ukt_jalur_masuk}`)
                          },
                        },
                        {
                          type: 'custom',
                          element: (
                            <ButtonDeleteUTKEntrance
                              data={row}
                              nama_prodi={listPriceUkt?.nama_prodi}
                              nama_fakultas={listPriceUkt?.nama_fakultas}
                            />
                          ),
                        },
                      ]}
                    />
                  </div>
                  <div></div>
                </div>
                <TableBasic
                  columns={ProdiUktColumns}
                  data={row?.biaya_tingkatan ?? []}
                  className={'mt-5'}
                />
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-500">Belum ada Jalur Masuk</p>
        )}
      </div>
    </>
  )
}
