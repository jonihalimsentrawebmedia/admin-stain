import { FormStoryAlumni } from '@/pages/modules/website-fakultas/academic/ppsm/story/component/form.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {
  type StoryForm,
  StoryResolver,
} from '@/pages/modules/website-fakultas/academic/ppsm/story/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'

export const CreatedStoryAlumni = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm<StoryForm>({
    resolver: zodResolver(StoryResolver),
  })

  const HandleSave = (data: StoryForm) => {
    setLoading(true)
    console.log(data)
  }

  return (
    <>
      <FormStoryAlumni form={form} HandleSave={HandleSave} loading={loading} />
    </>
  )
}
