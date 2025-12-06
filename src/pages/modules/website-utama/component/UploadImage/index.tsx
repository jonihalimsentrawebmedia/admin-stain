import React, { useRef } from 'react'
import { BiSolidImageAdd } from 'react-icons/bi'

interface Props {
  name: string
  label: string
  placeholder: string
  isrequired?: boolean
  form?: any
}

export const UploadImageBasic: React.FC<Props> = (props) => {
  const { label, placeholder, isrequired } = props
  const uploadRef = useRef<null | any>(null)

  const HandleUpload = (e: FileList | null) => {
    if (e) {
      const file = e[0]
      const formData = new FormData()
      formData.append('berkas', file)
    }
  }

  return (
    <>
      <label htmlFor="upload">
        {label}
        {isrequired && <span className={'text-red-500'}>*</span>}
      </label>
      <input
        type="file"
        hidden
        id="upload"
        ref={uploadRef}
        onChange={(e) => HandleUpload(e.target.files)}
      />
      <div
        className="bg-primary-foreground border border-primary w-[512px] h-[191.2px] rounded mt-2 flex flex-col items-center justify-center"
        onClick={() => uploadRef.current?.click()}
      >
        <BiSolidImageAdd className={'text-primary size-8'} />
        <p className="text-xs text-primary font-semibold">{placeholder}</p>
        <p className="text-gray-500 text-sm">Max 5 MB</p>
        <p className="text-gray-500 text-sm">PNG, JPG, JPEG</p>
      </div>
    </>
  )
}
