import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../app/store";
import { Formik } from "formik";
import "./style.scss";
import Swal from "sweetalert2";

import * as Yup from "yup";
import {
  addSkillsByIdThunk,
  deleteSkillsByIdThunk,
  getSkillsThunk,
  patchSkillsByIdThunk,
} from "../../../../features/skill/skillApi";
import skillSlice, { selectSkill } from "../../../../features/skill/skillSlice";
import { Skills } from "../../../../type";
import { deleteJobsByIdThunk } from "../../../../features/jobs/jobsApi";

const object = Yup.object({
  name: Yup.string().required("Name is Required"),
});
export const AddSkills: React.FC = React.memo(({}): JSX.Element => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [selectedSkill, setSelectedSkill] = useState<Skills | null>(null);
  const { skills } = useAppSelector((st: RootState) => st.skill);
  console.log(skills);

  useEffect(() => {
    dispatch(getSkillsThunk());
  }, [dispatch]);
  const openUbdateWindow = (skill: Skills) => {
    setSelectedSkill(skill);
  };

  return (
    <div className="div1">
      <h1>AddSkills</h1>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={object}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          dispatch(addSkillsByIdThunk({ ...values }))
            .unwrap()
            .then(() => {
              resetForm();
              setSelectedSkill(null);
              dispatch(getSkillsThunk());
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              
              });
            })
            .catch(console.warn);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && <p>{errors.name}</p>}
            <button type="submit">Add Skill</button>
          </form>
        )}
      </Formik>
      <div className="div2">
        {skills.map((elm: Skills, i) => (
          <div key={i}>
            <button
              onClick={() =>
                dispatch(deleteSkillsByIdThunk(elm.id))
                  .unwrap()
                  .then(() => {
                    setSelectedSkill(null);
                    dispatch(getSkillsThunk());
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          title: "Deleted!",
                          text: "Your file has been deleted.",
                          icon: "success",
                        });
                      }
                    });
                  })
              }
            >
              &times;
            </button>
            <h4>{elm.name}</h4>
            <div>
              <button onClick={() => openUbdateWindow(elm)}>Update</button>
            </div>
          </div>
        ))}
      </div>

      {selectedSkill && (
        <div className="div3">
          <h2>Update Skill</h2>
          <Formik
            initialValues={{
              name: selectedSkill.name,
            }}
            validationSchema={object}
            onSubmit={(values) => {
              console.log(values);
              dispatch(
                patchSkillsByIdThunk({
                  id: selectedSkill.id,
                  obj: { name: values.name },
                })
              )
                .unwrap()
                .then(() => {
                  setSelectedSkill(null);
                  dispatch(getSkillsThunk());
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                })
                .catch(console.warn);
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
                  name="name"
                  className="form-control"
                  placeholder="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button>save</button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
});
