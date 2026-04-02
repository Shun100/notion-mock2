import api from "../../lib/api";
import { Note } from "./noteEntity";

export const noteRepository = {
  /**
   * ノート新規登録
   * @param {{ title?: string, parentId?: number | null }} params - タイトルと親ノートIDを保持するオブジェクト
   * @returns { Promise<Note> } - 登録したノートの情報を保持するPromiseオブジェクト
   */
  async create(params: { title?: string; parentId?: number | null }): Promise<Note> {
    const result = await api.post('/notes', {
      title: params.title ?? '無題',
      parentId: params.parentId ?? null,
    });
    return new Note(result.data);
  },

  /**
   * ノート更新
   * @param { number } id - ノートID
   * @param {{ title?: string, content?: string }} note - ノート内容
   * @param note 
   */
  async update (id: number, note: { title: string | null, content: string | null }): Promise<Note> {
    const result = await api.patch(`/notes/${id}`, note);
    return new Note(result.data);
  },

  /**
   * 全ノート一覧取得
   * @returns { Promise<Note[]> } - 全ノート一覧
   */
  async getAll(): Promise<Note[]> {
    const result = await api.get('/notes');
    return result.data.notes.map((note: Note) => new Note(note));
  },

  /**
   * 子ノート一覧取得
   * @param { number } parentId - 親ノートID
   * @returns { Promise<Notes[]> } - 子ノート一覧を保持するPromiseオブジェクト
   */
  async getChildren(parentId: number): Promise<Note[]> {
    // クエリパラメータは'params'をキーにしたオブジェクトで定義する
    const result = await api.get('/notes', { params: { parentId } });
    return result.data.notes.map((note: Note) => new Note(note));
  },

  /**
   * IDによるノート取得
   * @param { number } id - ノートのID
   * @return { Promise<Note> } - 取得したノートを保持するPromiseオブジェクト
   */
  async getById(id: number): Promise<Note> {
    const result = await api.get(`/notes/${id}`);
    return new Note(result.data);
  },

  /**
   * ノート削除
   * @param { number } id - ノートID
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/notes/${id}`);
  }
}