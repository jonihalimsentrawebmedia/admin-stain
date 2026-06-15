import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form.tsx'
import TextInput from '@/components/common/form/TextInput.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  EmployeeSchema,
  type TEmployeeSchema,
} from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/resolver.tsx'
import { useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import { TitleLine } from '@/pages/modules/pusat-karir/component/common/titleLine.tsx'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface props {
  HandleSave: (e: TEmployeeSchema[]) => void
}

const requiredFields = ['nama_lengkap', 'nik', 'nip', 'alamat', 'hp', 'jabatan_pegawai'] as const

const FormAssignmentManual = (props: props) => {
  const { HandleSave } = props

  const form = useForm<TEmployeeSchema>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      metode_tambah: 'MANUAL',
    },
  })
  const [listUser, setListUser] = useState<TEmployeeSchema[]>([])

  const HandleSaveData = (value: TEmployeeSchema) => {
    const hasEmptyField = requiredFields.some((field) => !value[field]?.toString().trim())
    if (!hasEmptyField) {
      const temp: any = {
        ...value,
        id_sdm: null,
        metode_tambah: 'MANUAL',
        nik: value?.nik === '' ? null : value?.nik,
      }
      const tempUser = [...listUser]
      if (temp) {
        tempUser.push(temp)
        setListUser(tempUser)
        form.reset()
      }
    } else {
      toast.error('Data tidak boleh kosong')
    }
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-4'}>
          <TextInput
            form={form}
            name={'nama_lengkap'}
            label={'Nama Lengkap'}
            placeholder={'Nama Lengkap'}
            htmlFor={'nama_lengkap'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'nik'}
            label={'NIK'}
            placeholder={'NIK'}
            htmlFor={'nik'}
            type={'number'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'nip'}
            label={'NIP'}
            placeholder={'NIP'}
            htmlFor={'nip'}
            type={'number'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'satuan_kerja'}
            label={'Satuan Kerja'}
            placeholder={'Satuan Kerja'}
            htmlFor={'satuan_kerja'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'hp'}
            label={'HP'}
            placeholder={'hp'}
            htmlFor={'HP'}
            type={'number'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'alamat'}
            label={'Alamat'}
            placeholder={'Alamat'}
            htmlFor={'alamat'}
            isRow
            isRequired
          />
          <TextInput
            form={form}
            name={'jabatan_pegawai'}
            label={'Jabatan Pegawai'}
            placeholder={'Jabatan Pegawai'}
            htmlFor={'jabatan_pegawai'}
            isRow
            isRequired
          />

          <Button
            onClick={(e) => {
              e.preventDefault()
              const data: any = form.getValues()
              HandleSaveData(data)
            }}
            className={'text-white w-fit'}
          >
            Simpan Data
          </Button>
        </form>
      </Form>
      <div className="mt-4" />
      <TitleLine title={'Daftar Peserta Manual'} />
      {listUser.map((row, index) => (
        <div
          className={
            'flex items-center justify-between gap-4 border border-primary p-1.5 bg-gray-100'
          }
          key={index}
        >
          <p className="text-primary">{row?.nama_lengkap}</p>
          <button onClick={() => setListUser(listUser.filter((item) => item !== row))}>
            <FaTrash />
          </button>
        </div>
      ))}

      <div className="flex justify-end items-center">
        <Button
          onClick={(e) => {
            e.preventDefault()
            HandleSave(listUser)
          }}
          className={'bg-primary text-white'}
        >
          Tambah Pegawai ({listUser.length})
        </Button>
      </div>
    </>
  )
}
export default FormAssignmentManual
