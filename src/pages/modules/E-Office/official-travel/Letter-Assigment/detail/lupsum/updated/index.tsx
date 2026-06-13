import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetLumpSumDetail } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/lupsum/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { format } from 'date-fns'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  ResolverLupSum,
  type TResolverLupSum,
} from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/lupsum/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { id } from 'date-fns/locale'
import { FormLupSum } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/lupsum/component/form.tsx'

const LupSumUpdated = () => {
  const { id: id_letter, id_employee } = useParams()
  const navigate = useNavigate()
  const { detail } = UseGetLumpSumDetail(id_employee as string)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverLupSum>({
    resolver: zodResolver(ResolverLupSum),
    defaultValues: {
      biaya: [
        {
          id_mail_surat_tugas_lumpsum_biaya: null,
          id_jenis_biaya: '',
          id_jenis_transportasi: '',
          no_ticket: '',
          jumlah_hari: 0,
          harga: 0,
          perhari: '',
          redaksi: '',
          is_rill: false,
        },
      ],
    },
  })

  const Costing = useFieldArray({
    control: form.control,
    name: 'biaya',
  })

  useEffect(() => {
    if (detail) {
      const temp = detail?.biaya?.map((row) => ({
        ...row,
        harga: Number(row.harga),
        perhari: row?.biaya_perhari,
      }))
      form.reset({
        ...(detail as any),
        biaya: temp,
      })
    }
  }, [detail])

  const HandleSave = async (value: TResolverLupSum) => {
    setLoading(true)
    await AxiosClient.post(`eoffice/mail-surat-tugas-pegawai/${id_employee}/lumpsum`, {
      ...value,
    })
      .then((res) => {
        if (res?.data.status) {
          setLoading(false)
          toast.success(res?.data.message || 'Success')
          navigate(`/modules/e-office/official-travel/letter-assignment/detail/${id_letter}/lupsum`)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Error')
      })
  }

  return (
    <>
      <div className="space-y-4">
        <ButtonTitleGroup label={'Detail Lumpsum'} buttonGroup={[]} isBack />

        <Card className={'shadow-none rounded-md'}>
          <CardContent className={'space-y-4'}>
            <div className="grid grid-cols-4 gap-5">
              <p className="text-gray-500">Nama Pegawai</p>
              <p>{detail?.nama_pegawai}</p>
              <p className="text-gray-500">NIP</p>
              <p>{detail?.nip_pegawai ?? '-'}</p>
              <p className="text-gray-500">Nama Pejabat</p>
              <p>{detail?.nama_penandatangan ?? 'Belum Dipilih'}</p>
              <p className="text-gray-500">NIP Pejabat</p>
              <p>{detail?.nip_pejabat ?? '-'}</p>
              <p className="text-gray-500">Nama Bendahara</p>
              <p>{detail?.nama_bendahara ?? 'Belum Dipilih'}</p>
              <p className="text-gray-500">NIP Bendahara</p>
              <p>{detail?.nip_bendahara ?? '-'}</p>
              <p className="text-gray-500">Jabatan Pejabat</p>
              <p>{detail?.nama_jabatan_struktural_pejabat ?? '-'}</p>
              <p className="text-gray-500">Jabatan Bendahara</p>
              <p>{detail?.nama_jabatan_struktural_bendahara ?? '-'}</p>
              <p className="text-gray-500">Tanggal</p>
              <p className={'col-span-3'}>
                {detail?.tanggal_surat
                  ? format(detail?.tanggal_surat, 'dd MMMM yyyy', {
                      locale: id,
                    })
                  : ''}
              </p>
              <p className="text-gray-500">Uraian / Kegiatan</p>
              <ul className={'pl-5 list-decimal col-span-3'}>
                {detail?.kegiatan?.map((row, index) => (
                  <li key={index}>{row}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {!detail?.biaya ? (
          <FormLupSum form={form} HandleSave={HandleSave} loading={loading} Costing={Costing} />
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
export default LupSumUpdated
