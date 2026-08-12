import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FiAlertTriangle, FiTool } from 'react-icons/fi'
import { FaUserShield } from 'react-icons/fa'
import PATERN from '@/assets/img/patern.png'

const MaintenancePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${PATERN})`,
      }}
      className="w-full h-screen bg-cover bg-center flex justify-center items-center p-4"
    >
      <Card className="max-w-xl w-full bg-white/90 backdrop-blur-md shadow-xl">
        <CardContent className="flex flex-col gap-5 p-6 sm:p-8 items-center text-center">
          <div className="size-16 rounded-full bg-amber-100 flex justify-center items-center">
            <FiTool className="size-8 text-amber-600" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-2xl sm:text-3xl font-bold text-neutral">
              Halaman Sedang Dalam Pemeliharaan
            </div>
            <div className="text-sm sm:text-base text-gray-500">
              Halaman ini sedang dalam tahap pengembangan dan dikerjakan oleh developer.
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2 text-start">
              <FiAlertTriangle className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-neutral">
                Halaman atau fitur baru yang ditambahkan <span className="font-semibold">wajib dilaporkan kepada Admin</span> agar dapat di-update.
              </div>
            </div>
            <div className="flex items-start gap-2 text-start">
              <FaUserShield className="size-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-neutral">
                Jika Anda memerlukan update halaman atau fitur, silakan hubungi Admin untuk proses selanjutnya.
              </div>
            </div>
          </div>

          <Link to="/modules" className="w-full">
            <Button className="w-full bg-green-800 hover:bg-green-900 text-white">
              Kembali ke Halaman Utama
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default MaintenancePage
