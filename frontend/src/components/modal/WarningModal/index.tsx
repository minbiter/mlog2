/** @jsxImportSource @emotion/react */

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
  closeWarningModal(): void;
  callback(): void;
}

const WarningModal = ({
  msg,
  closeWarningModal,
  callback,
  closeMsg,
  callbackMsg,
}: IWarningModal) => {
  return (
    <div css={modal}>
      <div css={dimmed}></div>
      <div css={container}>
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
