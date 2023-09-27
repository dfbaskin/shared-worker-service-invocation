interface Props {
  text: string | string[];
  onClick: () => void;
}

export function CallButton({ text, onClick }: Props) {
  const buttonText = Array.isArray(text) ? text.join(' » ') : text;
  return (
    <button type="button" onClick={onClick}>
      {buttonText}
    </button>
  );
}
