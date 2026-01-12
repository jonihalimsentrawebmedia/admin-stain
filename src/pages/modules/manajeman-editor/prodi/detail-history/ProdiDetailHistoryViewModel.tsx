import { cekSelisihHari, formatDateTime } from "@/utils/date"
import useGetSatuanOrganisasiDetailHistory from "../../controller/useGetSatuanOrganisasiDetailHistory"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

const ProdiDetailHistoryViewModel = () => {
  const { satuanOrganisasi } = useGetSatuanOrganisasiDetailHistory()
  const form = useForm()
  const fieldDetail = [
    {
      label: 'Tanggal Diajukan',
      name: 'tanggal',
    },
    {
      label: 'Nama',
      name: 'nama_admin',
    },
    {
      label: 'Jabatan',
      name: 'level',
    },
    {
      label: 'Unit/Satuan Kerja',
      name: 'nama_satuan_organisasi',
    },
  ]
  const fieldImage = [
    {
      label: 'Logo',
      name: 'logo',
      component: (
        <div className="bg-[#F5FFFA] border border-[#70F2B1] p-4">
          <img className="max-w-[200px] max-h-[200px]" src={form.watch('logo')} alt="logo" />
        </div>
      ),
    },
    {
      label: 'Favicon',
      name: 'favicon',
      component: (
        <div className="bg-[#F5FFFA] w-fit border border-[#70F2B1] p-4">
          <img className="max-w-[100px] max-h-[100px]" src={form.watch('favicon')} alt="logo" />
        </div>
      ),
    },
  ]
  const fieldUniversity = [
    {
      label: 'Kelompok',
      name: 'kelompok',
    },
    {
      label: 'Nama Universitas / Perguruan Tinggi',
      name: 'nama',
    },
    {
      label: 'Singkatan',
      name: 'singkatan',
    },
    {
      label: 'Keyword',
      name: 'keyword',
    },
  ]
  const fieldAddress = [
    {
      label: 'Alamat',
      name: 'alamat',
    },
    {
      label: 'Provinsi',
      name: 'provinsi',
    },
    {
      label: 'Kabupaten/Kota',
      name: 'kabupaten_kota',
    },
    {
      label: 'Kecamatan',
      name: 'kecamatan',
    },
    {
      label: 'Kelurahan / Desa',
      name: 'kelurahan',
    },
    {
      label: 'Kode Pos',
      name: 'kode_pos',
    },
  ]
  const fieldContact = [
    {
      label: 'Telepon',
      name: 'telepon',
    },
    {
      label: 'Fax',
      name: 'fax',
    },
    {
      label: 'Email',
      name: 'email',
    },
  ]
  const fieldMediaSocial = [
    {
      label: 'Facebook',
      name: 'facebook',
    },
    {
      label: 'Twitter',
      name: 'twitter',
    },
    {
      label: 'Instagram',
      name: 'instagram',
    },
    {
      label: 'Youtube',
      name: 'youtube',
    },
  ]

  const dateAt = formatDateTime(satuanOrganisasi?.tanggal ?? '')
  useEffect(() => {
    form.reset({
      ...satuanOrganisasi?.draft,
      kelompok: 'Prodi',
      alasan_tolak: satuanOrganisasi?.alasan_tolak,
      status_publish: satuanOrganisasi?.status_publish,
      tanggal: ` ${dateAt.date}, ${dateAt.time}                
                 ${cekSelisihHari(satuanOrganisasi?.tanggal ?? '')}`,
      nama_satuan_organisasi: satuanOrganisasi?.nama_satuan_organisasi,
      nama_admin: satuanOrganisasi?.nama_admin,
      level: satuanOrganisasi?.level,
    })
  }, [satuanOrganisasi])

  return {
    fieldAddress,
    fieldContact,
    fieldImage,
    fieldMediaSocial,
    fieldUniversity,
    form,fieldDetail,satuanOrganisasi
  }
}

export default ProdiDetailHistoryViewModel