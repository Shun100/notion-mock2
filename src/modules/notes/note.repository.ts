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
  },

  // ノート一覧取得
  async getAll(options?:{ parentId?: number}): Promise<Note[]> {
    const result = await api.get('/notes',
      // クエリパラメータはこのように'params'をキーにしたオブジェクトで定義する
      {
        params: {
          parentId: options?.parentId,
        }
      }
    );

    return result.data.notes.map((note: Note) => new Note(note));
  },

  // ノート削除
  async delete(id: number): Promise<void> {
    await api.delete(`/notes/${id}`);
  }
}