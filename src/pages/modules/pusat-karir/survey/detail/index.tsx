import { UseGetDetailSurvey } from '@/pages/modules/pusat-karir/survey/hooks'
import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { clsx } from 'clsx'
import { useState } from 'react'
import { Form } from '@/components/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { ContentType } from '@/pages/modules/pusat-karir/survey/component/contentType'

export const DetailSurvey = () => {
  const { id } = useParams()
  const { detailSurvey } = UseGetDetailSurvey(id as string)

  const [indexActive, setIndexActive] = useState(0)

  const form = useForm()
  const ActiveSection = detailSurvey?.bagian[indexActive]

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Detail Survey'}
          buttonGroup={[
            {
              type: 'edit',
              label: 'Edit Survey',
            },
          ]}
        />

        <p className={'font-semibold text-2xl'}>{detailSurvey?.judul}</p>
        <p>{detailSurvey?.deskripsi}</p>

        <div className="grid grid-cols-[250px_1fr] gap-5">
          <ul
            className={clsx(
              'border rounded p-2.5 text-sm font-semibold',
              'flex flex-col gap-2 bg-white shadow'
            )}
          >
            {detailSurvey?.bagian.map((row, k) => (
              <li
                className={clsx('border p-1.5', k === indexActive ? 'bg-green-100' : '')}
                key={k}
                onClick={() => setIndexActive(k)}
              >
                {row?.judul}
              </li>
            ))}
          </ul>

          <div className={'space-y-5 bg-white'}>
            <p className="text-2xl font-semibold">{ActiveSection?.judul}</p>

            <Form {...form}>
              <form className={'space-y-4'}>
                {ActiveSection?.pertanyaan?.map((row, k) => (
                  <div key={k} className={'border p-2.5 rounded'}>
                    <ContentType item={row} form={form} />
                  </div>
                ))}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
