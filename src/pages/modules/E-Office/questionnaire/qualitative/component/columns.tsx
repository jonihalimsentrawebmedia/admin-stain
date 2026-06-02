import type { ColumnDef } from '@tanstack/react-table'
import type { UseFormReturn } from 'react-hook-form'
import type { TQuestionItem, TQuestionnaireQualitative } from '../data/resolver.tsx'
import ButtonEditQuestion from './editQuestion.tsx'
import ButtonDeleteList from './buttonDelete.tsx'

interface props {
  form: UseFormReturn<TQuestionnaireQualitative>
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
