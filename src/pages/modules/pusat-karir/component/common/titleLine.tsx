import { cn } from '@/lib/utils.ts'

interface props {
  title: string
  className?: string
}

export const TitleLine = (props: props) => {
  const { title, className } = props
  return (
    <>
      <div className={'flex items-center gap-1.5'}>
        <p className={cn('whitespace-nowrap text-primary text-lg', className)}>{title}</p>
        <div className="bg-yellow-500 h-[1.5px] w-full" />
      </div>
    </>
  )
}
