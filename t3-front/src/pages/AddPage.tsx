import React from "react";
import { LABELS, ICONS } from "../constants";
import { Button, Input } from "../components";

const AddPage = () => {
  return (
    <div className="p-4">
      <div className="flex items-start mb-2">
        <Button
          variant="noneBgWhite"
          icon={<ICONS.ARROWBACK />}
          className="w-[2rem] h-[2rem] text-xl font-medium text-icon-gray mb-1"
        />
        <p className="text-text-gray text-base font-medium ml-[9rem]">
          {LABELS.PAGE.ADD_SPENDING}
        </p>
      </div>

      <div className="flex items-start justify-between mb-4 mt-4 gap-4">
        <Button variant="outLine">{LABELS.BUTTON.INCOME}</Button>
        <Button variant="grayBg">{LABELS.BUTTON.SPENDING}</Button>
      </div>

      <div className="flex flex-col gap-5">
        <Input
          inputType="input"
          label={LABELS.INPUT.DATE}
          placeholder={LABELS.INPUT.PLACEHOLDER.DATE}
        ></Input>
        <Input
          inputType="input"
          label={LABELS.INPUT.PRICE}
          placeholder={LABELS.INPUT.PLACEHOLDER.PRICE}
        ></Input>
        <Input
          inputType="input"
          label={LABELS.INPUT.CATEGORY}
          placeholder={LABELS.INPUT.PLACEHOLDER.CATEGORY}
        ></Input>
        <Input
          inputType="input"
          label={LABELS.INPUT.DETAIL}
          placeholder={LABELS.INPUT.PLACEHOLDER.DETAIL}
        ></Input>
        <Input
          inputType="input"
          label={LABELS.INPUT.MEMO}
          placeholder={LABELS.INPUT.PLACEHOLDER.MEMO}
        ></Input>
      </div>

      <label className="block text-sm font-medium text-text-primary mb-2 mt-4">
        {LABELS.INPUT.IS_IMPULSIVE_SPENDING}
      </label>

      <div className="flex items-start justify-between gap-4 mb-2">
        <Button variant="outLine">{LABELS.BUTTON.PLANNED_SPENDING}</Button>
        <Button variant="grayBg">{LABELS.BUTTON.IMPULSIVE_SPENDING}</Button>
      </div>

      <Button variant="primary" className="mt-8">
        {LABELS.BUTTON.SAVE}
      </Button>
    </div>
  );
};

export default AddPage;
