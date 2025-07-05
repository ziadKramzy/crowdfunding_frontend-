import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../apis/config";

export const CampaignEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userLogin } = useContext(UserContext);
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
    const token = localStorage.getItem("userToken");
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
    const token = localStorage.getItem("userToken");
    setIsLoading(true);
    axiosInstance
      .put(`projects/${id}/update/`, formValues)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        navigate(`/campaign-details/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        alert(`Failed to update campaign.\n${err.response.data.error}`);
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
    <>
      <h2 className="text-dark text-center mb-5">Edit Campaign</h2>
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

        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 text-white"
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Update Campaign"
          )}
        </button>
      </form>
    </>
  );
};
