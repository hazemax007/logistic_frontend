import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import ProductDetails from "./product-details.component";
import ProductAdd from "./product-add.component";
import ProductEdit from "./product-edit.component";
import UpdateQuantityDialog from "./update-qte-store.component";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQuantityDialogOpen, setIsQuantityDialogOpen] = useState(false);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProductsAndStores = async () => {
      try {
        const [productsResponse, storesResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/products"),
          axios.get("http://localhost:8080/api/stores"),
        ]);
        setProducts(productsResponse.data);
        setStores(storesResponse.data);
      } catch (error) {
        console.error("Error fetching products or stores:", error);
      }
    };
    fetchProductsAndStores();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleOpenQuantityDialog = (product) => {
    setSelectedProduct(product);
    setIsQuantityDialogOpen(true);
  };

  const handleCloseQuantityDialog = () => {
    setIsQuantityDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const viewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const editProduct = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Overall Inventory
        </Typography>
        <Divider />
        {/* Your statistics and other UI elements */}
      </Box>

      <Box my={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Products
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <ProductAdd onAdd={handleAddProduct} />
          <Button variant="outlined" style={{ marginRight: "8px" }}>
            Filters
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Buying Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.ref}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.buyPrice} DT</TableCell>
                  <TableCell>{product.quantity} Units</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => viewDetails(product)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => editProduct(product)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpenQuantityDialog(product)} color="primary">
                      <AddIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteProduct(product.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
          <Button variant="outlined" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Box>
      </Box>

      <ProductDetails
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />

      <ProductEdit
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
      />

      <UpdateQuantityDialog
        open={isQuantityDialogOpen}
        onClose={handleCloseQuantityDialog}
        product={selectedProduct}
        stores={stores}
        onUpdate={handleUpdateProduct}
      />
    </Container>
  );
};

export default Products;
