const cloudinary = require("cloudinary");

// Configuration 
cloudinary.config({
  cloud_name: "dbiexyhza",
  api_key: "441351795394534",
  api_secret: "aq6FPjf6Vee7DWjmIlZdqknQuAI"
});

  const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(fileToUploads, (result) => {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };

  const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve) => {
      cloudinary.uploader.destroy(fileToDelete, (result) => {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      });
    });
  };
  
  module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
