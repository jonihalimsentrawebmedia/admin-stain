import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetInboxMessage } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsMessage } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/data/columns.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

export const InboxMessagePage = () => {
  const { meta, listMessage, loading } = UseGetInboxMessage()
  const columns = ColumnsMessage()
  const navigate = useNavigate()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'Kotak Masuk'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  onClick={() => navigate('background')}
                  variant={'outline'}
                  className={'border border-primary text-primary hover:text-primary'}
                >
                  <IoMdImage />
                  Gambar Background
                </Button>
              ),
            },
          ]}
        />

        <TableCustom
          addFilter={
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Tampilkan"
              name={'limit'}
              options={[
                { label: '10 Data', value: '10' },
                { label: '25 Data', value: '25' },
                { label: '50 Data', value: '50' },
                { label: '100 Data', value: '100' },
              ]}
            />
          }
          data={listMessage}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
