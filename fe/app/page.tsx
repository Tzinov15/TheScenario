"use client";

import { useEffect, useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { Datum, PutDatum, deleteData, editData, getData, submitData } from "./api-service";
import { Button, DateDisplay, TableHeading } from "./components";

export default () => {
  const [state, setState] = useState<Datum[]>();
  const [loadData, setLoadData] = useState(true);
  const [editMode, setEditMode] = useState<false | PutDatum>(false);

  const fetchData = async () => {
    const data = await getData();
    setState(data);
  };

  useEffect(() => {
    if (!loadData) return;
    setLoadData(false);
    getData().then((res) => {
      setState(res);
    });
  }, [loadData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>

      {!state ? null : (
        <div className="flex w-full flex-col justify-between ">
          <div className="grid w-full grid-cols-5">
            <TableHeading>created at</TableHeading>
            <TableHeading>updated at</TableHeading>
            <TableHeading>content</TableHeading>
            <TableHeading>author</TableHeading>
            <TableHeading>actions</TableHeading>
          </div>
          {state.length === 0 ? (
            <p className="flex w-full items-center text-center justify-center text-xl my-8 text-slate-500 ">
              We see no data, create some items to see data here
            </p>
          ) : null}
          <div
            className="flex w-full flex-col items-center divide-y divide-slate-700 shadow-xl"
            style={{
              maxHeight: "50vh",
              overflowY: "scroll",
            }}
          >
            {state.map((datum) => {
              const { createdAt, updatedAt, content, _id, author } = datum;
              return (
                <div className="grid w-full grid-cols-5 py-2">
                  <DateDisplay date={new Date(createdAt)} />
                  <DateDisplay date={new Date(updatedAt)} />
                  <span className="flex flex-col items-center">{content}</span>
                  <span className="flex flex-col items-center">{author}</span>
                  <div className="flex flex-row justify-center">
                    <Button
                      appearance="danger"
                      onClick={async () => {
                        const confirm = window.confirm(
                          "Are you sure you would like to delete this?"
                        );
                        if (confirm) {
                          await deleteData(_id);
                          await fetchData();
                        }
                      }}
                    >
                      delete
                    </Button>
                    <Button
                      appearance="secondary"
                      disabled={editMode && editMode._id !== _id}
                      onClick={() => {
                        if (editMode) {
                          setEditMode(false);
                        } else {
                          setEditMode({ author, content, _id });
                        }
                      }}
                    >
                      {editMode && editMode._id === _id ? "cancel" : "edit"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Formik
        initialValues={
          editMode
            ? { content: editMode.content, author: editMode.author }
            : { content: "", author: "" }
        }
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnChange={false}
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
        onSubmit={async (values, { setSubmitting, resetForm, setTouched }) => {
          if (editMode) {
            await editData({ ...values, _id: editMode._id });
            await fetchData();
            setSubmitting(false);
            setEditMode(false);
            resetForm();
          } else {
            await submitData(values);
            await fetchData();
            setSubmitting(false);
            resetForm();
            setTouched({});
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="text-white my-12">
              <label htmlFor="content">content</label>
              <div className="flex items-center">
                <Field
                  className="text-white block w-full bg-slate-800 rounded-md border-0 py-1.5 px-4   ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  type=""
                  name="content"
                />
                <ErrorMessage name="content" className="text-red-800 ml-4" component="div" />
              </div>
              <label htmlFor="author">author</label>

              <div className="flex items-center">
                <Field
                  className="text-white block w-full bg-slate-800  rounded-md border-0 py-1.5 px-4 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  type=""
                  name="author"
                />
                <ErrorMessage className="text-red-800 ml-4" name="author" component="div" />
              </div>
              <Button type="submit" disabled={isSubmitting} appearance="primary">
                {editMode ? "Update Item" : "Submit"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
};
