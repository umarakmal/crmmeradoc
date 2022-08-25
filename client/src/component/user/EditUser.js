import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const EditUser = () => {
  const history = useHistory("");

  const [inpval, setINP] = useState({
    name: "",
    employeeid: "",
    email: "",
    role: "",
    password: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setINP(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
    const { name, email, role, password } = inpval;

    const res2 = await fetch(`/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,

        email,
        role,

        password,
      }),
    });

    const data = await res2.json();
    console.log(data);

    if (res2.status === 422 || !data) {
      alert("fill the data");
      toast.error("Error Occured");
    } else {
      history.push("/users");
      toast.success("User updated successfully");
    }
  };

  return (
    <>
      <Header />
      <Menu />
      <ToastContainer />

      <div style={{ minHeight: "36rem" }} className="content-wrapper ">
        <NavLink
          style={{
            color: "#2980b9",
            fontWeight: "bolder",
          }}
          to="/users"
          className="btn btn"
        >
          <i
            style={{ marginRight: "5px" }}
            className="nav-icon fas fa-arrow-left"
          />
          User Management
        </NavLink>
        <center>
          <h1>Edit User</h1>
        </center>
        <div className="content offset-4">
          <form>
            <div className="col-md-5 col-sm-12 col-xs-12 form-group ml-5">
              <label htmlFor="exampleInputName">Name</label>
              <input
                type="text"
                value={inpval.name}
                onChange={setdata}
                name="name"
                className="form-control"
                id="exampleInputName"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="col-md-5 col-sm-12 col-xs-12 form-group ml-5">
              <label htmlFor="exampleInputEmail">Email</label>
              <input
                type="email"
                value={inpval.email}
                onChange={setdata}
                name="email"
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="col-md-5 col-sm-12 col-xs-12 form-group ml-5">
              <label htmlFor="exampleFormControlSelect1">Role</label>
              <select
                name="role"
                value={inpval.role}
                onChange={setdata}
                className="form-control"
                id="exampleFormControlSelect1"
                aria-label=".form-select-lg example"
              >
                <option selected>Select</option>
                <option>admin</option>
                <option>agent</option>
              </select>
            </div>

            <div className="col-md-5 col-sm-12 col-xs-12 form-group ml-5">
              <label htmlFor="exampleInputPass">Password</label>
              <input
                type="password"
                // value={inpval.password}
                onChange={setdata}
                name="password"
                className="form-control"
                id="exampleInputPass"
                aria-describedby="emailHelp"
              />
            </div>

            <button
              style={{ marginLeft: "23%" }}
              type="submit"
              onClick={updateuser}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditUser;
