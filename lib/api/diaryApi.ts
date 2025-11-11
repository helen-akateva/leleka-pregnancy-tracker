import { nextServerApi } from "./api";

interface FetchNotesParams {
  page?: number;
  limit?: number;
}

interface Emotion {
  _id: string;
  title: string;
}

export interface DiaryNote {
  _id: string;
  title: string;
  date: string;
  emotions: Emotion[];
  description: string;
}

export interface FetchNotesResponse {
  diaryNotes: DiaryNote[];
  totalCount: number;
  totalPages: number;
  page: number;
}

interface NoteDiaryProps {
  title: string;
  description: string;
  emotions: string[];
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  console.log(params);
  const response = await nextServerApi.get<FetchNotesResponse>(`/diary`, {
    params: params,
  });
  return response.data;
};

export const createNote = async (note: NoteDiaryProps): Promise<DiaryNote> => {
  const { title, description, emotions } = note;
  const response = await nextServerApi.post<DiaryNote>("/diary", {
    title,
    description,
    emotions,
  });
  return response.data;
};

export const updateNote = async (
  id: string,
  note: NoteDiaryProps
): Promise<DiaryNote> => {
  console.log(note);
  const response = await nextServerApi.patch<DiaryNote>(`/diary/${id}`, note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  console.log(id);
  const response = await nextServerApi.delete(`/diary/${id}`, {
    params: { noteId: id },
  });
  return response.data;
};
