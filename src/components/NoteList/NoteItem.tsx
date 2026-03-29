import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import {
  FiChevronDown,
  FiChevronRight,
  FiFile,
  FiMoreHorizontal,
  FiPlus,
  FiTrash2,
} from 'react-icons/fi';
import Item from '../SideBar/Item';
import type { Note } from '../../modules/notes/note.entity';
import { noteRepository } from '../../modules/notes/note.repository';
import { useState } from 'react';
import type { IconType } from 'react-icons';
import { useNotes } from '../../modules/notes/noteHook';

type Props = {
  note: Note;
  layer: number;
}

export default function NoteItem(props: Props) {
  const { notes, setNotes } = useNotes();
  const [isHovered, setIsHovered] = useState(false);

  // 子ノート展開アイコン取得
  const getIcon = (): IconType => {
    return isHovered ? FiChevronRight : FiFile;
  }

  // ノート削除
  const deleteNote = async() => {
    await noteRepository.delete(props.note.id);
    setNotes(notes!.filter(n => n.id !== props.note.id));
  }

  // 子ノート作成
  const createChildNote = async() => {
    const newChildNote = await noteRepository.create({ parentId: props.note.id });
    setNotes([newChildNote, ...(notes ?? [])]);
  }

  // 子ノート一覧取得
  const getChildren = async (note: Note) => {
    const children = await noteRepository.getChildren(note.id);
    if (!children) return;
    setNotes([...children, ...(notes ?? [])]);
  }

  const menu = (
    <div className='note-item-menu-container'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='note-item-menu-button' role='button'>
            <FiMoreHorizontal className='note-item-menu-icon' size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className='note-item-dropdown'
          align='start'
          side='right'
          forceMount
        >
          <DropdownMenuItem onClick={deleteNote}>
            <FiTrash2 className='note-item-delete-icon' size={16} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className='note-item-menu-button' role='button' onClick={createChildNote}>
        <FiPlus className='note-item-menu-icon' size={16} />
      </div>
    </div>
  );

  return (
    <div
      role='button' style={{ paddingLeft: `${12 + props.layer * 12}px`}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Item
        label={props.note.title ?? '無題'}
        icon={getIcon()}
        trailingItem={menu}
        onIconClick={() => getChildren(props.note)}
      />
    </div>
  );
}
