import { USeGetUktByProdiEntrance } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ColumnsUktDetail } from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/data/columns.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SchemaUtkProdiEntrance,
  type TSchemaUtkProdiEntrance,
} from '@/pages/modules/website-utama/cost-education/ukt/detail-ukt/data/resolver.tsx'
import { useEffect } from 'react'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'
import { Form } from '@/components/ui/form.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'

export const GetDetailEntranceProdiUktPage = () => {
  const { id_prodi, id_entrance } = useParams()
  const { detail } = USeGetUktByProdiEntrance({
    id_prodi: id_prodi as string,
    id_ukt_jalur_masuk: id_entrance as string,
  })

  const form = useForm<TSchemaUtkProdiEntrance>({
    resolver: zodResolver(SchemaUtkProdiEntrance),
  })

  const columns = ColumnsUktDetail({
    form: form,
  })

  useEffect(() => {
    if (detail) {
      const temp: any = []
      detail?.data[0]?.biaya_tingkatan.map((row) => {
        temp.push({
          id_tingkatan: row?.id_tingkatan,
          biaya: Number(row?.biaya),
        })
      })
      form.reset({
        biaya_tingkatan: temp,
      })
    }
  }, [detail])

  const navigate = useNavigate()

  const HandleSave = async (value: TSchemaUtkProdiEntrance) => {
    console.log(value)
    const temp = value?.biaya_tingkatan.map((row) => ({
      id_tingkatan: row?.id_tingkatan,
      biaya: row?.biaya?.toString(),
    }))
    await AxiosClient.post(
      `/website-utama/biaya-pendidikan-ukt/prodi/${id_prodi}/jalur-masuk/${id_entrance}`,
      {
        biaya_tingkatan: temp,
      }
    ).then((res) => {
      toast.success(res?.data?.message ?? 'Berhasil menyimpan data')
      form.reset()
      navigate(`/modules/website-utama/biaya-pendidikan/ukt/${id_prodi}`)
    })
  }

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          link={`/modules/website-utama/biaya-pendidikan/ukt/${id_prodi}`}
          isBack
          label="Edit Tarif"
          buttonGroup={[]}
        />
        {detail?.data.map((row, k) => (
          <div key={k}>
            <div className={'flex items-center justify-between gap-4'}>
              <div className={'w-full'}>
                <p className="text-gray-500">Nama Prodi</p>
                <Form {...form}>
                  <form className={'flex flex-col gap-4'} onSubmit={form.handleSubmit(HandleSave)}>
                    <ButtonTitleGroup
                      rootButtonClassName={'text-primary!'}
                      label={`${detail?.nama_prodi} - ${row?.nama_jalur_masuk}`}
                      buttonGroup={[
                        {
                          type: 'cancel',
                          label: 'Cancel',
                          onClick: () => navigate(-1),
                        },
                        {
                          type: 'save',
                          label: 'Save',
                        },
                      ]}
                    />
                    <TableBasic
                      tdClassName={'bg-white'}
                      columns={columns}
                      data={row?.biaya_tingkatan}
                      className={'mt-5'}
                    />
                  </form>
                </Form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
