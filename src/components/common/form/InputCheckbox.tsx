/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Fragment, type ReactNode } from "react"
import clsx from "clsx"
import { cn } from "@/lib/utils"
import { useMobile } from "@/utils/useMobile"
import type { UseFormReturn } from "react-hook-form"
import type { ResReferensiType } from "@/interface/select"

export function InputCheckbox({
  form,
  label,
  name,
  className,
  isDisabled,
  isRow,
  data,
  
  heightInput,
  styleForm,
  isRequired,
  isSingle = false,isGrid // ✅ new prop
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  name: string
  className?: string
  isDisabled?: boolean
  isRow?: boolean
  data: ResReferensiType[]
  defaultValue?: ResReferensiType[] | ResReferensiType | boolean
  heightInput?: string
  styleForm?: React.CSSProperties
  isRequired?: boolean
  isSingle?: boolean
  isGrid?:boolean // ✅ true = hanya bisa pilih 1 value (boolean/single)
}) {
  const { isMobile } = useMobile()

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(`flex w-full ${className}`, {
            "flex-row items-start gap-8": isRow && !isMobile,
            "flex-col gap-0": !isRow || isMobile,
          })}
          style={styleForm}
        >
          {label && (
            <FormLabel
              className={clsx("text-md whitespace-pre-line", {
                "w-full max-w-[200px]": isRow && label && !isMobile,
                hidden: isRow && !label,
                "w-full": isMobile,
              })}
            >
              {label}
              {isRequired && <span className="text-red-500"> *</span>}
            </FormLabel>
          )}

          <div
            className={clsx(`flex flex-col gap-3`, {
              "w-full": isMobile,
              "phones:w-full": isRow && label && !isMobile,
              "w-full phones:w-full": isRow && !label && !isMobile,
            })}
          >
            <div
              className={cn(`${isGrid?"grid grid-cols-2 gap-4":"flex w-full flex-wrap items-center gap-6"}`)}
            >
              {data?.map((item, idx) => (
                <Fragment key={idx}>
                  <label
                    className={cn("flex items-center gap-3", heightInput ?? "")}
                  >
                    <FormControl>
                      <Checkbox
                        disabled={isDisabled}
                        checked={
                          isSingle
                            ? field.value === item.value // ✅ hanya 1 yang aktif
                            : field.value?.includes?.(item.value)
                        }
                        onCheckedChange={(checked) => {
                          if (isSingle) {
                            // ✅ Mode Single (boolean/string)
                            field.onChange(checked ? item.value ?? true : "")
                          } else {
                            // ✅ Mode Multiple (array)
                            const newValue = checked
                              ? [...(field.value || []), item.value]
                              : field.value?.filter(
                                  (v: any) => v !== item.value
                                )
                            field.onChange(newValue)
                          }
                        }}
                        className="h-5 w-5"
                      />
                    </FormControl>
                    <p className="text-nowrap whitespace-pre-line">{item.label}</p>
                  </label>
                </Fragment>
              ))}
            </div>
            <FormMessage className="text-nowrap" />
          </div>
        </FormItem>
      )}
    />
  )
}
