import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import Search from '@/components/common/table/Search.tsx'

export const NewsFaculty = () => {
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup label={'Berita'} buttonGroup={[]} />
        <Search placeholder="Cari Berita" position={'end'} />
      </div>
    </>
  )
}
