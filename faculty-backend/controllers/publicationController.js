import Publication from "../models/publicationModel.js";
import { convertToIEEEFormat } from '../utils/ieee-format.js';

export const addPublication = async (req, res) => {
  try {
    const { pId, pType, pTitle, pAuthors, pVenue, pDate } = req.body;
    const existing = await Publication.findOne({ pId: pId });
    if (existing) return res.status(400).json({ message: "Publication ID already exists" });

    const newPub = new Publication({
      pId: pId,
      pType: pType,
      pTitle: pTitle,
      pAuthors: pAuthors.split(',').map(a => a.trim()),
      pVenue: pVenue,
      pDate: new Date(pDate),
    });

    await newPub.save();

    res.status(201).json({ message: "Publication added successfully", publication: newPub });
  } catch (error) {
    res.status(500).json({ message: "Failed to add publication", error });
  }
};

export const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find();
    const formattedPublications = convertToIEEEFormat(publications);
    res.status(200).json(formattedPublications);
  } catch (error) {
    console.error('Failed to get publications:', error);
    res.status(500).json({ message: 'Failed to get publications', error });
  }
};
