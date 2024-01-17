"use client";

import { useEffect, useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { DateDisplay, TableHeading } from "./components";

interface Datum {
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

type PutDatum = Pick<Datum, "author" | "content" | "_id">;
type PostDatum = Pick<Datum, "author" | "content">;

export default () => {
  const revalidatedData = async () => {
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

  const submitData = async (data: PostDatum) => {
    await fetch(`http://localhost:3000/data`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const editData = async (data: PutDatum) => {
    await fetch(`http://localhost:3000/data`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const deleteData = async (id: string) => {
    await fetch(`http://localhost:3000/data/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getData = async () => {
    const data = await revalidatedData();
    setState(data);
  };

  const [state, setState] = useState<Datum[]>();
  const [loadData, setLoadData] = useState(true);
  const [editMode, setEditMode] = useState<false | string>(false);

  useEffect(() => {
    if (!loadData) return;

    setLoadData(false);

    revalidatedData().then((res) => {
      setState(res);
    });
  }, [loadData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          This is a empty shell for a Next.js app.
          <br />
          Libraray's pre-installed to keep things simple:
        </p>
        <ul>
          <li>Tailwind CSS - https://tailwindcss.com/</li>
          <li>Nextui - </li>
          <li>Formik - </li>
        </ul>
        {state && <p>{JSON.stringify(state)}</p>} */}
      </div>

      {!state ? null : (
        <div className="flex w-full flex-col justify-between">
          <div className="grid w-full grid-cols-5">
            <TableHeading>created at</TableHeading>
            <TableHeading>updated at</TableHeading>
            <TableHeading>content</TableHeading>
            <TableHeading>author</TableHeading>
            <TableHeading>actions</TableHeading>
          </div>
          {state.map((datum) => {
            const { createdAt, updatedAt, content, _id, author } = datum;
            return (
              <div className="grid w-full grid-cols-5 py-4">
                <DateDisplay date={new Date(createdAt)} />
                <DateDisplay date={new Date(updatedAt)} />
                <span>{content}</span>
                <span>{author}</span>
                <div>
                  <span
                    onClick={async () => {
                      const confirm = window.confirm("Are you sure you would like to delete this?");
                      if (confirm) {
                        await deleteData(_id);
                        await getData();
                      }
                    }}
                    className="mr-2 text-red-600"
                  >
                    delete
                  </span>
                  <span
                    className="mr-2 text-gray"
                    onClick={() => {
                      if (editMode) {
                        setEditMode(false);
                      } else {
                        setEditMode(_id);
                      }
                    }}
                  >
                    {editMode === _id ? "cancel" : "edit"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Formik
        initialValues={{ content: "", author: "" }}
        validate={(values) => {
          const errors: { content?: string; author?: string } = {};
          if (!values.author) {
            errors.author = "Required";
          }
          if (!values.content) {
            errors.content = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (editMode) {
            await editData({ ...values, _id: editMode });
            await getData();
            setSubmitting(false);
            setEditMode(false);
            resetForm();
          } else {
            await submitData(values);
            await getData();
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="text-white">
            <label htmlFor="content">content</label>
            <Field className="text-black" type="" name="content" />
            <label htmlFor="author">author</label>
            <Field className="text-black" type="" name="author" />
            <ErrorMessage name="author" component="div" />
            <ErrorMessage name="content" component="div" />
            <button type="submit" disabled={isSubmitting}>
              {editMode ? "Update Item" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
};
