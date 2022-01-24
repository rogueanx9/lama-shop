import { DeleteOutline } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../redux/apiCall/products";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
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
              src={params.row.img}
              alt=""
            />
            <span>{params.row.title}</span>
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link href={`/product/${params.row._id}`}>
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
            <DeleteOutline
              onClick={() => handleDelete(params.row._id)}
              style={{ color: "red", cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProducts(id, dispatch);
  };

  return (
    <div className="prodList">
      <DataGrid
        disableSelectionOnClick
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}

export default ProductList;
