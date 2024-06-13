import React from "react";
import { termsOfUseText } from "../SignUpData";
import Popup from "../../../components/popup/Popup";

const TermsOfUse = ({ isOpen, onClose }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} title="Terms of Use">
      <div dangerouslySetInnerHTML={{ __html: termsOfUseText }} />
    </Popup>
  );
};

export default TermsOfUse;
