import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Advertisment from '../models/advertisment.model.js';

export const getAds = async (req, res) => {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const ads = await Advertisment.find()
            .sort({ createdAt : -1 })
            .skip(offset) 
            .limit(16)
            ; 

        res.status(200).json(ads);
    } catch (error) {
          res.status(500).json({ message: error.message });
    }
};

export const searchAds = async (req,res) =>{
    const {
      Titre,
      Location,
      TypeBien,
      MinPrix,
      MaxPrix,
      MinSurface,
      MaxSurface,
      Pcs,
    } = req.query;
  
    const query = {};
    console.log({
        Titre,
        Location,
        TypeBien,
        MinPrix,
        MaxPrix,
        MinSurface,
        MaxSurface,
        Pcs,
      } )
    if (Titre) query.title = { $regex: Titre, $options: 'i' };
    if (Location) query.adresse = { $regex: Location, $options: 'i' };
    if (TypeBien) query.type = TypeBien;
    if (MinPrix) query.price = { $gte: parseInt(MinPrix, 10) };
    if (MaxPrix) query.price = { ...query.price, $lte: parseInt(MaxPrix, 10) };
    if (MinSurface) query.surface = { $gte: parseInt(MinSurface, 10) };
    if (MaxSurface) query.surface = { ...query.surface, $lte: parseInt(MaxSurface, 10) };
    if (Pcs) query.pcs = parseInt(Pcs, 10);
    
    try {
      const ads = await Advertisment.find(query).limit(30).sort({ createdAt : 1 });
      res.json(ads);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  }

  export const getAdById = async (req, res) => {
    try {
      const advertismentId = req.params.advertismentId;
      const token =req.cookies.jwt ? req.cookies.jwt : req.headers.token;
  
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded.userId);

        if (user.seen.indexOf(advertismentId) == -1) {
          user.seen.push(advertismentId);
          await user.save();
          
        }
      }
  
      const ad = await Advertisment.findById(advertismentId)
        .populate({
          path: 'createdBy',
          select: 'FirstName LastName username profile_pic tel'
        })
        .select('-updatedAt').sort({ createdAt : 1 });
  
      if (!ad) {
        return res.status(404).json({
          error: 'Advertisment not found'
        });
      }
  
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (!ad.seen.includes(ip)) {
        ad.seen.push(ip);
        await ad.save();
      }
  
      res.status(200).json({
        data: ad
      });
    } catch (error) {
      res.status(500).json({
        error: error.message || 'An error occurred'
      });
    }
  };
  