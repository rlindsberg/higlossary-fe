export interface Definition {
  author: string;
  createdAt: string;
  description: string;
  id: number;
  uuid: string;
}

export interface Term {
  createdAt: Date;
  definitions: Array<Definition>;
  id: number;
  uuid: string;
  term: string;
}
