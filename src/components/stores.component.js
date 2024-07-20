import React, { useState, useEffect } from "react";
import axios from 'axios';
import StoreAdd from "./store-add.component";
import StoreEdit from './store-edit.component'; // Import EditStore component
import AssignProductsToStore from './store-add-product.component'; // Import AssignProductsToStore component
import StoreDetails from "./store-view-details.component";
import {
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

const StoreCard = ({ store, onEdit, onDelete, onAssignProducts, onViewDetails }) => {
  const storeImage = store.imagePath
    ? `http://localhost:8080/${store.imagePath.replace(/\\/g, '/')}`
    : '/path/to/default/image.jpg'; // Provide a default image path or handle the case appropriately

  const handleEditClick = () => {
    onEdit(store); // Pass the store object to the onEdit handler
  };

  const handleDeleteClick = () => {
    onDelete(store.id); // Pass the store id to the onDelete handler
  };

  const handleAssignProductsClick = () => {
    onAssignProducts(store); // Pass the store object to the onAssignProducts handler
  };

  const handleViewDetailsClick = () => {
    onViewDetails(store); // Pass the store object to the onViewDetails handler
  };

  return (
    <div className="store-card">
      <div className="store-image">
        <img src={storeImage} alt="Store" />
      </div>
      <div className="store-details">
        <div className="store-name">{store.ref}</div>
        <div className="store-name">{store.name}</div>
        <div className="store-address">{store.location}</div>
        <div className="store-phone">{store.phoneNumber}</div>
      </div>
      <div className="button-group">
        <button className="edit-button" onClick={handleEditClick}>Edit</button>
        <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
        <button className="edit-button" onClick={handleAssignProductsClick}>Assign Products</button>
        <button className="edit-button" onClick={handleViewDetailsClick}>View Details</button>
      </div>
      <style jsx>{`
        .store-card {
          border-radius: 6px;
          border: 1px solid rgba(240, 241, 243, 1);
          background-color: #fff;
          display: flex;
          width: 100%;
          max-width: 939px;
          padding-right: 16px;
          gap: 20px;
        }
        .store-image {
          width: 200px; /* Adjust as needed */
          height: 150px; /* Adjust as needed */
          overflow: hidden;
          border-radius: 6px;
        }
        .store-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .store-details {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .store-name {
          color: var(--Grey-grey-600, #5d6679);
          font: 500 16px/150% Inter, sans-serif;
        }
        .store-address,
        .store-phone {
          color: var(--Grey-grey-400, #858d9d);
          margin-top: 8px;
          font: 400 14px/20px Inter, sans-serif;
        }
        .button-group {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .edit-button {
          border: none;
          border-radius: 14px;
          background-color: rgba(232, 241, 253, 1);
          color: var(--Primary-primary-600, #1366d9);
          padding: 8px 16px; /* Standard size */
          font: 500 14px/143% Inter, sans-serif;
          cursor: pointer;
        }
        .edit-button:hover {
          background-color: rgba(212, 229, 255, 1);
        }
        .delete-button {
          border: none;
          border-radius: 14px;
          background-color: rgba(255, 183, 183, 1);
          color: #d93025;
          padding: 8px 16px; /* Standard size */
          font: 500 14px/143% Inter, sans-serif;
          cursor: pointer;
        }
        .delete-button:hover {
          background-color: rgba(255, 157, 157, 1);
        }
      `}</style>
    </div>
  );
};

function Stores() {
  const [storesData, setStoresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null); // Track selected store for details
  const [assignModalOpen, setAssignModalOpen] = useState(false); // State for Assign Products modal
  

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/stores');
        setStoresData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenEditModal = (store) => {
    setEditingStore(store);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditingStore(null);
    setIsEditModalOpen(false);
  };

  const handleAddStore = (newStore) => {
    setStoresData(prevStores => [...prevStores, newStore]);
    handleCloseAddModal();
  };

  const handleUpdateStore = (updatedStore) => {
    const updatedStores = storesData.map(store =>
      store.id === updatedStore.id ? updatedStore : store
    );
    setStoresData(updatedStores);
    handleCloseEditModal();
  };

  const handleDeleteStore = async (storeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/stores/${storeId}`);
      const updatedStores = storesData.filter(store => store.id !== storeId);
      setStoresData(updatedStores);
      setDeleteConfirmation(null); // Close the delete confirmation modal if open
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  const handleConfirmDelete = (storeId) => {
    const storeToDelete = storesData.find(store => store.id === storeId);
    setDeleteConfirmation(storeToDelete);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation(null);
  };

  const handleAssignProducts = (store) => {
    setSelectedStore(store);
    setAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setAssignModalOpen(false);
  };

  const handleViewDetails = (store) => {
    setSelectedStore(store); // Set the selected store
    setIsViewDetailsModalOpen(true); // Open the view details modal
  };

  const handleCloseViewDetailsModal = () => {
    setIsViewDetailsModalOpen(false); // Close the view details modal
  };

  return (
    <div className="stores-container">
      <div className="header">
        <div className="manage-store">Manage Store</div>
        <button className="add-store" onClick={handleOpenAddModal}>
          Add Store
        </button>
      </div>
      <div className="stores-list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          storesData.map((store, index) => (
            <StoreCard
              key={index}
              store={store}
              onEdit={handleOpenEditModal}
              onDelete={handleConfirmDelete}
              onAssignProducts={handleAssignProducts}
              onViewDetails={handleViewDetails} // Pass onViewDetails handler
            />
          ))
        )}
      </div>
      <AssignProductsToStore
        store={selectedStore} // Pass selected store to AssignProductsToStore component
        isOpen={assignModalOpen} // Pass state to manage modal open/close
        onClose={handleCloseAssignModal} // Function to close modal
      />
      <StoreDetails
        open={isViewDetailsModalOpen}
        onClose={handleCloseViewDetailsModal}
        store={selectedStore} // Pass selected store to StoreDetails component
      />
      <StoreAdd
        open={isAddModalOpen}
        handleClose={handleCloseAddModal}
        onAddStore={handleAddStore}
      />
      <StoreEdit
        store={editingStore}
        open={isEditModalOpen}
        handleClose={handleCloseEditModal}
        onUpdateStore={handleUpdateStore}
      />

      {/* Delete Confirmation Modal */}
      <Modal open={!!deleteConfirmation} onClose={handleCancelDelete}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">Are you sure you want to delete this store?</Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDeleteStore(deleteConfirmation.id)}
            >
              Confirm Delete
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancelDelete}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      <style jsx>{`
        .stores-container {
          margin: 30px auto;
          max-width: 1000px;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .manage-store {
          color: var(--Grey-grey-700, #3a3f4b);
          font: 600 20px/150% Inter, sans-serif;
        }
        .add-store {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          background-color: rgba(34, 170, 109, 1);
          color: #fff;
          font: 500 16px/150% Inter, sans-serif;
          cursor: pointer;
        }
        .stores-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}

export default Stores;