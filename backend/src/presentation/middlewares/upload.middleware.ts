import multer from "multer";

import { AppError } from "../../shared/errors/app-error";

const storage = multer.memoryStorage();

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
  const mimetype = file.mimetype.toLowerCase();
  const extension = file.originalname.split(".").pop()?.toLowerCase();
  const isGenericBinary = mimetype === "application/octet-stream";

  if (allowedTypes.includes(mimetype) || (isGenericBinary && allowedExtensions.includes(extension ?? ""))) {
    cb(null, true);
  } else {
    cb(new AppError(`Invalid file type received: ${file.mimetype}`, 400));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});
