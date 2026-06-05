import { z } from 'zod'
import { TipeInputField } from './types'

/** Validasi untuk satu opsi DROPDOWN */
export const OptionItemSchema = z.object({
  label: z
    .string({ error: 'Label opsi harus diisi' })
    .min(1, 'Label opsi harus diisi'),
  value: z
    .string({ error: 'Value opsi harus diisi' })
    .min(1, 'Value opsi harus diisi'),
})

/** Validasi untuk satu section field */
export const SectionFieldSchema = z.object({
  id_section_field: z.string().optional(),
  key_placeholder: z
    .string({ error: 'Key placeholder harus diisi' })
    .min(1, 'Key placeholder harus diisi'),
  label: z.string({ error: 'Label harus diisi' }).min(1, 'Label harus diisi'),
  tipe_input: z
    .nativeEnum(TipeInputField, {
      error: 'Tipe input harus dipilih',
    }),
  is_required: z.boolean(),
  urutan: z.number().optional(),
  options: z.array(OptionItemSchema).optional(),
})

/** Validasi untuk array section fields yang akan dikirim ke endpoint update */
export const SectionFieldsUpdateSchema = z.object({
  section_fields: z
    .array(SectionFieldSchema)
    .min(1, 'Minimal 1 section field'),
}).superRefine((data, ctx) => {
  // Pastikan field dengan tipe DROPDOWN memiliki minimal 1 opsi
  data.section_fields.forEach((field, index) => {
    if (
      field.tipe_input === TipeInputField.DROPDOWN &&
      (!field.options || field.options.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Field "${field.label || field.key_placeholder}" bertipe DROPDOWN harus memiliki minimal 1 opsi`,
        path: [`section_fields.${index}.options`],
      })
    }
  })
})

export type TSectionFieldsUpdateForm = z.infer<typeof SectionFieldsUpdateSchema>
