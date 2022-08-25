import React, { useEffect, useState } from "react";
import Header from "./Header";
import "jquery/dist/jquery.min.js";
import Footer from "./Footer";
import DatePicker from "react-datepicker";
import "../css/report.css";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import "react-datepicker/dist/react-datepicker.css";
import Menu from "./Menu";

function MyExportButton() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const Report = () => {
  const columns = [
    { field: "id", headerName: "S.No.", width: 120 },
    { field: "primaryPatient", headerName: "Primary Patient Name", width: 150 },
    { field: "primaryPhone", headerName: "Primary Phone Number", width: 150 },
    { field: "patientRelation", headerName: "Patient Relation", width: 150 },
    { field: "patientName", headerName: "Patient Name", width: 150 },
    { field: "patientPhone", headerName: "Patient Phone No", width: 150 },
    { field: "patientDOB", headerName: "Patient Date Of Birth", width: 150 },
    { field: "gender", headerName: "Patient Gender", width: 150 },

    {
      field: "maritalStatus",
      headerName: "Patient Marital Status",
      width: 150,
    },
    { field: "address1", headerName: "Address1", width: 150 },
    { field: "address2", headerName: "Address2", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "district", headerName: "District", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "usertype", headerName: "User Type", width: 150 },
    { field: "corporate_name", headerName: "Corporate Name", width: 150 },
    { field: "calling_date", headerName: "Calling Date", width: 150 },
    { field: "offer", headerName: "Offer", width: 150 },
    { field: "organisation", headerName: "Organisation", width: 150 },
    { field: "patient_dob", headerName: "Patient DOB", width: 150 },
    { field: "patient_name", headerName: "Patient Name", width: 150 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "reference", headerName: "Reference", width: 150 },
    { field: "referral_code", headerName: "Referral Code", width: 150 },
    { field: "spoc", headerName: "Spoc", width: 150 },
  ];
  const [getuserdata, setUserdata] = useState([]);
  const [startDate, setStartDate] = useState("");
  // console.log(startDate);
  const [endDate, setEndDate] = useState("");
  const [show, setShow] = useState(false);

  const postData = async (e) => {
    e.preventDefault();

    const date1 = startDate.toLocaleDateString();
    const date2 = endDate.toLocaleDateString();
    var body = {
      date1,
      date2,
    };

    console.log(body);
    const res = await fetch("/api/allagentcti", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date1,
        date2,
      }),
    });
    {
      const data = await res.json();
      console.log(data);
      setUserdata(data);
    }

    setShow(true);
  };

  const rows = getuserdata.map((element, index) => ({
    id: index + 1,
    _id: element._id,
    primaryPatient: element.primaryPatient,
    primaryPhone: element.primaryPhone,
    patientRelation: element.patientRelation,
    patientName: element.patientName,
    patientPhone: element.patientPhone,
    patientDOB: element.patientDOB,
    gender: element.gender,
    maritalStatus: element.maritalStatus,
    address1: element.address1,
    address2: element.address2,
    city: element.city,
    district: element.district,
    state: element.state,
    usertype: element.uploaded_data.usertype,
    corporate_name: element.uploaded_data.corporate_name,
    calling_date: element.uploaded_data.calling_date,
    offer: element.uploaded_data.offer,
    organisation: element.uploaded_data.organisation,
    patient_dob: element.uploaded_data.patient_dob,
    patient_name: element.uploaded_data.patient_name,
    phone: element.uploaded_data.phone,
    reference: element.uploaded_data.reference,
    referral_code: element.uploaded_data.referral_code,
    spoc: element.uploaded_data.spoc,
  }));

  return (
    <div>
      <Header />
      <Menu />
      <div style={{ minHeight: "36rem" }} className="content-wrapper">
        <center>
          <h2>Report</h2>
        </center>

        <div className="card mt-5">
          <section className="content offset-md-4">
            <div className="container-fluid">
              <form>
                <div className="form-row">
                  <div className="form-group ">
                    <label htmlFor="date1" className="form-label">
                      From
                    </label>

                    <DatePicker
                      selected={startDate}
                      selectsStart
                      placeholderText="Select Date"
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="yyyy-MM-dd"
                      id="date1"
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date2" className="form-label">
                      To
                    </label>
                    <DatePicker
                      selected={endDate}
                      dateFormat="yyyy-MM-dd"
                      selectsEnd
                      placeholderText="Select Date"
                      minDate={startDate}
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      id="date2"
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ height: "40px", marginTop: "25px" }}
                    onClick={postData}
                    className="btn btn-primary "
                    id="submit"
                  >
                    Get Data
                  </button>
                </div>
              </form>
            </div>
          </section>

          <div style={{ margin: "15px" }} className="card">
            {show ? (
              <DataGrid
                style={{ fontWeight: "400" }}
                components={{
                  Toolbar: MyExportButton,
                }}
                autoHeight
                getRowId={(element) => element._id}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Report;
