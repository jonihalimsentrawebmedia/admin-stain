import ButtonForm from "@/components/common/button/ButtonForm"
import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup"
import { RichText } from "@/components/common/richtext"
import { Form } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"


const SpmiAsesorView = () => {
  const form = useForm()
  const [isEdit, setIsEdit] = useState(false)
  async function handleSave() {
    console.log(form)
  }

  useEffect(() => {
    form.reset({
      isi: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam aspernatur excepturi explicabo expedita labore, non ea inventore quam possimus mollitia. Velit culpa voluptas consequuntur pariatur nisi, aliquam dignissimos ipsum fuga!',
    })
  }, [])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="flex flex-col gap-4">
        <ButtonTitleGroup
          buttonGroup={
            isEdit
              ? [
                  {
                    type: 'custom',
                    element: (
                      <ButtonForm
                        loading={false}
                        onCancel={() => {
                          setIsEdit(false)
                        }}
                      />
                    ),
                  },
                ]
              : [
                  {
                    type: 'edit',
                    label: 'Edit Konten',
                    onClick: (e) => {
                      e.preventDefault()
                      setIsEdit(true)
                    },
                  },
                ]
          }
          label="Asesor"
        />
        {!isEdit ? (
          <div dangerouslySetInnerHTML={{ __html: form.watch('isi') }} />
        ) : (
          <RichText form={form} label="" name="isi" isRow={false} />
        )}
        {isEdit && (
          <ButtonForm
            loading={false}
            onCancel={() => {
              setIsEdit(false)
            }}
          />
        )}
      </form>
    </Form>
  )
}

export default SpmiAsesorView