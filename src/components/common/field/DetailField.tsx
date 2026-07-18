import type { ReactNode } from 'react'
import type { UseFormReturn } from 'react-hook-form'
interface Props {
  data: {
    name: string
    label: string
    component?: ReactNode
    isHidden?: boolean
  }[]
  form: UseFormReturn<any>
  isRow?: boolean
  isRowParent?: boolean
  classNameParent?: string
  isGrid?: boolean
}
const DetailField = ({ data, form, isRow = true, isRowParent, classNameParent, isGrid }: Props) => {
  return (
    <div
      className={`${isGrid ? 'grid grid-cols-1 md:grid-cols-2' : 'flex'} ${isRowParent ? 'flex-col lg:flex-row' : 'flex-col'} gap-4 ${classNameParent}
    `}
    >
      {data.map((item, index) => (
        <div
          key={item.name + item.label + index}
          className={`flex ${isRow ? 'flex-col lg:flex-row' : 'flex-col'} ${item.isHidden ? 'hidden' : ''} gap-2
    `}
        >
          <div className="w-full lg:min-w-[200px] lg:max-w-[200px] text-wrap text-muted-foreground">
            {item.label}
          </div>
          {item.component ? (
            form.watch(item.name)!==undefined ? (
              <div className="text-foreground">{item.component}</div>
            ) : item.label != '' ? (
              '-'
            ) : (
              ''
            )
          ) : (
            <div className="text-foreground break-words">
              {item.label == '' ? '' : (form.watch(item.name) ?? '-')}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default DetailField
