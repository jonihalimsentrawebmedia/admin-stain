import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ButtonEmail from '../components/ButtonEmail'
import AdmissionInformationPublicDetailViewModel from '../detail/AdmissionInformationPublicDetailViewModel'
import { statusAdmission } from '../utils'
import AdmissionInformationPublicLogViewModel from './AdmissionInformationPublicLogViewModel'
import DetailField from '@/components/common/field/DetailField'
import { useGetAdmissionInformationPublicLog } from '../hooks'
import { useForm } from 'react-hook-form'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FaWhatsapp } from 'react-icons/fa'
import { Separator } from '@/components/ui/separator'

const AdmissionInformationPublicLogView = () => {
  const { form, admissionPublic, id } = AdmissionInformationPublicDetailViewModel()
  const { fieldLog } = AdmissionInformationPublicLogViewModel()
  const { admissionPublicLog, loading } = useGetAdmissionInformationPublicLog(id!)
  const formLog = useForm()

  useEffect(() => {
    if (admissionPublicLog) {
      formLog.reset({
        ...admissionPublicLog,
      })
    }
  }, [admissionPublicLog])
  if (loading) {
    return <Skeleton className="h-[200px] w-full" />
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
                <ButtonEmail data={admissionPublic} id={id!} />
                <Link target="_blank" to={`https://wa.me/${admissionPublic?.no_hp}`}>
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
        label="Riwayat Email"
        isBack
      />
      <div className="border p-4  border-primary bg-primary/10">
        <p className="text-primary">Informasi Penerima</p>
        <DetailField data={fieldLog} form={form} />
      </div>
      <div className="flex text-primary gap-2 relative items-center">
        <p className="bg-white whitespace-nowrap">Riwayat Email</p>
        <Separator className="w-full" />
      </div>
      {admissionPublicLog?.riwayat.map((item, index) => {
        const field = [
          {
            name: `riwayat.${index}.nama_pengirim_user`,
            label: 'oleh',
          },
          {
            name: `riwayat.${index}.subjek"`,
            label: 'Subjek',
          },
          {
            name: `riwayat.${index}.pesan`,
            label: 'Pesan',
          },
          {
            name: `riwayat.${index}.file_lampiran`,
            label: 'Lampiran',
            component: (
              <ul className="list-decimal list-inside text-primary">
                {item.file_lampiran.map((file, index) => (
                  <li key={index}>
                    <a href={file} target="_blank" rel="noopener noreferrer" className="">
                      Dokumen {index + 1} {file.split('.')[file.split('.').length - 1]}
                    </a>
                  </li>
                ))}
              </ul>
            ),
          },
        ]
        return (
          <div className="border-b py-4" key={item.id_permohonan_email_riwayat}>
            <DetailField form={formLog} data={field} />
          </div>
        )
      })}
    </div>
  )
}

export default AdmissionInformationPublicLogView
