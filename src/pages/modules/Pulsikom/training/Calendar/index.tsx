import { UseGetCalendar } from '@/pages/modules/Pulsikom/training/Calendar/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { MdInfo } from 'react-icons/md'
import { transformToTable } from '@/utils/helper.tsx'
import React from 'react'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const CalendarTrainingCollect = () => {
  const { calendar } = UseGetCalendar()
  const data = transformToTable(calendar)

  const months = [
    { key: 'januari', label: 'Januari' },
    { key: 'februari', label: 'Februari' },
    { key: 'maret', label: 'Maret' },
    { key: 'april', label: 'April' },
    { key: 'mei', label: 'Mei' },
    { key: 'juni', label: 'Juni' },
    { key: 'juli', label: 'Juli' },
    { key: 'agustus', label: 'Agustus' },
    { key: 'semptember', label: 'Semptember' },
    { key: 'oktober', label: 'Oktober' },
    { key: 'november', label: 'November' },
    { key: 'desember', label: 'Desember' },
  ]

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          isBack
          label={'Kalender Training'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide={`Kalender Training`}
                  valueGuide="PUSILKOM_TRAINING_KALENDAR"
                />
              ),
            },
          ]}
        />
        <div className="bg-blue-50 border border-blue-500 text-blue-500 p-1.5 rounded-full flex items-center gap-1">
          <MdInfo className={'size-4 text-blue-500'} />
          Training yang muncul disini adalah training yang pendaftarannya sedang dibuka.
        </div>

        <table className="w-full border-collapse">
          {/* ✅ HEADER */}
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="border p-2 text-left w-[250px] border-primary">Topik Pembahasan</th>
              {months?.map((m) => (
                <th key={m.key} className="border p-2 text-center border-primary">
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* ✅ BODY */}
          <tbody>
            {data?.map((training) => (
              <React.Fragment key={training?.nama_training}>
                {/* 🔥 GROUP HEADER */}
                <tr className="bg-green-700 text-white">
                  <td
                    colSpan={months?.length + 1}
                    className="p-2 font-semibold border-primary border"
                  >
                    {training?.nama_training}
                  </td>
                </tr>

                {/* 🔥 ROW DATA */}
                {training?.rows?.map((row, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2 border border-primary">{row?.topik}</td>

                    {months.map((m) => (
                      <td key={m?.key} className="p-2 text-center border border-primary">
                        {row[m?.key as keyof typeof row] || ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
