import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { UseGetListVideoGallery } from '@/pages/modules/website-utama/campus-life/hooks'
import { VideoColumns } from '@/pages/modules/website-utama/campus-life/components/SectionTabs/gallery/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Props {
  isChange?: boolean
  idChange?: string
}

export const ButtonSearch = (props: Props) => {
  const { isChange, idChange } = props
  const [open, setOpen] = useState(false)

  const { videoGallery } = UseGetListVideoGallery()
  const columns = VideoColumns(idChange)

  return (
    <>
      {isChange ? (
        <Button onClick={() => setOpen(!open)}>Ganti</Button>
      ) : (
        <button
          onClick={() => {
            setOpen(!open)
          }}
          className={
            'w-full h-[350px] rounded flex flex-col justify-center items-center border-primary text-primary bg-primary-foreground border'
          }
        >
          <IoSearch />
          Klik untuk mencari konten video
        </button>
      )}

      <DialogCustom open={open} setOpen={setOpen} title={'Cari Galeri Video'} className={'rounded'}>
        <TableCustom data={videoGallery} columns={columns} />
      </DialogCustom>
    </>
  )
}
