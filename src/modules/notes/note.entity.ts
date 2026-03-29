export class Note {
  id!: number;
  userId!: string;
  title!: string;
  content: string | null = null;
  parentId: number | null = null; // 親ノートのID
  createdAt!: Date;

  constructor(data: Note) {
    Object.assign(this, data);

    /*
     * 文字列から日付型への変換が必要
     * 変換しないと、createdAt: "2026-03-23T10:00:00.000Z" のようにただの文字列が入る
     * Object.assignでは、TypeScriptは型安全を保障しないため、このようなことが起こる
     */
    this.createdAt = new Date(data.createdAt);
  }
}