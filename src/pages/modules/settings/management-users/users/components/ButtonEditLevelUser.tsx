import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import DetailField from '@/components/common/field/DetailField'
import { InputText } from '@/components/common/form/InputText'
import { SelectCustom } from '@/components/common/form/SelectCustom'
import { Form } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { IconEdit } from '@/components/common/table/icon'
import type { LevelUserList } from '../../level/model'
import type { SatuanOrganisasiList } from '../../../model'
import ButtonForm from '@/components/common/button/ButtonForm'
import type { UserList } from '../model'
import type { UserMultiLevelList } from '../model/leveluser'
import useEditLevelUser from '../controller/useEditLevelUser'
import TableCustom from '@/components/common/table/TableCustom'

interface Props {
  levelUser: LevelUserList[]
  satuanOrganisasi: SatuanOrganisasiList[]
  formDetail: any
  data: UserList
  values: UserMultiLevelList
}
const ButtonEditLevelUser = ({ levelUser, satuanOrganisasi, formDetail, data, values }: Props) => {
  const { form, handleSave, loading, open, setOpen, columns, setValuesListUnit } = useEditLevelUser(
    {
      id_level_user: values.id_level_user,
      id_multi_level: values.id_users_multi_level,
    }
  )

  const field = [
    {
      label: 'Nama Lengkap',
      name: 'nama_lengkap',
    },
    {
      label: 'Jabatan',
      name: 'jabatan',
    },
    {
      label: 'Level User 1',
      name: 'level_users_multi',
      component: (
        <div>
          {data.level_users.length == 1 ? (
            data.level_users[0]
          ) : (
            <ul className="ml-2 pl-2 list-outside list-disc">
              {data.level_users.map((item) => (
                <li key={data.id_user + item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ),
    },
  ]

  const idLevelUser = form.watch('id_level_user')
  const [isSatuanKerja, setIsSatuanKerja] = useState(false)

  useEffect(() => {
    if (idLevelUser) {
      const temp = levelUser.filter((item) => item.id_level == idLevelUser)[0]

      setIsSatuanKerja(temp.is_satker)
    }
  }, [idLevelUser])
console.log(form.watch('list_unit'))
  return (
    <>
      <div
        onClick={() => {
          setOpen(true)
          form.reset({
            id_level_user: values.id_level_user,
            list_unit: values.list_unit_nama
              ? values.list_unit_nama.map((item) => item.id_satuan_organisasi)
              : undefined,
          })
          setValuesListUnit(
            values.list_unit_nama
              ? values.list_unit_nama.map((item) => item.id_satuan_organisasi)
              : []
          )
        }}
        className="flex items-center cursor-pointer gap-4"
      >
        <IconEdit />
      </div>
      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Ubah Level User</p>}
      >
        <div className="flex flex-col gap-4">
          <div className="p-4 border-primary border rounded-xl bg-[#F5FFFA]">
            <DetailField data={field} form={formDetail} isRow />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
              <SelectCustom
                data={levelUser.map((item) => {
                  return {
                    value: item.id_level,
                    label: item.nama,
                  }
                })}
                name="id_level_user"
                label="Level User"
                placeholder="Masukkan Level User"
                form={form}
                isRow
                level5
                inputClassName="lg:max-w-[300px]"
              />

              {isSatuanKerja ? (
                // <InputCheckbox
                //   isRow
                //   form={form}
                //   name="list_unit"
                //   label="Pilih Satuan Kerja"
                //   data={satuanOrganisasi.map((item) => {
                //     return {
                //       label: item.nama,
                //       value: item.id_satuan_organisasi,
                //     }
                //   })}
                //   isGrid
                // />

                <TableCustom
                  columns={columns}
                  data={satuanOrganisasi}
                  isShowPagination={false}
                  isShowFilter={false}
                />
              ) : (
                <InputText
                  form={form}
                  name="satuan_kerja"
                  label="Pilih Satuan Kerja"
                  defaultValue="Tidak Ada Satker"
                  placeholder="Tidak Ada Satker"
                  isRow
                  isDisabled
                  inputClassName="lg:max-w-[300px]"
                />
              )}
              <ButtonForm
                loading={loading}
                onCancel={() => {
                  setOpen(false)
                }}
              />
            </form>
          </Form>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonEditLevelUser
