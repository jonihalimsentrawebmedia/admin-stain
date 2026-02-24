import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ObjectionsPublicDetailViewModel from './ObjectionsPublicDetailViewModel'
import DetailField from '@/components/common/field/DetailField'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { statusAdmission } from '../../information-public/utils'
import ButtonEmail from '../components/ButtonEmail'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FaWhatsapp } from 'react-icons/fa'

const ObjectionsPublicDetailView = () => {
  const { fieldIdentity, fieldRegistrasi, fieldKasus, form, loading, objectionPublic,id } =
    ObjectionsPublicDetailViewModel()
  if (loading) {
    return <Skeleton className="h-[300px]" />
  }
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        buttonGroup={[
          {
            type: 'custom',
            element: (
              <div className="flex gap-2 items-center">
                {statusAdmission(form.watch('status_permohonan') as string)}
                <ButtonEmail data={objectionPublic} id={id!} />
                <Link target="_blank" to={`https://wa.me/${objectionPublic?.no_hp}`}>
                  <Button
                    variant={'outline'}
                    className="border border-primary text-primary hover:text-primary"
                  >
                    <FaWhatsapp />
                    Whatsapp
                  </Button>
                </Link>
              </div>
            ),
          },
        ]}
        isBack
        label="Detail Permohonan Informasi Publik"
      />
      <p className="text-blue-500">
        *Data “No Registrasi” dan “Hari / Tanggal tanggapan atas keberatan akan diberikan” akan
        diisi ketika mengirim email
      </p>
      <div
        className={`flex flex-col lg:flex-row   gap-2
    `}
      >
        <div className="min-w-[200px] max-w-[200px] w-full text-wrap ">No. Registrasi</div>
        <div className="flex flex-col w-full gap-2">
          <Input className="bg-gray-300 w-full" disabled value={objectionPublic?.no_registrasi} />
        </div>
      </div>

      <DetailField data={fieldRegistrasi} form={form} />
      <div className="border p-4  border-black">
        <p className="text-primary">Identitas Kuasa Pemohon</p>
        <p className="text-blue-500">*diisi jika melampirkan surat kuasa</p>
        <DetailField data={fieldIdentity} form={form} />
      </div>
      <div
        className={`flex flex-col lg:flex-row   gap-2
    `}
      >
        <div className="min-w-[200px] max-w-[200px] w-full text-wrap ">Alasan Keberatan*</div>
        <div className="flex flex-col gap-2">
          {objectionPublic?.alasan_keberatan?.map((alasan, index) => (
            <div key={index} className="text-[#464646]">
              {alasan}
            </div>
          ))}
        </div>
      </div>
      <DetailField data={fieldKasus} form={form} />
      <div
        className={`flex flex-col lg:flex-row   gap-2
    `}
      >
        <div className="min-w-[200px] max-w-[200px] w-full text-wrap ">
          Hari / Tanggal tanggapan atas keberatan akan diberikan
        </div>
        <div className="flex w-full flex-col gap-2">
          <Input
            className="w-full bg-gray-300"
            disabled
            value={
              objectionPublic?.tanggal_permohonan
                ? format(objectionPublic?.tanggal_permohonan, 'dd-MM-yyyy, HH:mm:ss')
                : 'Belum Diisi'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ObjectionsPublicDetailView
