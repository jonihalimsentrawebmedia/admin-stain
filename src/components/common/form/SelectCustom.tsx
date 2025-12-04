import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Select from "react-select";
import clsx from "clsx";
import { cn } from "@/lib/utils";

import { useMobile } from "@/utils/useMobile";
import { useSearchParams } from "react-router-dom";
import type { UseFormReturn } from "react-hook-form";
import { customStyles, type ResReferensiType } from "@/interface/select";

interface inputProps {
  name: string;
  placeholder: string;
  label?: string;
  isDisabled?: boolean;
  className?: string;
  inputClassName?: string;
  inputClassNameParent?: string;
  level1?: boolean;
  level2?: boolean;
  level3?: boolean;
  level4?: boolean;
  level5?: boolean;
  level6?: boolean;
  form?: UseFormReturn | any | undefined;
  data: ResReferensiType[];
  defaultValues?: ResReferensiType;
  isRow?: boolean;
  isMulti?: boolean;
  isFilter?: boolean;
  menuPortalTarget?: boolean | any;
  fx?: (selectedOption: ResReferensiType) => void;
  zindex?: number;
  bgColor?: string;
}

export function SelectCustom({
  name,
  label,
  placeholder,
  isDisabled,
  form,
  className,
  data,
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  defaultValues,
  isRow,
  isMulti,
  menuPortalTarget,
  fx,
  isFilter,
  inputClassName,
  inputClassNameParent,
  zindex,
  bgColor,
}: inputProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useMobile();
  const zIndex = zindex
    ? `z-[${zindex}]`
    : level1
    ? "z-50"
    : level2
    ? "z-40"
    : level3
    ? "z-30"
    : level4
    ? "z-20"
    : level5
    ? "z-10"
    : level6
    ? "z-[5]"
    : "z-0";

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem
          className={cn(
            `flex w-full`,
            {
              "flex-row items-center gap-8": isRow && !isMobile,
              "flex-col gap-0": !isRow || isMobile,
              className,
              zIndex,
            },
            className
          )}
        >
          {label && (
            <FormLabel
              className={clsx("text-wrap text-[#464646] font-normal", {
                "w-full max-w-[200px]": isRow && label && !isMobile,
                hidden: isRow && !label,
                "w-full": isMobile,
              })}
            >
              {label}
            </FormLabel>
          )}

          <div
            className={cn(
              "flex flex-col gap-3 w-full",
              {
                "w-full": isMobile,
                "w-full ": isRow && label && !isMobile,
                "w-full md:w-full": !isRow,
              },
              inputClassNameParent
            )}
          >
            <FormControl>
              <Select
                menuPortalTarget={menuPortalTarget && document.body}
                {...field}
                styles={{
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: menuPortalTarget ? 99 : base.zIndex,
                     maxWidth:"300px",
                  }),
                  ...customStyles,
                  control: (provided) => ({
                    ...provided,
                    // zIndex: 9999,
                    minHeight: "48px", // ubah dari height tetap ke minHeight
                    backgroundColor: isDisabled
                      ? "#e5e7eb"
                      : bgColor
                      ? bgColor
                      : "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "0.5rem",
                  
                    boxShadow: "none",
                    flexWrap: "wrap", // penting agar chip hasil pilihan bisa turun ke baris baru
                    "&:hover": {
                      borderColor: "#0E874E",
                    },
                  }),
                  valueContainer: (provided) => ({
                    ...provided,
                    flexWrap: "wrap",
                    maxHeight: "auto",
                    overflowY: "auto",
                    alignItems: "flex-start", // agar tag bisa ke atas bukan center
                    paddingTop: "4px",
                    paddingBottom: "4px",
                     maxWidth:"300px",
                  }),
                  multiValue: (provided) => ({
                    ...provided,
                    margin: "2px",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#0E874E",
                  }),
                  input: (provided) => ({
                    ...provided,
                    color: "#0E874E",
                    padding: 0,
                    margin: 0,
                  
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    padding: 0,
                    maxHeight: "200px",
                    overflowY: "auto",
                    borderRadius: "0.5rem",
                  
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused
                      ? "#f1f5f9"
                      : "transparent",
                    color: "#0E874E",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                  
                  }),
                }}
                className={clsx("", zIndex, inputClassName)}
                options={data}
                defaultValue={defaultValues}
                isMulti={isMulti}
                value={
                  isMulti
                    ? data?.filter((item) => field.value?.includes(item.value))
                    : data?.find((item) => item.value === field.value)
                }
                placeholder={placeholder ?? "Select an option"}
                onChange={(selectedOption: any) => {
                  if (name === "id_level" && isFilter) {
                    const newParams = new URLSearchParams(searchParams);
                    if (selectedOption) {
                      newParams.set("id_level", selectedOption?.value);
                    } else {
                      newParams.delete("id_level");
                    }
                    newParams.set("page", "1"); // reset ke page 1 saat ganti filter
                    setSearchParams(newParams);
                  }
                  if (name === "id_pt" && isFilter) {
                    const newParams = new URLSearchParams(searchParams);
                    if (selectedOption) {
                      newParams.set("id_pt", selectedOption?.value);
                    } else {
                      newParams.delete("id_pt");
                    }
                    newParams.set("page", "1"); // reset ke page 1 saat ganti filter
                    setSearchParams(newParams);
                  }
                  if (name === "status" && isFilter) {
                    const newParams = new URLSearchParams(searchParams);
                    if (selectedOption) {
                      newParams.set("status", selectedOption?.value);
                    } else {
                      newParams.delete("status");
                    }
                    newParams.set("page", "1"); // reset ke page 1 saat ganti filter
                    setSearchParams(newParams);
                  }
                  if (name === "id_level" && !isFilter) {
                    form.setValue("id_unit", undefined);
                  }
                  if (isMulti) {
                    const selectedValues = selectedOption
                      ? selectedOption.map(
                          (option: ResReferensiType) => option.value
                        )
                      : [];
                    const selectedLabels = selectedOption
                      ? selectedOption.map(
                          (option: ResReferensiType) => option.label
                        )
                      : [];
                    field.onChange(selectedValues);
                    form.setValue(name, selectedValues);
                    form.setValue(`detail_${name}`, selectedLabels);
                  } else {
                    const value = selectedOption?.value || "";
                    field.onChange(value);
                    form.setValue(name, value);
                    form.setValue(
                      `detail_${name}`,
                      selectedOption?.label || ""
                    );
                  }

                  if (fx) fx(selectedOption);
                }}
                isDisabled={isDisabled}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
