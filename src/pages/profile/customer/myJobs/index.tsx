import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Link, useParams } from "react-router-dom";
import {
  findCustomerDataByTokenThunk,
  findCustomerThunk,
} from "../../../../features/user/userApi";
import "./style.scss";
import * as Yup from "yup";
import {
  FeedBackJobIdThunk,
  deleteJobsByIdThunk,
  findCustomerDataByTokenJobsThunk,
  findJobsByCustomerIdThunk,
  getJobsByIdThunk,
  getJobsThunk,
  jobsUpdateThunk,
  patchJobsByIdThunk,
} from "../../../../features/jobs/jobsApi";
import { Jobs } from "../../../../type";
import { Formik } from "formik";
import Swal from "sweetalert2";
import { title } from "process";
import { AddFeedback } from "../../../../component/AddFeedback";

const object = Yup.object({
  description: Yup.string().required("Description is Required"),
  title: Yup.string().required("Title is Required"),
});

export const MyJob: React.FC = React.memo(({}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedJobs, setSelectedJobs] = useState<Jobs | null>(null);
  const { customer } = useAppSelector((state) => state.user);
  const { jobs } = useAppSelector((state) => state.jobs);
  console.log(jobs);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedFeedbackJob, setSelectedFeedbackJob] = useState<Jobs | null>(
    null
  );
  const [Open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setdata] = useState<any>();
  const params = useParams();

  const handleCloseForm = () => {
    setOpen(false);
    setSelectedJobs(null);
  };

  useEffect(() => {
    dispatch(findCustomerDataByTokenJobsThunk());
    dispatch(findCustomerDataByTokenThunk());
    dispatch(getJobsThunk());
  }, [dispatch]);

  const handleStatusChange = (status: any) => {
    setSelectedStatus(status);
    if (customer?.id) {
      if (status != "") {
        dispatch(
          findJobsByCustomerIdThunk({ id: customer.id, status: +status })
        );
      } else {
        dispatch(findCustomerDataByTokenJobsThunk());
      }
    }
  };

  const handleStatusUpdate = (jobId: number, x: number) => {
    dispatch(jobsUpdateThunk({ id: jobId, obj: { status: x } }))
      .unwrap()
      .then(res=>{
        dispatch(getJobsThunk());

      }
      )
      .catch((error) => {
        console.error("Error updating job status:", error);
      });
  };

  const openUpdateWindow = (job: Jobs) => {
    setSelectedJobs(job);
    setOpen(true);
  };

  const closeUpdateWindow = (Job: Jobs) => {
    setOpen(false);
    setSelectedJobs(null);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this job!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(() => {
      {
        dispatch(deleteJobsByIdThunk(id))
          .unwrap()
          .then(() => {
            dispatch(getJobsThunk());
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Job has been deleted",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch(console.warn);
      }
    });
  };

  const handleAddFeedback = (job: Jobs) => {
    setSelectedFeedbackJob(job);
    setShowFeedbackForm(true);
  };

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const handleSeeFeedback = (job: Jobs) => {
    setSelectedFeedbackJob(job);
    setShowFeedbackModal(true);
  };

  return (
    <div className="Myjobs">
      <h1>My Jobs</h1>
      <div>
        <label>Select Status</label>
        <select
          value={selectedStatus || ""}
          onChange={(e) => {
            handleStatusChange(e.target.value);
          }}
        >
          {""}
          <option value="">All</option>
          <option value="0">Start</option>
          <option value="1">Process</option>
          <option value="2">Finished</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>description</th>
            <th>title</th>
            <th>status</th>
            <th>Update Jobs</th>
            <th>Update status</th>
            <th>Delete Job</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((elm: any) => {
            return (
              <tr key={elm.id}>
                <td>{elm.description}</td>
                <td><Link to={"/customer/seeApplication/"+elm.id}>{elm.title}</Link></td>
                <td>
                  {elm.status}
                  <br />

                  {elm.status === 2 ? (
                    elm.rate ? (
                      <button
                        onClick={() => {
                          setModalOpen(true);
                          setdata(elm);
                        }}
                      >
                        See Feedback
                      </button>
                    ) : (
                      <button onClick={() => handleAddFeedback(elm)}>
                        Add Feedback
                      </button>
                    )
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <button onClick={() => openUpdateWindow(elm)}>
                    Update Jobs
                  </button>
                </td>
                <td>
                  <select
                    value={elm.status}
                    onChange={(e) => {
                      handleStatusUpdate(elm.id, +e.target.value);
                    }}
                  >
                    <option value="0">Start</option>
                    <option value="1">Process</option>
                    <option value="2">Finished</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(elm.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showFeedbackForm && selectedFeedbackJob && (
        <AddFeedback selectedFeedbackJob={selectedFeedbackJob} />
      )}

      {showFeedbackForm && selectedFeedbackJob && (
        <>
          <AddFeedback selectedFeedbackJob={selectedFeedbackJob} />
        </>
      )}

      {selectedJobs && Open && (
        <div className="formik">
          <h2>Update Jobs</h2>
          <Formik
            initialValues={{
              description: selectedJobs.description,
              title: selectedJobs.title,
            }}
            validationSchema={object}
            onSubmit={(values, { resetForm }) => {
              console.log(values, selectedJobs);
              setModalOpen(true);
              if (selectedJobs) {
                dispatch(
                  patchJobsByIdThunk({
                    id: selectedJobs.id,
                    obj: {
                      description: values.description,
                      title: values.title,
                    },
                  })
                )
                  .unwrap()
                  .then(() => {
                    resetForm();
                    setSelectedJobs(null);
                    dispatch(getJobsThunk());
                    Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Your work has been saved",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    setOpen(false);
                  })
                  .catch(console.warn);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.description && (
                  <div className="error">
                    <p>{errors.description}</p>
                  </div>
                )}
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.title && errors.title && (
                  <div className="error">
                    <p>{errors.title}</p>
                  </div>
                )}

                <button type="submit">Save</button>
                <button type="button" onClick={handleCloseForm}>
                  Close
                </button>
              </form>
            )}
          </Formik>
        </div>
      )}

      {modalOpen && (
        <div className="divmodal">
          <button
            className="btnmodal"
            onClick={() => {
              setModalOpen(false);
              setdata({});
            }}
          >
            Close Modal
          </button>

          <p>{data.rate}</p>
          <p>{data.text}</p>
        </div>
      )}
    </div>
  );
});
