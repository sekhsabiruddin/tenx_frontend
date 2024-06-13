import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import UpdateModal from "./UpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../../redux/reducer/product";

const AdminAllData = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const columns = [
    { id: "productName", label: "Product Name", minWidth: 100 },
    { id: "productDescription", label: "Description", minWidth: 200 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "discount", label: "Discount", minWidth: 100 },
    { id: "createdAt", label: "Created At", minWidth: 150 },
    { id: "username", label: "Username", minWidth: 150 },
    { id: "actions", label: "Actions", minWidth: 100 },
  ];

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    // After deletion, fetch products again to update the UI immediately
    dispatch(fetchProducts());
    Swal.fire("Deleted!", "Your product has been deleted.", "success");
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      backgroundColor: "#f4f4f4",
                      color: "#333",
                      padding: "12px 16px",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="left">
                          {column.id === "actions" ? (
                            <>
                              <IconButton
                                aria-label="edit"
                                onClick={() => openModal(row)}
                              >
                                <EditIcon style={{ color: "green" }} />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => confirmDelete(row._id)}
                              >
                                <DeleteIcon style={{ color: "red" }} />
                              </IconButton>
                            </>
                          ) : column.id === "createdAt" ? (
                            new Date(value).toLocaleString()
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <UpdateModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        product={selectedProduct}
      />
    </>
  );
};

export default AdminAllData;
