import { useState } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { noteRepository } from '../modules/notes/noteRepository';
import type { Note } from '../modules/notes/noteEntity';

type Props = {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);

  const searchNotes = async (keyword: string) => {
    if (keyword !== '') {
      const result: Note[] = await noteRepository.search(keyword);
      setNotes(result);
    }
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder={'キーワードで検索'}
          onValueChange={async (value) => {
            await searchNotes(value);
          }}
        />
        <CommandList>
          <CommandEmpty>条件に一致するノートがありません</CommandEmpty>
          <CommandGroup>
            {
              notes.map(n => <CommandItem key={crypto.randomUUID()}><span>{n.title}</span></CommandItem>)
            }
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
