import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { FaListUl } from 'react-icons/fa'
import { UseGetListFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/hooks'
import { ColumnsFAQData } from '@/pages/modules/website-utama/pertayaan/Faq/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonAddFAQ } from '@/pages/modules/website-utama/pertayaan/Faq/components/buttonAdd.tsx'

export const FaqListData = () => {
  const navigate = useNavigate()
  const { listFaq, loading, metta } = UseGetListFAQ()
  const columns = ColumnsFAQData()

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          label={'F.A.Q'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <div className={'flex items-center gap-2'}>
                  <Button
                    onClick={() => navigate('background')}
                    variant={'outline'}
                    className={'border border-primary text-primary hover:text-primary'}
                  >
                    <IoMdImage />
                    Gambar Background
                  </Button>
                  <Button
                    onClick={() => navigate('kategori')}
                    variant={'outline'}
                    className={'border border-primary text-primary hover:text-primary'}
                  >
                    <FaListUl />
                    Kategori F.A.Q
                  </Button>
                  <ButtonAddFAQ />
                </div>
              ),
            },
          ]}
        />

        <TableCustom data={listFaq} columns={columns} meta={metta} loading={loading} />
      </div>
    </>
  )
}
