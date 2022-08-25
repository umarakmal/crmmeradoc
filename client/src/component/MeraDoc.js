import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Layout from "./Layout";
import "../css/meradoc.css";
import { useLocation } from "react-router-dom";
import $ from "jquery";

const MeraDoc = () => {
  // const { search } = useLocation;
  // const p = new URLSearchParams(search);
  console.log(useLocation().search);
  const query = new URLSearchParams(useLocation().search);
  const phone = query.get("phone")
    ? query.get("phone")
    : ""(
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        function () {
          "use strict";

          // Fetch all the forms we want to apply custom Bootstrap validation styles to
          var forms = document.querySelectorAll(".needs-validation");

          // Loop over them and prevent submission
          Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener(
              "submit",
              function (event) {
                if (!form.checkValidity()) {
                  event.preventDefault();
                  event.stopPropagation();
                }

                form.classList.add("was-validated");
              },
              false
            );
          });
        }
      )();

  const history = useHistory();
  const [inpval, setINP] = useState({
    primaryPatient: "",
    primaryPhone: "",
    patientRelation: "",
    patientName: "",
    patientPhone: "",
    patientDOB: "",
    gender: "",
    maritalStatus: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    district: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (event) => {
    event.preventDefault();

    const {
      primaryPatient,
      primaryPhone,
      patientRelation,
      patientName,
      patientPhone,
      patientDOB,
      gender,
      maritalStatus,
      address1,
      address2,
      city,
    } = inpval;
    const uploaded_data = val._id;
    console.log(uploaded_data);
    const { pincode, district, state } = location;
    if (
      !primaryPatient ||
      !primaryPhone ||
      !patientRelation ||
      !patientName ||
      !patientPhone ||
      !patientDOB ||
      !address1 ||
      !address2
    ) {
      return false;
    } else {
      const res = await fetch(`/api/agentcti`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },

        body: JSON.stringify({
          primaryPatient,
          primaryPhone,
          patientRelation,
          patientName,
          patientPhone,
          patientDOB,
          gender,
          maritalStatus,
          address1,
          address2,
          city,
          pincode,
          district,
          state,
          uploaded_data,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        toast.error("Error Occured");
      } else {
        //   history.push("/users");
        toast.success("User added successfully");
      }
    }
  };

  const [val, setVal] = useState([]);

  //Get Data when click get data
  const showData = async (e) => {
    const res2 = await fetch(`/api/uploadeddata?phone=${phone}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res2.json();
    const x = data[0];
    if (res2.status === 422 || !data) {
      console.log("error ");
    } else {
      // var x = data[0];
      setVal(x);

      console.log(x);
    }
  };
  useEffect(() => {
    showData();
  }, []);

  const [location, setLocation] = useState({
    pincode: "",
    city: "",
    district: "",
    state: "",
    error: "",
  });
  console.log(location);
  const handlePincode = (e) => {
    setLocation({ [e.target.name]: e.target.value });
    if (e.target.value.length === 6) {
      setLocation({
        error: "",
      });
      axios
        .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
        .then((res) =>
          setLocation({
            state: res.data[0].PostOffice[0].State,
            city: res.data[0].PostOffice[0].Block,
            district: res.data[0].PostOffice[0].District,
          })
        )
        .then(() => {
          document.getElementById("pincode").classList.remove("error");
        })
        .catch((err) => {
          document.getElementById("pincode").className = "error";
          setLocation({
            error: "Invalid PIN Code",
          });
        });
    }
    if (e.target.value.length !== 6) {
      setLocation({
        city: "",
        district: "",
        state: "",
        error: "ZIP code must be of 6 digits",
      });
    }
  };

  return (
    <>
      <Layout />
      <ToastContainer />

      <div className="container row  mt-5 col-md-12">
        {/* <div> */}
        <form
          id="f1"
          // className="needs-validation"
          // noValidate
          onSubmit={addinpdata}
        >
          {/* Get data*/}

          <div className="col-md-8">
            <h3 style={{ marginBottom: "15px" }}>Get Data</h3>
            <div className="row">
              <div className=" col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputName">User Type</label>

                <input
                  type="text"
                  className="form-control"
                  name="usertype"
                  value={val.usertype ? val.usertype : ""}
                  onChange={setdata}
                  id="inputName"
                  placeholder=""
                  readOnly
                />
              </div>

              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Corporate Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="corporate_name"
                  value={val.corporate_name ? val.corporate_name : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Referral Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="referral_code"
                  value={val.referral_code ? val.referral_code : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Organisation</label>
                <input
                  type="text"
                  className="form-control"
                  name="organisation"
                  value={val.organisation ? val.organisation : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Offer</label>
                <input
                  type="text"
                  className="form-control"
                  name="offer"
                  value={val.offer ? val.offer : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Reference</label>
                <input
                  type="text"
                  className="form-control"
                  name="reference"
                  value={val.reference ? val.reference : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Calling Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="calling_date"
                  value={val.calling_date ? val.calling_date : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Patient Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="patient_name"
                  value={val.patient_name ? val.patient_name : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={val.phone ? val.phone : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Patient DOB</label>
                <input
                  type="text"
                  className="form-control"
                  name="patient_dob"
                  value={val.patient_dob ? val.patient_dob : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group">
                <label htmlFor="inputInt">Spoc</label>
                <input
                  type="text"
                  className="form-control"
                  name="spoc"
                  value={val.spoc ? val.spoc : ""}
                  onChange={setdata}
                  id="inputInt"
                  placeholder=""
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ marginTop: "15px", marginBottom: "15px" }}>
              Agent CTI
            </h2>
          </div>
          <div
            // style={{ justifyContent: "flex-end", flexDirection: "row" }}
            className="col-md-8"
          >
            <div className="row">
              <div className="col-md-4 col-sm-12 col-xs-12 f-group  ">
                <label htmlFor="exampleInputName">Primary Patient Name</label>
                <input
                  type="text"
                  value={inpval.primaryPatient}
                  onChange={setdata}
                  name="primaryPatient"
                  className="form-control"
                  id="exampleInputName"
                  aria-describedby="emailHelp"
                  required
                />
                <div className="invalid-feedback">
                  Please choose a primary Patient Name.
                </div>
              </div>

              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleInputEmail">Primary Phone Number</label>
                <input
                  type="text"
                  value={inpval.primaryPhone}
                  onChange={setdata}
                  name="primaryPhone"
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  required
                />
                <div className="invalid-feedback">
                  Please choose a primary Phone Number.
                </div>
              </div>

              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleFormControlSelect1">Patient Name</label>
                <input
                  type="text"
                  value={inpval.patientName}
                  onChange={setdata}
                  name="patientName"
                  className="form-control"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  required
                />
                <div className="invalid-feedback">
                  Please choose a Patient Name.
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleInputPass">Patient Relation</label>
                <input
                  type="text"
                  value={inpval.patientRelation}
                  onChange={setdata}
                  name="patientRelation"
                  className="form-control"
                  id="exampleInputPass"
                  aria-describedby="emailHelp"
                  required
                />
                <div className="invalid-feedback">
                  Please choose a Patient Relation.
                </div>
              </div>

              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleInputPass">Patient Phone No</label>
                <input
                  type="text"
                  value={inpval.patientPhone}
                  onChange={setdata}
                  name="patientPhone"
                  className="form-control"
                  id="exampleInputPass"
                  aria-describedby="emailHelp"
                  required
                />
                <div className="invalid-feedback">
                  Please choose a Patient Phone No.
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="date1" className="form-label">
                  Patient Date Of Birth
                </label>

                <input
                  type="date"
                  value={inpval.patientDOB}
                  onChange={setdata}
                  name="patientDOB"
                  className="form-control"
                  id="date1"
                  aria-describedby="emailHelp"
                  required
                />
                <div className="invalid-feedback ">
                  Please choose a Patient Date Of Birth
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="gender145">Patient Gender</label>
                <div className="form-check form-check-inline ml-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    onChange={setdata}
                    id="gender1"
                    value="Male"
                    required
                  />

                  <label className="form-check-label" htmlFor="gender1">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    onChange={setdata}
                    id="gender2"
                    value="Female"
                    required
                  />
                  <label className="form-check-label" htmlFor="gender2">
                    Female
                  </label>
                </div>
                <div className="invalid-feedback">Please choose a Gender</div>
              </div>

              <div className="col-md-5 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleInputPass">Patient Marital Status</label>
                <div className="form-check form-check-inline ml-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    onChange={setdata}
                    id="inlineRadio3"
                    value="Married"
                    required
                  />
                  <label className="form-check-label" htmlFor="inlineRadio3">
                    Married
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="maritalStatus"
                    onChange={setdata}
                    id="inlineRadio4"
                    value="Unmarried"
                    required
                  />
                  <label className="form-check-label" htmlFor="inlineRadio4">
                    Unmarried
                  </label>
                </div>
                <div className="invalid-feedback">
                  Please choose a marital Status
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleInputPass">Address1</label>
                <input
                  type="text"
                  value={inpval.address1}
                  onChange={setdata}
                  name="address1"
                  className="form-control"
                  id="exampleInputPass"
                  aria-describedby="emailHelp"
                  required
                />
                <div className="invalid-feedback">Please choose Address1</div>
              </div>

              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleInputPass">Address2</label>
                <input
                  type="text"
                  value={inpval.address2}
                  onChange={setdata}
                  name="address2"
                  className="form-control"
                  id="exampleInputPass"
                  aria-describedby="emailHelp"
                  required
                />
                <div className="invalid-feedback">Please choose Address2</div>
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleInputPass34">City</label>
                <input
                  type="text"
                  value={inpval.city}
                  onChange={setdata}
                  name="city"
                  className="form-control"
                  id="exampleInputPass34"
                  aria-describedby="emailHelp"
                  required
                />
                <div className="invalid-feedback">Please choose City</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  maxLength={6}
                  minLength={6}
                  value={location.pincode}
                  onChange={(e) => handlePincode(e)}
                  //   onChange={getData}
                  name="pincode"
                  className="form-control"
                  id="pincode"
                  aria-describedby="emailHelp"
                  required
                />

                {location.error ? (
                  <div style={{ color: "red" }} className="error-display">
                    {location.error}
                  </div>
                ) : null}
                {/* <div class="invalid-feedback">Please choose Address2</div> */}
              </div>

              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleInputPass33">District</label>
                <input
                  type="text"
                  value={location.district}
                  //   onChange={(e) => handleDistrict(e)}
                  name="district"
                  className="form-control"
                  id="exampleInputPass33"
                  aria-describedby="emailHelp"
                  readOnly
                />
              </div>

              {/* </div> */}
              {/* <div className="row"> */}
              <div className="col-md-4 col-sm-12 col-xs-12 form-group ">
                <label htmlFor="exampleInputPass33">State</label>
                <input
                  type="text"
                  value={location.state}
                  //   onChange={(e) => handleState(e)}
                  name="state"
                  className="form-control"
                  id="exampleInputPass33"
                  aria-describedby="emailHelp"
                  readOnly
                />
              </div>
            </div>
          </div>

          <button
            style={{ marginLeft: "30%", marginBottom: "15px" }}
            type="submit"
            // onClick={addinpdata}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
        {/* </div> */}
      </div>
    </>
  );
};

export default MeraDoc;
