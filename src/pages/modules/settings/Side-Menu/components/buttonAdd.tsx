import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { HiPlus } from 'react-icons/hi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import { MenuResolver, type TMenuForm } from '../data/resolver'
import { flattenMenu } from '../data/utils'
import type { ResReferensiType } from '@/interface/select'
import type { IMenu } from '../data/types'
import { FormSideMenu } from './form'

const ButtonAddSideMenu = ({ menu, idModules }: { menu: IMenu[]; idModules: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const parentOptions: ResReferensiType[] = flattenMenu(menu).map((item) => ({
    value: item.id_menu,
    label: `${'— '.repeat(item.depth)}${item.label}`,
  }))

  const form = useForm<TMenuForm>({
    resolver: zodResolver(MenuResolver),
    defaultValues: {
      parent_id: '',
      label: '',
      link: '',
      icon: '',
      urutan: 1,
      is_active: true,
    },
  })

  const queryClient = useQueryClient()
  async function handleSave(values: TMenuForm) {
    setLoading(true)
    try {
      const res = await AxiosClient.post('/pengaturan/menu', {
        ...values,
        id_module: idModules,
        parent_id: values.parent_id || null,
        icon: values.icon || null,
        link: values.link || '',
      })

      if (res.data.status) {
        toast.success(res.data.message)

        await queryClient.invalidateQueries({
          queryKey: ['settings-side-menu'],
        })
        setOpen(false)
        form.reset()
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={'outline'}
        className={'bg-white text-primary border-primary hover:text-primary'}
      >
        <HiPlus />
        Tambah Menu
      </Button>

      <DialogCustom
        className="max-w-2xl! w-full!"
        open={open}
        setOpen={setOpen}
        title={<p className="text-2xl ">Tambah Menu</p>}
      >
        <FormSideMenu
          loading={loading}
          open={open}
          setOpen={setOpen}
          form={form}
          HandleSave={handleSave}
          parentOptions={parentOptions}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonAddSideMenu
