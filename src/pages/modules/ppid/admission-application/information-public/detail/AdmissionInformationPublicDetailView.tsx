import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import AdmissionInformationPublicDetailViewModel from './AdmissionInformationPublicDetailViewModel'
import DetailField from '@/components/common/field/DetailField'
import { statusAdmission } from '../utils'
import ButtonEmail from '../components/ButtonEmail'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FaWhatsapp } from 'react-icons/fa'

const AdmissionInformationPublicDetailView = () => {
  const { field, field2, form, loading, admissionPublic, id } =
    AdmissionInformationPublicDetailViewModel()

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
        label="Detail Permohonan Informasi Publik"
        isBack
      />
      <DetailField data={field} form={form} />
      <p className="text-primary">Bagian Khusus Permohonan Hasil Ujian Masuk </p>
      <p className="text-blue-500">*tidak perlu diisi jika bukan permohonan hasil ujian masuk</p>
      <DetailField data={field2} form={form} />
    </div>
  )
}

export default AdmissionInformationPublicDetailView
