export interface Datum {
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}
export type PutDatum = Pick<Datum, "author" | "content" | "_id">;
export type PostDatum = Pick<Datum, "author" | "content">;

export const getData = async () => {
  const result = await fetch(`http://localhost:3000/data`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = (await result.json()) as Datum[];
  return json;
};

export const submitData = async (data: PostDatum) => {
  await fetch(`http://localhost:3000/data`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const editData = async (data: PutDatum) => {
  await fetch(`http://localhost:3000/data`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deleteData = async (id: string) => {
  await fetch(`http://localhost:3000/data/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
