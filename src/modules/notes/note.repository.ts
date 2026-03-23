import api from "../../lib/api";
import { Note } from "./note.entity";

export const noteRepository = {
  // ノート新規作成
  async create(params: { title?:string; parentId?: number }): Promise<Note> {
    const result = await api.post('/notes', {
      title: params.title ?? '無題',
      parentId: params.parentId
    });

    return new Note(result.data);
  }
}