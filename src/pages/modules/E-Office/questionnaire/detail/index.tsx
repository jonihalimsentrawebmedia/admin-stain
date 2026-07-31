import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { useNavigate, useParams } from 'react-router-dom'
import {
  UseGetDetailQuestionnaire,
  UseGetSurveyResult,
} from '@/pages/modules/E-Office/questionnaire/hooks'
import { Card, CardContent } from '@/components/ui/card.tsx'
import {
  ColumnsResultQualitative,
  ColumnsResultQuantitative,
} from '@/pages/modules/E-Office/questionnaire/detail/culumns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const DetailQuestionnaire = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { questionnaire: detail } = UseGetDetailQuestionnaire(id as string)
  const { surveyResult: result } = UseGetSurveyResult(id as string)
  const type = detail?.jenis_survei === 'KUALITATIF' ? 'qualitative' : 'quantitative'
  const columns =
    detail?.jenis_survei === 'KUALITATIF' ? ColumnsResultQualitative() : ColumnsResultQuantitative()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          isBack
          label={`Detail Kuisioner ${detail?.jenis_survei === 'KUALITATIF' ? 'Kualitatif' : 'Kuantitatif'}`}
          buttonGroup={[
            { type: 'custom', element: <ButtonGoToGuide titleGuide={'Detail Kuisioner'} valueGuide="E_OFFICE_QUESTIONNAIRE" /> },
            {
              type: 'edit',
              label: 'Edit',
              onClick: () =>
                navigate(`/modules/e-office/guestbook/questionnaire/${type}/edit/${id}`),
            },
          ]}
        />

        <Card>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-primary font-semibold capitalize">
                {detail?.jenis_survei.toLowerCase()}
              </p>
              <p>Diisi {detail?.diisi} Kali</p>
            </div>
            <p className="text-2xl font-semibold">{detail?.judul}</p>
          </CardContent>
        </Card>

        <Card className={'mt-5'}>
          <CardContent className="space-y-4">
            <p className="text-2xl font-semibold">Daftar Pertayaan ({detail?.jumlah_pertanyaan})</p>
            <TableCustom
              isShowFilter={false}
              isShowPagination={false}
              data={result?.pertanyaan}
              columns={columns}
            />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default DetailQuestionnaire
