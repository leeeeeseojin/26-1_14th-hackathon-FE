import { useState } from "react";

import FormCard from "../../../components/form-card/FormCard";
import FormField from "../../../components/form-field/FormField";

import "./RecordInputCard.css";

const RecordInputCard = () => {
  const [bloodSugar, setBloodSugar] = useState("");
  const [memo, setMemo] = useState("");

  return (
    <FormCard>
      <div className="record-input-card">
        <FormField
          label="측정 혈당 (mg/dL, 선택)"
          htmlFor="blood-sugar"
        >
          <input
            id="blood-sugar"
            className="record-input-card__input"
            type="number"
            placeholder="예: 118"
            value={bloodSugar}
            onChange={(event) =>
              setBloodSugar(event.target.value)
            }
          />
        </FormField>

        <FormField
          label="메모 (선택)"
          htmlFor="memo"
        >
          <textarea
            id="memo"
            className="record-input-card__textarea"
            placeholder="예: 고추장 반만 넣음"
            value={memo}
            onChange={(event) =>
              setMemo(event.target.value)
            }
          />
        </FormField>
      </div>
    </FormCard>
  );
};

export default RecordInputCard;