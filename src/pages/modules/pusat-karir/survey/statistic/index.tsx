import { UseGetSurveyResult } from '@/pages/modules/pusat-karir/survey/hooks'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { DropdownSurvey } from '@/pages/modules/pusat-karir/survey/component/dropdownMenu.tsx'
import { format } from 'date-fns'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { useState } from 'react'
import ScaleChart from '@/pages/modules/pusat-karir/survey/statistic/scaleChart.tsx'

export const ResultStatistic = () => {
  const { id } = useParams()
  const { surveyResult } = UseGetSurveyResult((id as string) ?? '')

  const [active, setActive] = useState(0)

  const PartActive = surveyResult?.bagian?.[active]

  return (
    <>
      <div className={'space-y-5 bg-white p-5'}>
        <ButtonTitleGroup
          isBack
          label={'Hasil Survei'}
          buttonGroup={[
            {
              type: 'custom',
              element: <DropdownSurvey data={surveyResult} />,
            },
          ]}
        />

        <div className="grid grid-cols-[12rem_1fr] gap-4">
          <p className="text-gray-500">Judul Survei</p>
          <p className={'text-xl font-semibold'}>{surveyResult?.judul}</p>
          <p className="text-gray-500">Periode</p>
          <p>
            {surveyResult?.tanggal_mulai ? format(surveyResult?.tanggal_mulai, 'dd-MM-yyyy') : ''}{' '}
            s.d{' '}
            {surveyResult?.tanggal_selesai
              ? format(surveyResult?.tanggal_selesai, 'dd-MM-yyyy')
              : ''}
          </p>
          <p className="text-gray-500">Kategori Responden</p>
          <p>{surveyResult?.kategori_responden?.map((row) => row)}</p>
          <p className="text-gray-500">Jumlah Responden</p>
          <p>{surveyResult?.jumlah_responden}</p>
        </div>

        <TitleLine title={'Lihat Hasil Survei'} />

        <p className="text-2xl font-semibold">{surveyResult?.judul}</p>
        <p>{surveyResult?.deskripsi}</p>

        <div className="grid grid-cols-[280px_1fr] gap-x-5">
          <div className="border p-4 border-primary rounded flex flex-col gap-2 bg-primary/10 h-fit">
            {surveyResult?.bagian?.map((row, k) => (
              <div
                onClick={() => setActive(k)}
                key={k}
                className="flex items-center gap-2 border p-1.5 border-primary text-primary rounded cursor-pointer"
              >
                <div className={'size-4 rounded-full bg-primary'} />
                <p>{row?.judul}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-2xl font-semibold">{PartActive?.judul}</p>
            {PartActive?.pertanyaan.map((row, k) => (
              <div key={k} className={'border p-2.5 rounded my-2'}>
                <p>{row?.pertanyaan}</p>
                <p className="text-sm text-blue-500">{row?.deskripsi}</p>
                {(row?.type === 'TEXT_PENDEK' ||
                  row?.type === 'TEXT_PANJANG' ||
                  row?.type === 'ANGKA') && (
                  <ul className={'flex flex-col gap-2 list-decimal pl-5'}>
                    {row?.hasil_jawaban?.jawaban?.map((item, l) => (
                      <li key={l}>{item}</li>
                    ))}
                  </ul>
                )}
                {(row?.type === 'PILIHAN_GANDA' ||
                  row?.type === 'KONTAK_CENTANG' ||
                  row?.type === 'DROPDOWN' ||
                  row?.type === 'TANGGAL') && (
                  <ul className={'flex flex-col gap-2 list-decimal pl-2 mt-2'}>
                    {row?.hasil_jawaban?.hasil_jawaban_persetage?.map((q, m) => (
                      <li
                        key={m}
                        className={
                          'flex justify-between items-center bg-green-50 p-1.5 border border-primary rounded'
                        }
                      >
                        <p>{q?.judul_item_jawaban}</p>
                        <div className="flex items-center gap-1.5">
                          <p>{q?.jumlah_jawaban}</p>
                          <p> - {q?.persentase}%</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {row?.type === 'SKALA_LINEAR' && (
                  <div className={'p-5'}>
                    <ScaleChart data={row?.hasil_jawaban?.hasil_jawaban_persetage} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
