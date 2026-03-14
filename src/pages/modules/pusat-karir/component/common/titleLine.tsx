interface props {
  title: string
}

export const TitleLine = (props: props) => {
  const { title } = props
  return (
    <>
      <div className={'flex items-center gap-1.5'}>
        <p className={'whitespace-nowrap text-primary text-lg'}>{title}</p>
        <div className="bg-yellow-500 h-[1.5px] w-full" />
      </div>
    </>
  )
}
