import type { ColumnDef } from '@tanstack/react-table'
import type { UseFormReturn } from 'react-hook-form'
import type {
  TQuestionItem,
  TQuestionnaireQuantitative,
} from '@/pages/modules/E-Office/questionnaire/quantitative/data/resolver.tsx'
import ButtonEditQuestion from '@/pages/modules/E-Office/questionnaire/quantitative/component/editQuestion.tsx'
import ButtonDeleteList from '@/pages/modules/E-Office/questionnaire/quantitative/component/buttonDelete.tsx'

interface props {
  form: UseFormReturn<TQuestionnaireQuantitative>
}

export const ColumnsQuestion = (props: props) => {
  const { form } = props
  const Columns: ColumnDef<TQuestionItem>[] = [
    {
      accessorKey: 'order',
      header: '#',
      cell: ({ row }) => {
        const index = row.index + 1
        return <span className="text-center">{index}</span>
      },
    },
    {
      accessorKey: 'pertanyaan',
      header: 'Pertanyaan',
    },
    {
      accessorKey: 'opsi1',
      header: 'Opsi 1',
      cell: ({ row }) => {
        return <>{row?.original.opsi[0]}</>
      },
    },
    {
      accessorKey: 'opsi2',
      header: 'Opsi 2',
      cell: ({ row }) => {
        return <>{row?.original.opsi[1]}</>
      },
    },
    {
      accessorKey: 'opsi3',
      header: 'Opsi 3',
      cell: ({ row }) => {
        return <>{row?.original.opsi[2]}</>
      },
    },
    {
      accessorKey: 'opsi4',
      header: 'Opsi 4',
      cell: ({ row }) => {
        return <>{row?.original.opsi[3]}</>
      },
    },
    {
      accessorKey: 'opsi5',
      header: 'Opsi 5',
      cell: ({ row }) => {
        return <>{row?.original.opsi[4]}</>
      },
    },
    {
      accessorKey: 'action',
      header: '',
      cell: ({ row }) => {
        const data = row?.original
        console.log(data)
        return (
          <>
            <div className="flex items-center justify-end gap-1">
              <ButtonEditQuestion
                data={data}
                HandleAddQuestion={(e) => {
                  const data = form.getValues('pertanyaan') ?? []
                  const updatedQuestions = data.map((q, idx) => (idx === row.index ? { ...e } : q))
                  form.setValue('pertanyaan', updatedQuestions, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }}
              />
                <ButtonDeleteList
                  onClick={() => {
                    const data = form.getValues('pertanyaan') ?? []
                    const updated = data.filter((_, idx) => idx !== row.index)
                    form.setValue('pertanyaan', updated, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }}
                />
            </div>
          </>
        )
      },
    },
  ]
  return Columns
}
