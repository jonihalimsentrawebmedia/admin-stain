import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetAnnouncementBackground } from '@/pages/modules/website-utama/public-content/announcement/hooks'
import { UploadImgBackground } from '@/pages/modules/website-utama/component/uploadImgBackground'

export const AnnouncementBackground = () => {
  const { background } = UseGetAnnouncementBackground()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup buttonGroup={[]} label="Gambar Background - Pengumuman" isBack />
        <div className="px-4 py 2 border border-[#2769CD] rounded-lg bg-[#F5F9FF] py-2">
          <ul className="list-outside text-[#464646] list-disc pl-4 ml-4">
            <li>Minimal ada 1 gambar</li>
            <li>
              Ketentuan Upload:
              <ul className="ml-4 pl-4 list-disc list-outside">
                <li>Jenis file: .JPG / .JPEG / .PNG</li>
                <li>Ukuran: Max 2MB</li>
                <li>Resolusi: 4:1</li>
              </ul>
            </li>
          </ul>
        </div>

        <UploadImgBackground
          queryName={'background-announcement-lembaga'}
          background={background}
          context={'pengumuman-background'}
          max={4}
        />
      </div>
    </>
  )
}
