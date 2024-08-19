import Advertisment from "../models/advertisment.model.js";
import User from "../models/user.model.js";

export const getAdInfo = async (req, res) => {
    try {
        const advertismentId = req.params.advertismentId;
        const userId = req.user._id;
        const user = await User.findById(userId);
        const ad = await Advertisment.findById(advertismentId);

        if (!ad) {
            return res.status(404).json({
                error: "Advertisment not found"
            });
        }
        if (!user) {
            return res.status(404).json({
                error: "User not found. Please relogin."
            });
        }
        if (!user.ads.includes(advertismentId)) {
            return res.status(403).json({
                error: "This advertisment doesn't belong to you."
            });
        }
        res.status(200).json({
            data: ad
        });
    } catch (error) {
        res.status(500).json({
            error: error.message || "An error occurred"
        });
    }
};
export const createAd = async (req, res) => {
    const handleRequest = async () => {
        const createdBy = req.user._id;
        const { 
            title, 
            description, 
            price, 
            surface, 
            pcs, 
            type, 
            adresse, 
            pictures, 
            diagnostic, 
            equipment, 
            Publish 
        } = req.body;

        if (price < 0) throw new Error("Price should be greater than 0.");

        const user = await User.findById(createdBy).orFail(() => {
            throw new Error("Creator Id wasn't found.");
        });

        const newAd = new Advertisment({
            title, 
            description, 
            price, 
            surface, 
            pcs, 
            type, 
            adresse, 
            pictures, 
            diagnostic, 
            equipment, 
            createdBy, 
            published: Publish
            
        });

        await newAd.save();
        user.ads.push(newAd._id);
        await user.save();

        return newAd;
    };

    try {
        const newAd = await handleRequest();
        res.status(201).json(newAd);
    } catch (error) {
        res.status(500).json({ error: error.message || "An error occurred" });
    }
};

export const editPost = async (req, res) => {
    const handleRequest = async () => {
        const {
            _id, 
            title, 
            description, 
            price, 
            surface, 
            pcs, 
            type, 
            adresse, 
            pictures, 
            diagnostic, 
            equipment, 
            Publish
            
        } = req.body;

        if (!_id) throw new Error("Invalid objectId");

        const ad = await Advertisment.findById(_id).orFail(() => {
            throw new Error("Advertisement not found.");
        });

        const createdBy = ad.createdBy;
        if (req.user._id.toString() !== createdBy.toString()) {
            throw new Error("Invalid userId");
        }

        if (price < 0) throw new Error("Price should be greater than 0.");

        const user = await User.findById(createdBy).orFail(() => {
            throw new Error("Creator Id wasn't found.");
        });

        ad.title = title || ad.title;
        ad.description = description || ad.description;
        ad.price = price || ad.price;
        ad.surface = surface || ad.surface;
        ad.pcs = pcs || ad.pcs;
        ad.type = type || ad.type;
        ad.adresse = adresse || ad.adresse;
        ad.pictures = pictures || ad.pictures;
        ad.diagnostic = diagnostic || ad.diagnostic;
        ad.equipment = equipment || ad.equipment;
        ad.published =  Publish || ad.published;
        ad.enabled = false ; 
        await ad.save();

        return ad;
    };

    try {
        const updatedAd = await handleRequest();
        res.status(200).json({
            message: "Advertisement updated successfully",
            ad: updatedAd
        });
    } catch (error) {
        res.status(500).json({ error: error.message || "An error occurred" });
    }
};

export const deletePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const adId = req.params.advertismentId;

        const ad = await Advertisment.findById(adId);

        if (!ad) {
            return res.status(404).json({
                message: "Advertisement not found."
            });
        }

        if (userId.toString() !== ad.createdBy.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this advertisement."
            });
        }

        await Advertisment.findByIdAndDelete(adId);

        res.status(202).json({
            message: "Deleted Successfully :)"
        });
    } catch (error) {
        res.status(500).json({
            error: "An error occurred during deleting the item: " + error.message
        });
    }
};

export const getUserAds = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        if (!userId) {
            return res.status(400).json({ message: "Invalid User ID format" });
        }

        const user = await User.findById(userId).populate({
            path: "ads",
            options: {
                sort: { createdAt: -1 } 
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.ads || user.ads.length === 0) {
            return res.status(200).json({ ads:[]  });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("Error fetching user ads:", error); 
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addFav = async (req, res) => {
    try {
      const userId = req.user._id;
      const adId = req.params.advertismentId;
  
      if (!userId) {
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (!user.favorite.includes(adId)) {
        user.favorite.push(adId);
        await user.save();
        return res.status(200).json({ message: "Added to favorites" });
      } else {
        return res.status(200).json({ message: "Already in favorites" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

export const totalPages = async (req, res) => {
    try {
        const AdCount = await Advertisment.countDocuments({});
        const pages = Math.ceil(AdCount / 16);  // Use Math.ceil to round up
        return res.status(200).json({ countPages: pages });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ message: 'Server Error' }); // Return an error response
    }
};
