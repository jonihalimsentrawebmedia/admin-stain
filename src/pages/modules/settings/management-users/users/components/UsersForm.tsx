import CardInput from '@/components/common/card/CardInput'

import InputImage from '@/components/common/form/InputImage'
import { InputRadio } from '@/components/common/form/InputRadio'
import { InputText } from '@/components/common/form/InputText'
import { SelectCustom } from '@/components/common/form/SelectCustom'
import type { UseFormReturn } from 'react-hook-form'

import type { UsersType } from '../model'
import useGetLevelUser from '../../level/controller/useGetLevelUser'
import { useEffect, useState } from 'react'
import { InputCheckbox } from '@/components/common/form/InputCheckbox'
import useGetSatuanOrganisasiAll from '../../../controller/useGetSatuanOrganisasiAll'

interface Props {
  form: UseFormReturn<UsersType>
  isEdit?: boolean
}
const UsersForm = ({ form ,isEdit}: Props) => {
  const { levelUser } = useGetLevelUser()
  const idLevelUser = form.watch('level_user.id_level_user')
  const [isSatuanKerja, setIsSatuanKerja] = useState(false)
  const { satuanOrganisasi } = useGetSatuanOrganisasiAll()
  useEffect(() => {
    if (idLevelUser) {
      const temp = levelUser.filter((item) => item.id_level == idLevelUser)[0]

      setIsSatuanKerja(temp.is_satker)
    }
  }, [idLevelUser])
  const leverUserFil = levelUser.filter(
    (item) => item.id_level == form.watch('level_user.id_level_user')
  )[0]
  return (
    <>
      <div className="max-w-[250px]">
        <InputImage form={form} name="gambar" label="Logo" />
      </div>
      <CardInput title="Informasi User">
        <div className="flex flex-col gap-4">
          <InputText
            form={form}
            name="nama_lengkap"
            isRow
            label="Nama Lengkap"
            placeholder="Nama Lengkap"
            isRequired
          />
          <InputText
            form={form}
            name="jabatan"
            isRow
            label="Jabatan"
            placeholder="Jabatan"
            isRequired
          />
          <InputRadio
            form={form}
            isRow
            name="jenis_kelamin"
            label="Jenis Kelamin"
            data={[
              {
                label: 'Laki-Laki',
                value: 'L',
              },
              {
                label: 'Perempuan',
                value: 'P',
              },
            ]}
          />
          <InputText
            form={form}
            name="telepon"
            isRow
            label="Telepon"
            placeholder="Telepon"
            type="number"
            inputClassName="lg:max-w-[300px]"
          />
          <InputText
            form={form}
            name="email"
            isRow
            label="Email"
            placeholder="Email"
            type="email"
            inputClassName="lg:max-w-[300px]"
          />
          <InputRadio
            isRow
            form={form}
            name="status"
            label="Status Akun"
            data={[
              {
                label: 'Aktif',
                value: 'Y',
              },
              {
                label: 'Tidak Aktif',
                value: 'N',
              },
            ]}
          />
          {!isEdit && (
            <>
              <SelectCustom
                data={levelUser.map((item) => {
                  return {
                    value: item.id_level,
                    label: item.nama,
                  }
                })}
                name="level_user.id_level_user"
                label="Level User"
                placeholder="Masukkan Level User"
                form={form}
                isRow
                level5
                inputClassName="lg:max-w-[300px]"
              />

              {isSatuanKerja ? (
                <InputCheckbox
                  isRow
                  form={form}
                  name="satuan_kerja"
                  label="Pilih Satuan Kerja"
                  data={satuanOrganisasi.map((item) => {
                    return {
                      label: item.nama,
                      value: item.id_satuan_organisasi,
                    }
                  })}
                  isSingle={leverUserFil?.kelompok == 'EDITOR' ? false : true}
                  isGrid
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
            </>
          )}
        </div>
      </CardInput>
    </>
  )
}

export default UsersForm
