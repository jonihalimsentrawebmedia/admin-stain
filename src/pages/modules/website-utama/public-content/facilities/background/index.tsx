import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UploadImgBackground } from '@/pages/modules/website-utama/component/uploadImgBackground'
import { UseGetFacilitiesBackground } from '@/pages/modules/website-utama/public-content/facilities/hooks'

export const FacilitiesBackgroundPage = () => {
  const { background } = UseGetFacilitiesBackground()

  return (
    <>
      <div className="flex flex-col gap-4">
        <ButtonTitleGroup buttonGroup={[]} label="Gambar Background - Fasilitas" isBack />
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
          queryName={'background-facilities'}
          background={background}
          context={'fasilitas-background'}
          max={4}
        />
      </div>
    </>
  )
}
