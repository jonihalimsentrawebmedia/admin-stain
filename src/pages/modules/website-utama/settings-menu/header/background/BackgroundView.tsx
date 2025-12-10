import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ImageUploader from './components/ImageUploader'
import { useEffect, useState } from 'react'
import useGetBackground from '../content/controller/useGetBackground'
import type { MenuBackgroundItem } from '../content/model/menu-background'
import { useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'

const BackgroundView = () => {
  const [image, setImage] = useState<MenuBackgroundItem[]>([])
  const { backgroundList } = useGetBackground()
  const params = useParams()
  async function handleUpdateStatus(data: MenuBackgroundItem, index: number) {
    try {
      const res = await AxiosClient.patch(
        `/website-utama/menu-background/${data.id_menu_background}/status`,
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
  const { id } = params
  useEffect(() => {
    if (backgroundList) {
      const temp = [...backgroundList]
      if (temp.length < 4) {
        for (let i = temp.length; i < 4; i++) {
          temp.push({
            id_menu_background: '',
            id_menu: id ?? '',
            gambar: '', // Tipe string karena berisi URL gambar
            urutan: i + 1, // Tipe number karena berisi nilai urutan/angka
            status: 'N',
          })
        }
      }
      setImage(temp)
    }
  }, [backgroundList])
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} label="Gambar Background - Sejarah" isBack />
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
            handleChecked={() => {
              handleUpdateStatus(item, index)
            }}
            index={index + 1}
            key={'upload' + index}
            data={item}
            handleSave={(value) => {
              const temp = [...image]
              temp[index].id_menu_background = value.id_menu_background
              setImage(temp)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default BackgroundView
