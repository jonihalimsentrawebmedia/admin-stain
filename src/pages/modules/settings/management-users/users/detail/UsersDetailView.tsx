import ButtonTitleGroup from "@/components/common/button/ButtonTitleGroup";
import UsersDetailViewModel from "./UsersDetailViewModel";

import DetailField from "@/components/common/field/DetailField";
import CardInput from "@/components/common/card/CardInput";
import ButtonNonActive from "../components/ButtonNonActive";
import ButtonActive from "../components/ButtonActive";
import { returnStatus } from "../utils";

const UsersDetailView = () => {
  const { fieldImage, fieldConfiguration, form, goToEdit } =
    UsersDetailViewModel();
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        isBack
        buttonGroup={[
          {
            label: "",
            onClick: () => { },
            type: "add",
            element: (
              <div className="flex flex-wrap gap-4">
                {returnStatus(form.watch('status'))}
                {form.watch('status') == "Y" ? (
                  <ButtonNonActive />
                ) : (
                  <ButtonActive />
                )}


              </div>
            ),
          },
          {
            label: "Edit Data",
            onClick: () => {
              goToEdit();
            },
            type: "edit",
          },
        ]}
        label="Detail Data Prodi"
      />
      <div className="flex flex-col gap-4">
        <div>
          <DetailField
            data={fieldImage}
            form={form}
            isRowParent
            isRow={false}
          />
        </div>
        <CardInput title="Informasi User">
          <DetailField data={fieldConfiguration} form={form} />
        </CardInput>
      </div>
    </div>
  );
};

export default UsersDetailView;
