import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../apis/config";
import "../CreateCampaign/CampaignForm.css";

export const CampaignEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    target_amount: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    axiosInstance
      .get(`projects/${id}/`)
      .then((res) => {
        const data = res.data;
        setInitialValues({
          title: data.title || "",
          description: data.description || "",
          target_amount: data.target_amount || "",
          start_date: data.start_date || "",
          end_date: data.end_date || "",
        });
      })
      .catch((err) => {
        console.error("Failed to load campaign:", err);
        alert("Failed to load campaign.");
      });
  }, [id]);

  const handleUpdate = (formValues) => {
    setIsLoading(true);
    axiosInstance
      .put(`projects/${id}/update/`, formValues)
      .then((res) => {
        setIsLoading(false);
        navigate(`/campaign-details/${id}`);
      })
      .catch((err) => {
        alert(`Failed to update campaign.\n${err.response?.data?.error || ""}`);
        setIsLoading(false);
      });
  };

  const campaignValidationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(3, "Description must be at least 3 characters"),
    target_amount: Yup.number()
      .required("Target amount is required")
      .positive("Amount must be positive")
      .typeError("Amount must be a number"),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date().required("End date is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: campaignValidationSchema,
    onSubmit: handleUpdate,
  });

  return (
    <div className="campaignform-bg">
      <div className="campaignform-card">
        <div className="campaignform-header">
          <h2 className="campaignform-title">Edit Campaign</h2>
        </div>
        <div className="campaignform-body">
          <form className="campaignform-form" onSubmit={formik.handleSubmit}>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
            />
            {formik.errors.title && formik.touched.title && (
              <div className="alert-danger">{formik.errors.title}</div>
            )}

            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              type="text"
              name="description"
              className="form-control"
              placeholder="Description"
            />
            {formik.errors.description && formik.touched.description && (
              <div className="alert-danger">{formik.errors.description}</div>
            )}

            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.target_amount}
              name="target_amount"
              type="number"
              className="form-control"
              placeholder="Target Amount"
            />
            {formik.errors.target_amount && formik.touched.target_amount && (
              <div className="alert-danger">{formik.errors.target_amount}</div>
            )}

            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.start_date}
              name="start_date"
              type="date"
              className="form-control"
              placeholder="Start Date"
            />
            {formik.errors.start_date && formik.touched.start_date && (
              <div className="alert-danger">{formik.errors.start_date}</div>
            )}

            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.end_date}
              name="end_date"
              type="date"
              className="form-control"
              placeholder="End Date"
            />
            {formik.errors.end_date && formik.touched.end_date && (
              <div className="alert-danger">{formik.errors.end_date}</div>
            )}

            <button
              type="submit"
              className="btn-countdown-camp"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                "Update Campaign"
              )}
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/")}
              disabled={isLoading}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
