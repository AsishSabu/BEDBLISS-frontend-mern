import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axios from "axios";
import useSWR from "swr";
import { ADMIN_API } from "../../constants";
import showToast from "../../utils/toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const Categories: React.FC = () => {
  const { data, error } = useSWR(`${ADMIN_API}/stayTypes`, fetcher);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data]);

  const handleListing = async (id: string) => {
    try {
      const result = await axios.post(`${ADMIN_API}/stayTypeListing/${id}`);
      if (result.status === 200) {
        setCategories(prevCategories =>
          prevCategories.map(category =>
            category._id === id
              ? { ...category, isListed: !category.isListed }
              : category
          )
        );
        showToast(result.data.message, "success");
      } else {
        showToast(result.data.message, "error");
      }
    } catch (error) {
      console.error("Error updating stay type listing status:", error);
    }
  };

  const handleSubmit = async (
    values: { name: string },
    { resetForm }: any
  ) => {
    try {
      const result = await axios.post(`${ADMIN_API}/addStayType`, values);
      if (result.status === 200) {
        setCategories(prevCategories => [...prevCategories, result.data.result]);
        showToast(result.data.message, "success");
        resetForm();
      } else {
        showToast(result.data.message, "error");
      }
    } catch (error:any) {
      showToast(error?.response?.data?.message, "error");
    }
  };

  if (error) {
    return <div>Error loading categories.</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("Name is required")
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be less than 50 characters"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="flex mb-4">
          <Field
            name="name"
            type="text"
            className="w-60 block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
          <ErrorMessage name="name" component="div" className="text-red-600" />
          <button
            type="submit"
            className="mb-2 text-sm font-medium bg-Marine_blue text-white flex justify-center align-middle rounded-md text-center px-3 py-2"
          >
            ADD
          </button>
        </Form>
      </Formik>
      {categories.length > 0 ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {categories.map(category => (
              <Table.Row
                key={category._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {category.name}
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        category.isListed ? "bg-green-400" : "bg-red-500"
                      }`}
                    ></div>
                    <p>{category.isListed ? "Listed" : "Unlisted"}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <label className="flex cursor-pointer select-none items-center">
                    <div className="relative">
                      <input
                        title="title"
                        type="checkbox"
                        checked={category.isListed}
                        onChange={() => handleListing(category._id)}
                        className="sr-only"
                      />
                      <div
                        className={`box block h-6 w-10 rounded-full ${
                          category.isListed ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
                          category.isListed ? "translate-x-full" : ""
                        }`}
                      ></div>
                    </div>
                  </label>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <div className="text-center py-4">No categories listed.</div>
      )}
    </div>
  );
};

export default Categories;
