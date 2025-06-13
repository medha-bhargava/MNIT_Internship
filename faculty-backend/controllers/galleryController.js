import Gallery from '../models/galleryModel.js';

// Add a new gallery item
// export const addGalleryItem = async (req, res) => {
//   try {
//     const existing = await Gallery.findOne({ imageUrl: req.body.imageUrl });
//     if (existing) {
//       return res.status(400).json({ message: 'Image with this URL already exists.' });
//     }

//     const galleryItem = new Gallery(req.body);
//     await galleryItem.save();
//     res.status(201).json({ message: 'Gallery item added successfully', galleryItem });
//   } catch (error) {
//     console.error('Error adding gallery item:', error);
//     res.status(500).json({ message: 'Failed to add gallery item', error: error.message });
//   }
// };
export const addGalleryItem = async (req, res) => {
    console.log("Received data:", req.body); // 🔍 ADD THIS LINE

    const { imageUrl, caption, category, date } = req.body;

    if (!imageUrl || !caption || !category || !date) {
        console.log("Missing field(s)"); // 🔍 ADD THIS TOO
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newEntry = new Gallery({ imageUrl, caption, category, date });
        await newEntry.save();
        console.log("Saved successfully"); // ✅ Success logging
        res.status(201).json({ message: 'Gallery item added successfully' });
    } catch (err) {
        console.error('Error:', err.message); // 🔍 Log actual error
        res.status(500).json({ message: err.message });
    }
};



// Get all gallery items
export const getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ date: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ message: 'Failed to fetch gallery items', error: error.message });
  }
};

// (Optional) Delete a gallery item
export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Gallery.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Gallery item not found' });
    res.status(200).json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ message: 'Failed to delete gallery item', error: error.message });
  }
};
