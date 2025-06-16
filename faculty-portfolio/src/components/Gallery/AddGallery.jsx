import React, { useState } from 'react';
import './AddGallery.css';

const AddGallery = () => {
    const [formData, setFormData] = useState({
        imageUrl: '',
        caption: '',
        category: '',
        date: '',
    });
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        const { imageUrl, caption, category, date } = formData;

        // Ensure .jpg/.png/.jpeg URL
        // if (!imageUrl.endsWith('.jpg') || !imageUrl.endsWith('.png') || !imageUrl.endsWith('.jpeg')) {
        //     alert('Please enter a valid image URL that ends with .jpg/.png/.jpeg');
        //     return;
        // }
        if (!imageUrl.endsWith('.jpg')) {
            alert('Please enter a valid image URL that ends with .jpg');
            return;
        }

        try {
            const res = await fetch('https://faculty-backend-koz0.onrender.com/api/gallery/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl, caption, category, date }),
            });

            if (!res.ok) throw new Error('Upload failed');

            alert('Gallery item added!');
            setFormData({ imageUrl: '', caption: '', category: '', date: '' });
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="add-gallery-wrapper">
            <h2 className="gallery-head">Add Gallery</h2>

            <div className="gallery-form-row">
                <div className="gallery-input-group">
                    {/* <label>Image</label> */}
                    {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
                    <input placeholder="ImageUrl" type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                </div>
                <div className="gallery-input-group">
                    {/* <label>Caption</label> */}
                    <input placeholder="Caption" type="text" name="caption" value={formData.caption} onChange={handleChange} />
                </div>
            </div>

            <div className="gallery-form-row">
                <div className="gallery-input-group">
                    {/* <label>Category</label> */}
                    {/* <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="">--Select Category--</option>
                        <option value="Photography">Photography</option>
                        <option value="Music">Music Jam</option>
                        <option value="Trip">Trip</option>
                    </select> */}
                    <input placeholder="Categogy" type="text" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div className="gallery-input-group">
                    {/* <label>Date</label> */}
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
            </div>

            <button className="gallery-submit-button" onClick={handleSubmit}>Add to Gallery</button>
        </div>
    );
};

export default AddGallery;
