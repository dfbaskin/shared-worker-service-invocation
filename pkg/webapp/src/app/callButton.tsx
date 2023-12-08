interface Props {
  text: string | string[];
  onClick: (text: string) => void;
}

export function CallButton({ text, onClick }: Props) {
  const buttonText = Array.isArray(text) ? text.join(' » ') : text;
  return (
    <button type="button" onClick={() => onClick(buttonText)}>
      {buttonText}
    </button>
  );
}
