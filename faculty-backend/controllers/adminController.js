import Admin from '../models/adminModel.js';

// GET Profile
const getProfile = async (req, res) => {
    try {
        const profile = await Admin.findOne();
        if (!profile) return res.status(404).json({ message: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT Profile
const updateProfile = async (req, res) => {
    const updateData = req.body;
    console.log('📥 Received update data:', updateData);
    console.log('PUT /api/profile payload:', updateData);

    try {
        const updated = await Admin.findOneAndUpdate({}, updateData, {
            new: true,
            upsert: true, // creates one if not found
        });
        if (!updated) {
            console.error('❌ Update failed - no document updated.');
            return res.status(500).json({ message: 'Update failed' });
        }
        console.log('✅ Updated Profile:', updated);
        res.json(updated);
    } catch (error) {
        console.error('❌ Update error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

const uploadProfilePhoto = async (req, res) => {
    //   try {
    //     // For example, save filename in DB or process file
    //     console.log('Uploaded file:', req.file);
    //     // Save req.file.filename to user profile in DB if needed
    //     res.status(200).json({ message: 'Photo uploaded successfully' });
    //   } catch (error) {
    //     res.status(500).json({ message: 'Failed to upload photo', error });
    //   }
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: 'No file uploaded' });

        // Save the filename to the profile (optional, but usually needed)
        const updated = await Admin.findOneAndUpdate(
            {},
            { profilePhoto: req.file.filename },
            { new: true, upsert: true }
        );

        console.log('Photo saved as:', file.filename);
        res.status(200).json({ message: 'Photo uploaded successfully', filename: file.filename });
    } catch (error) {
        console.error('Upload error:', error.message);
        res.status(500).json({ message: 'Failed to upload photo', error });
    }
};
export { getProfile, updateProfile, uploadProfilePhoto };
