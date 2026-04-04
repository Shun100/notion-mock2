import { useEffect, useState } from "react";

type Props = {
  initialTitle: string,
  onTitleChange: (newTitle: string) => void;
}

export default function TitleInput({ initialTitle, onTitleChange }: Props) {
  console.log(initialTitle);
  const [title, setTitle] = useState(initialTitle);

  // initialTitleが更新される度に、titleを更新して再レンダリング
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  return (
    <div className='title-input-container'>
      <textarea
        className='title-input'
        value={title}
        onChange={e => {
          setTitle(e.target.value);
          onTitleChange(e.target.value);
        }} />
    </div>
  );
}
