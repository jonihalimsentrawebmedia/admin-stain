/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Fragment, type ReactNode } from "react";
import clsx from "clsx";

import { useMobile } from "@/utils/useMobile";
import { cn } from "@/lib/utils";
import type { UseFormReturn } from "react-hook-form";
import type { ResReferensiType } from "@/interface/select";
import { Input } from "./Input";

export function InputRadio({
  form,
  label,
  name,
  className,
  isDisabled,
  isRow,
  data,
  defaultValue,
  heightInput,
  styleForm,
  isRequired,
}: {
  form: UseFormReturn | undefined | any;
  label?: string | ReactNode;
  name: string;
  className?: string;
  isDisabled?: boolean;
  isRow?: boolean;
  data: ResReferensiType[];
  defaultValue?: ResReferensiType;
  heightInput?: string;
  styleForm?: React.CSSProperties;
  isRequired?: boolean;
}) {
  const { isMobile } = useMobile();
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(`flex w-full ${className}`, {
            "flex-row items-center gap-8": isRow && !isMobile,
            "flex-col gap-0": !isRow || isMobile,
          })}
          style={styleForm}
        >
          {label && (
            <FormLabel
              className={clsx("text-wrap text-[#464646] font-normal", {
                "w-full max-w-[200px]": isRow && label && !isMobile,
                hidden: isRow && !label,
                "w-full": isMobile,
              })}
            >
              {label} {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <div
            className={clsx(`flex flex-col gap-3 `, {
              "w-full": isMobile,
              " phones:w-full": isRow && label && !isMobile,
              "w-full phones:w-full": isRow && !label && !isMobile,
            })}
          >
            <div className={`flex w-full items-center gap-6 `}>
              {data?.map((item, idx) => (
                <Fragment key={idx}>
                  <label
                    className={`flex items-center gap-3 ${heightInput ?? ""}`}
                  >
                    <Input
                      type="radio"
                      value={item?.value}
                      checked={field.value === item?.value}
                      onChange={() => field.onChange(item?.value)}
                      disabled={isDisabled}
                      defaultValue={defaultValue?.value}
                      className="h-5 w-5"
                    />
                    <p className="text-nowrap">{item?.label}</p>
                  </label>
                </Fragment>
              ))}
            </div>
            <FormMessage className="text-nowrap" />
          </div>
        </FormItem>
      )}
    />
  );
}
