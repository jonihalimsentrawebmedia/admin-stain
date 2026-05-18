// import UseGetEducationalLevel from '@/pages/modules/settings/reference/educational-level/controller/useGetEducationalLevel.tsx'
// import UseGetSatuanOrganisasi from '@/pages/modules/settings/controller/useGetSatuanOrganisasi.tsx'
// import { useState } from 'react'
// import { Button } from '@/components/ui/button.tsx'
// import { BiPlus } from 'react-icons/bi'
// import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
// import { Form } from '@/components/ui/form.tsx'
// import { useForm } from 'react-hook-form'
//
// interface props {
//   id_jenjang: string
//   id_fakultas: string
//   id_prodi: string
// }
//
// export const AddUktEntrance = (props: props) => {
//   const { id_jenjang, id_fakultas, id_prodi } = props
//   const [loading, setLoading] = useState(false)
//   const [open, setOpen] = useState(false)
//   const form = useForm()
//
//   const { educationalLevel } = UseGetEducationalLevel({ isGetAll: true })
//   const { satuanOrganisasi: faculty } = UseGetSatuanOrganisasi({
//     isGetAll: true,
//     kelompok: 'FAKULTAS',
//   })
//   const { satuanOrganisasi: prodi } = UseGetSatuanOrganisasi({
//     isGetAll: true,
//     kelompok: 'PRODI',
//   })
//
//   const HandlerSave = () => {
//     setLoading(true)
//   }
//
//   return (
//     <>
//       <Button
//         variant={'outline'}
//         onClick={() => setOpen(!open)}
//         className={'border-primary text-primary hover:text-primary'}
//       >
//         <BiPlus />
//         Tambah Jalur Masuk
//       </Button>
//
//       <DialogBasic
//         title={'Tambah Jalur Masuk'}
//         open={open}
//         setOpen={setOpen}
//         className={'lg:min-w-2xl'}
//       >
//         <Form></Form>
//       </DialogBasic>
//     </>
//   )
// }
