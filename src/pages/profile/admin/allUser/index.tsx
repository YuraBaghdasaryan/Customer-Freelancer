import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { selectJobs } from "../../../../features/jobs/jobsSlice";
import { deleteUserThunk, getUsers, profileUser } from "../../../../features/user/userApi";
import "./style.scss";
import { useParams } from "react-router-dom";

export const AllUser: React.FC = React.memo(({}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.user);
  console.log(users,user);
  const params=useParams()
  const deleteUser=async(id:number)=>{
    try{
      await dispatch(deleteUserThunk(id));
    }catch(error){
      console.error("Error delating error",error);
      
    }
  }

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div className="divus">
      <h1>AllUser</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((elm: any) => {
            return (
              <tr key={elm.id}>
                <td>{elm.name}</td>
                <td>{elm.surname}</td>
                <td>{elm.email}</td>
                <td>
                  <button onClick={()=>deleteUser(elm.id)}>Delete user</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});
