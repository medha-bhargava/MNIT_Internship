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

export { getProfile, updateProfile };
