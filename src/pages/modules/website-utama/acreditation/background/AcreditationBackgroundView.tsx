import AxiosClient from '@/provider/axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import type { ImageDataUploader } from '../../component/UploadImage/ImageUploadBg'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ImageUploader from '../../component/UploadImage/ImageUploadBg'
import useGetBgAcreditation from '../controller/useGetBgAcreditation'
export interface ImageCalendarAcademic extends ImageDataUploader {
  id_background: number
}
const AcreditationBackgroundView = () => {
  const [image, setImage] = useState<ImageCalendarAcademic[]>([])
  const { background } = useGetBgAcreditation()

  async function handleUpdateStatus(data: ImageCalendarAcademic, index: number) {
    try {
      const res = await AxiosClient.patch(
        `/website-utama/akreditas-background/${data.id_background}/status`,
        {
          status: data.status == 'Y' ? 'N' : 'Y',
        }
      )
      if (res.data.status) {
        toast.success(res.data.message)
        const temp = [...image]
        temp[index].status = data.status == 'Y' ? 'N' : 'Y'
        setImage(temp)
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
    }
  }

  useEffect(() => {
    if (background) {
      const temp = [...background]
      if (temp.length < 4) {
        for (let i = temp.length; i < 4; i++) {
          temp.push({
            id_background: 0,
            gambar: '', // Tipe string karena berisi URL gambar
            urutan: i + 1, // Tipe number karena berisi nilai urutan/angka
            status: 'N',
          })
        }
      }
      setImage(temp)
    }
  }, [background])
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Gambar Background - Kalender Akademik" isBack />
      <div className="px-4 py 2 border border-[#2769CD] rounded-lg bg-[#F5F9FF]">
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

      <div className="grid grid-cols-2 gap-4 ">
        {image.map((item, index) => (
          <ImageUploader
            keyUrl="bg-acreditation"
            urlBg="/website-utama/akreditas-background"
            urlBgDelete={`/website-utama/akreditas-background/${item.id_background}`}
            handleChecked={async () => {
              await handleUpdateStatus(item, index)
            }}
            index={index + 1}
            key={'upload' + index}
            data={item}
            handleSave={(value: any) => {
              const temp = [...image]
              console.log(value)
              temp[index].id_background = value.id_background
              setImage(temp)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default AcreditationBackgroundView
