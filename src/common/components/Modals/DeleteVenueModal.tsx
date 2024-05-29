import React, { useState } from 'react';
import { useAuthStore } from '../../storage/authStore';
import { url, apiKey } from '../../constants/apiUrl';
import ScrollLock from '../ScrollLock';
import './Modal.css';

interface DeleteVenueModalProps {
  id: string;
  name: string;
  onDelete: (venueId: string) => void; 
  onClose: () => void;
}

const DeleteVenueModal: React.FC<DeleteVenueModalProps> = ({ id, name, onDelete, onClose }) => {
  const user = useAuthStore();
  const [lockScroll] = useState(true);

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
      <ScrollLock lock={lockScroll} />
      <div className="modal-container text-white">
        <div className='relative'>
          <button className="text-xl font-semibold cursor-pointer absolute -top-2 right-0 bg-red-500 pb-0.5 px-2 rounded-full" onClick={onClose}>&times;</button>
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