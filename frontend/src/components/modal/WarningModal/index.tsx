interface IWarningModal {
  msg: string;
  closeWarningModal(): void;
  callback(): void;
}

const WarningModal = ({ msg, closeWarningModal, callback }: IWarningModal) => {
  return (
    <div>
      <p>{msg}</p>
      <button onClick={callback}>확인</button>
      <button onClick={closeWarningModal}>취소</button>
    </div>
  );
};

export default WarningModal;
