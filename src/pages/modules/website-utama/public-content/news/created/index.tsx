import { FormNewsContent } from '@/pages/modules/website-utama/public-content/news/components/form.tsx'
import { useForm } from 'react-hook-form'
import { type INewsTypeForm, NewsResolver } from '../data/resolver'
import { zodResolver } from '@hookform/resolvers/zod'

export const CreatedNewsPage = () => {
  const form = useForm<INewsTypeForm>({
    resolver: zodResolver(NewsResolver),
  })

  const HandleSubmit = () => {}

  return (
    <>
      <FormNewsContent form={form} HandleSave={HandleSubmit} />
    </>
  )
}
