export class User {
  id!: string;
  email!: string;
  name!: string;
  // passwordはセキュリティの観点からエンティティには入れない

  constructor(data: User) {
    Object.assign(this, data);
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }
}