import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../apis/config";
import "./CampaignForm.css";
export const CampaignForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  let navigate = useNavigate();
  let handleCreate = (formValues) => {
    setIsLoading(true);
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (image) formData.append("image", image);

    axiosInstance
      .post("projects/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setIsLoading(false);
       
        localStorage.setItem("newCampaignAdded", "true");
        navigate("/");
      })
      .catch((res) => {
        alert(`Failed to create campaign.\n${res.response.data.error}`);
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
    end_date: Yup.date()
      .required("End date is required")
      .test(
        'is-future-date',
        'End date cannot be in the past',
        function(value) {
          if (!value) return false;
          // Compare only the date part, not time
          const today = new Date();
          today.setHours(0,0,0,0);
          const endDate = new Date(value);
          endDate.setHours(0,0,0,0);
          return endDate >= today;
        }
      ),
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
    <div className="campaignform-bg">
      <div className="campaign-card green campaignform-card">
        <div className="campaignform-header">
          <h2 className="campaignform-title">Add New Campaign</h2>
        </div>
        <div className="campaignform-body">
          <form onSubmit={formik.handleSubmit} className="campaignform-form">
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
              <label htmlFor="floatingTitle">Title</label>
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
                id="floatingDescription"
                placeholder="ex.animal help description"
              />
              <label htmlFor="floatingDescription">Description</label>
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
              <label htmlFor="floatingTargetAmount">Target Amount</label>
            </div>
            {formik.errors.target_amount && formik.touched.target_amount && (
              <div className="alert alert-danger">
                {formik.errors.target_amount}
              </div>
            )}

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
              <label htmlFor="floatingStartDate">Start Date</label>
            </div>
            {formik.errors.start_date && formik.touched.start_date && (
              <div className="alert alert-danger">{formik.errors.start_date}</div>
            )}

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

            <div className="mb-4">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="btn-countdown-camp"
              disabled={isloading}
            >
              {isloading ? <span className="spinner"></span> : "Add"}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
