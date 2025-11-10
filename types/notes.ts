export interface Note {
  _id: string;
  title: string;
  description: string;
  emotions: { _id: string; title: string }[]; // або Emotion[]
  createdAt?: string;
  updatedAt?: string;
}
