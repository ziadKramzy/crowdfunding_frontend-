import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/config";

export const CampaignForm = () => {
  const [isloading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let handleCreate = (formValues) => {
    const token = localStorage.getItem("userToken");

    setIsLoading(true);
    axiosInstance
      .post("projects/create/", formValues)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        localStorage.setItem("newCampaignAdded", "true");
        navigate("/");
      })
      .catch((res) => {
        alert(`Failed to create campaign.\n${res.response.data.error}`);
        console.log(res);
        setIsLoading(false);
      });
  };

  const campaignValidationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),
    description: Yup.string()
      .required("description is required")
      .min(3, "description must be at least 3 characters"),
    target_amount: Yup.number()
      .required("target amount is required")
      .positive("Amount must be positive")
      .typeError("Amount must be a number"),
  });
  let formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      target_amount: "",
      start_date: "",
      end_date: "",
    },
    validationSchema: campaignValidationSchema,
    onSubmit: handleCreate,
  });

  return (
    <>
      <h2 className="text-dark  text-center mb-5 mt-5">Add New Campaign</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            type="text"
            name="title"
            className="form-control"
            id="floatingTitle"
            placeholder="ex.animal help"
          />
          <label htmlFor="floatingName">Title</label>
        </div>
        {formik.errors.title && formik.touched.title && (
          <div className="alert alert-danger">{formik.errors.title}</div>
        )}

        <div className="form-floating mb-3">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            type="text"
            name="description"
            className="form-control"
            id="floatingLDescription"
            placeholder="ex.animal help description"
          />
          <label htmlFor="floatingLastName">Description</label>
        </div>
        {formik.errors.description && formik.touched.description && (
          <div className="alert alert-danger">{formik.errors.description}</div>
        )}

        <div className="form-floating mb-4">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.target_amount}
            name="target_amount"
            type="number"
            className="form-control"
            id="floatingTargetAmount"
            placeholder="ex.30000"
          />
          <label htmlFor="floatingtArgetAmount">Target Amount</label>
        </div>
        {formik.errors.target_amount && formik.touched.target_amount && (
          <div className="alert alert-danger">
            {formik.errors.target_amount}
          </div>
        )}

        <div>
          <div className="form-floating mb-4">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.start_date}
              name="start_date"
              type="date"
              className="form-control"
              id="floatingStartDate"
              placeholder="ex.2025-10-01"
            />
            <label htmlFor="floatingtStartDate">Start Date</label>
          </div>
          {formik.errors.start_date && formik.touched.start_date && (
            <div className="alert alert-danger">{formik.errors.start_date}</div>
          )}

          <div>
            <div className="form-floating mb-4">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.end_date}
                name="end_date"
                type="date"
                className="form-control"
                id="floatingEndDate"
                placeholder="ex.2026-03-26"
              />
              <label htmlFor="floatingEndDate">End Date</label>
            </div>
            {formik.errors.end_date && formik.touched.end_date && (
              <div className="alert alert-danger">{formik.errors.end_date}</div>
            )}

            <div></div>
          </div>
          <button
            type="submit"
            className="btn btn-info btn-lg w-100 text-white"
          >
            {isloading ? <i className="fas fa-spinner fa-spin"></i> : "Add"}
          </button>
          <button
            className="btn btn-secondary btn-lg w-100 text-white mt-2"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
