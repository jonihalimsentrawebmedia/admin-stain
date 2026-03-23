import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'

export const CurriculumPerProdi = () => {
  // const { curriculum } = UseGetCurriculumPerProdi()
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup buttonGroup={[]} label="Kurikulum Program Studi" isBack />
        <p className="text-gray-500 text-sm">Program Studi</p>
        <p className="text-xl">{}</p>
      </div>
    </>
  )
}
