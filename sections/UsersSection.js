import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rows } from "../dummyData";
import { getUsers } from "../redux/apiCall/users";
import { format } from "timeago.js";

function UsersSection() {
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser.accessToken;
    getUsers(dispatch, token);
  }, [dispatch]);

  const columns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            style={{ display: "flex", alignItems: "center", fontWeight: "600" }}
          >
            <img
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "10px",
              }}
              src={
                params.row.img ||
                "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"
              }
              alt=""
            />
            <span>{params.row.username}</span>
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 120,
      renderCell: (params) => {
        return <span>{format(params.row.createdAt)}</span>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/user/${params.row._id}`}>
              <button
                style={{
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  backgroundColor: "#3bb077",
                  color: "white",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>
            </Link>
            <DeleteOutline style={{ color: "red" }} />
          </>
        );
      },
    },
  ];

  return (
    <div className="usersSection">
      <DataGrid
        disableSelectionOnClick
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}

export default UsersSection;
