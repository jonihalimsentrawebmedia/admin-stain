import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MdPrint } from 'react-icons/md'
import { BiPlus } from 'react-icons/bi'
import { UseGetGuestBooks } from '@/pages/modules/E-Office/gustbook/hooks'
import { ColumnsGuestBooks } from '@/pages/modules/E-Office/gustbook/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const GustBookList = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const columns = ColumnsGuestBooks()
  const navigate = useNavigate()
  const { loading, guestBook, meta } = UseGetGuestBooks({
    limit,
    page,
    search,
  })

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Daftar Buku Tamu'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button className={'border border-primary rounded-full'} variant={'outline'}>
                  <MdPrint />
                  Cetak Buku Tamu
                </Button>
              ),
            },
            {
              type: 'custom',
              element: (
                <Button onClick={() => navigate('add')} className={'rounded-full text-white'}>
                  <BiPlus />
                  Tambah Buku Tamu
                </Button>
              ),
            },
          ]}
        />

        <TableCustom data={guestBook} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}

export default GustBookList
