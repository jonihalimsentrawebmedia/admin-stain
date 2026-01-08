import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Button } from '@/components/ui/button.tsx'
import { IoMdImage } from 'react-icons/io'
import { FaListUl } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { ButtonAddFAQProdi } from '@/pages/modules/website-prodi/question/FAQ/components/buttonAdd.tsx'
import { UseGetListFAQProdi } from '@/pages/modules/website-prodi/question/FAQ/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsFAQProdi } from '@/pages/modules/website-prodi/question/FAQ/data/columns.tsx'

export const QuestionFAQProdiPage = () => {
  const navigate = useNavigate()
  const { listFaq, loading, metta } = UseGetListFAQProdi()
  const columns = ColumnsFAQProdi()

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
                    onClick={() => navigate('category')}
                    variant={'outline'}
                    className={'border border-primary text-primary hover:text-primary'}
                  >
                    <FaListUl />
                    Kategori F.A.Q
                  </Button>
                  <ButtonAddFAQProdi />
                </div>
              ),
            },
          ]}
        />

        <TableCustom data={listFaq} loading={loading} meta={metta} columns={columns} />
      </div>
    </>
  )
}
