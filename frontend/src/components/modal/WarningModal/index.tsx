/** @jsxImportSource @emotion/react */
import LoadingSpinner from "components/LoadingSpinner";
import {
  modal,
  dimmed,
  container,
  msgItem,
  callbackBtn,
  closeBtn,
} from "./style";

interface IWarningModal {
  msg: string;
  callbackMsg: string;
  closeMsg: string;
  submitLoading: boolean;
  closeWarningModal(): void;
  callback(): void;
}

const WarningModal = ({
  msg,
  closeWarningModal,
  callback,
  closeMsg,
  callbackMsg,
  submitLoading,
}: IWarningModal) => {
  return (
    <div css={modal}>
      <div css={dimmed}></div>
      <div css={container}>
        {submitLoading ? <LoadingSpinner /> : null}
        <p css={msgItem}>{msg}</p>
        <div>
          <button onClick={callback} css={callbackBtn}>
            {callbackMsg}
          </button>
          <button onClick={closeWarningModal} css={closeBtn}>
            {closeMsg}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
