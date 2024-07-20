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
} from "@mui/icons-material";
import ProductDetails from "./product-details.component";
import ProductAdd from "./product-add.component";
import ProductEdit from "./product-edit.component";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const productsPerPage = 10;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
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
          <Button variant="outlined">Download all</Button>
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
              {currentProducts.map((product, index) => (
                <TableRow key={index}>
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
    </Container>
  );
};

export default Products;
