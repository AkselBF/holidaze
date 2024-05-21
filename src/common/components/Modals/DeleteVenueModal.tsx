import React from 'react';
import { useAuthStore } from '../../storage/authStore';
import { url, apiKey } from '../../constants/apiUrl';
import './Modal.css';

interface DeleteVenueModalProps {
  id: string;
  name: string;
  onDelete: (venueId: string) => void; 
  onClose: () => void;
}

const DeleteVenueModal: React.FC<DeleteVenueModalProps> = ({ id, name, onDelete, onClose }) => {
  const user = useAuthStore();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${url}/venues/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
          'X-Noroff-API-Key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete venue');
      }
      
      onDelete(id);
    } 
    catch (error) {
      console.error('Error deleting venue:', error);
    } 
    finally {
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container text-white">
        <div className='relative'>
          <span className="text-xl font-semibold cursor-pointer absolute -top-2 right-0" onClick={onClose}>&times;</span>
        </div>
        <h2 className='text-xl text-center font-semibold mt-3'>Delete Venue</h2>
        <p className='my-5 line-clamp-2'>Are you sure you want to delete the venue "{name}"?</p>
        <div className="text-right">
          <button onClick={onClose} className='bg-[#FF5C00] px-5 py-1 rounded-md'>Cancel</button>
          <button onClick={handleDelete} className='bg-red-500 px-5 py-1 rounded-md ml-2'>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVenueModal;