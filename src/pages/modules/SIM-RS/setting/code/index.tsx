import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { InputText } from '@/components/common/form/InputText'
import { Button } from '@/components/ui/button'
import { Edit, Save, X } from 'lucide-react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetCodeSIMRS } from './hooks/index.tsx'
import { IoInformationCircle } from 'react-icons/io5'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

const CodeSettingSIMRS = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const { code } = UseGetCodeSIMRS()
  const permission = GuardCrud({ keys: 'PENOMORAN_REKAM_MEDIS' })

  const form = useForm()

  useEffect(() => {
    if (code) {
      form.reset({ kode: code?.kode, jumlah_digit: code?.jumlah_digit })
    }
  }, [code])

  const queryClient = useQueryClient()

  const HandleSave = async (e: any) => {
    setLoading(true)
    await AxiosClient.put('/simrs/pengaturan/kode-rekam-medis', {
      kode: e?.kode,
      jumlah_digit: Number(e?.jumlah_digit),
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Berhasil mengubah kode rekam medis')
          setLoading(false)
          setIsEdit(false)
          queryClient.invalidateQueries({ queryKey: ['code-simrs'] })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  const kode = form.watch('kode')
  const jumlahDigit = form.watch('jumlah_digit')

  const contohKode = useMemo(() => {
    if (!kode || !jumlahDigit) return null
    const digits = String(1).padStart(Number(jumlahDigit), '0')
    return `${kode}${digits}`
  }, [kode, jumlahDigit])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xl sm:text-2xl text-[#444] font-medium">Pengaturan Kode Rekam Medis</p>
        {!isEdit && permission?.kelola && (
          <Button variant="outline" onClick={() => setIsEdit(true)}>
            <Edit /> Edit
          </Button>
        )}
      </div>

      <div className="flex gap-2 items-center w-fit px-2 py-1 text-[#2769CD] border border-[#2769CD] rounded text-sm">
        <IoInformationCircle className="size-4 shrink-0" />
        <span>Atur format kode rekam medis sesuai kebutuhan rumah sakit</span>
      </div>

      {!isEdit ? (
        <div className="bg-white border rounded-lg p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Kode Rekam Medis</p>
              <p className="text-base font-semibold mt-1">{code?.kode || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jumlah Digit</p>
              <p className="text-base font-semibold mt-1">{code?.jumlah_digit ?? '-'}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Contoh Kode</p>
            <p className="text-lg font-bold text-blue-700 mt-1">
              {code?.kode && code?.jumlah_digit
                ? `${code.kode}${String(1).padStart(Number(code.jumlah_digit), '0')}`
                : '-'}
            </p>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(HandleSave)}>
            <InputText
              form={form}
              name="kode"
              label="Kode Rekam Medis"
              placeholder="Masukkan kode (contoh: RR, RM, SOD)"
            />

            <InputText
              form={form}
              name="jumlah_digit"
              type="number"
              label="Jumlah Digit"
              placeholder="Masukkan jumlah digit (contoh: 4, 5, 6)"
            />

            {contohKode && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-700 font-medium">Contoh Kode:</p>
                <p className="text-lg font-bold text-blue-900 mt-1">{contohKode}</p>
                <p className="text-xs text-blue-500 mt-1">
                  Format: <span className="font-mono">{kode}</span> +{' '}
                  <span className="font-mono">{String(1).padStart(Number(jumlahDigit), '0')}</span>{' '}
                  = nomor urut dimulai dari 1
                </p>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" onClick={() => setIsEdit(false)}>
                <X /> Batal
              </Button>
              <Button type="submit" disabled={loading} className={'text-white'}>
                <Save /> Simpan
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default CodeSettingSIMRS
