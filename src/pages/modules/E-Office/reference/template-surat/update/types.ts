/**
 * Model untuk update section fields pada template surat.
 *
 * Data ini berasal dari:
 *   GET  /eoffice/template-surat/{id}/detail  (field `fields: ISectionFieldItem[]`)
 *
 * Lalu dikirim ke:
 *   PUT  /eoffice/template-surat/section-fields/:id_template_surat  (body: ISectionFieldsUpdatePayload)
 */

/** Tipe input yang tersedia untuk section field */
export const TipeInputField = {
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  DATE: 'DATE',
  DROPDOWN: 'DROPDOWN',
  TEXTAREA: 'TEXTAREA',
} as const

export type TTipeInputField = (typeof TipeInputField)[keyof typeof TipeInputField]

export const TIPE_INPUT_OPTIONS: { value: TTipeInputField; label: string }[] = [
  { value: TipeInputField.TEXT, label: 'Text' },
  { value: TipeInputField.NUMBER, label: 'Number' },
  { value: TipeInputField.DATE, label: 'Date' },
  { value: TipeInputField.DROPDOWN, label: 'Dropdown' },
  { value: TipeInputField.TEXTAREA, label: 'Textarea' },
]

/** Satu opsi untuk tipe input DROPDOWN */
export interface IOptionItem {
  label: string
  value: string
}

/** Satu item section field — cocok dengan response detail endpoint */
export interface ISectionFieldItem {
  id_section_field: string
  key_placeholder: string
  label: string
  tipe_input: TTipeInputField
  is_required: boolean
  urutan: number
  /** Wajib diisi ketika tipe_input = DROPDOWN */
  options?: IOptionItem[]
}

/** Request body untuk PUT /eoffice/template-surat/section-fields/:id — kirim array langsung */
export type ISectionFieldsUpdatePayload = ISectionFieldItem[]

/** Response dari PUT /eoffice/template-surat/section-fields/:id */
export interface ISectionFieldsUpdateResponse {
  status: boolean
  message: string
  data: ISectionFieldItem[]
}
