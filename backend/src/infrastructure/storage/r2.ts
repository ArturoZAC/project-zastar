import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { envs } from "../../shared/config/envs";

const getContentType = (key: string, contentType: string): string => {
  if (contentType !== "application/octet-stream") return contentType;

  const extension = key.split(".").pop()?.toLowerCase();
  const contentTypes: Record<string, string> = {
    gif: "image/gif",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };

  return contentTypes[extension ?? ""] ?? contentType;
};

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${envs.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: envs.R2_ACCESS_KEY_ID,
    secretAccessKey: envs.R2_SECRET_ACCESS_KEY,
  },
});

export interface UploadResult {
  key: string;
  url: string;
}

export const R2Storage = {
  async uploadFile(
    file: Buffer,
    key: string,
    contentType: string,
  ): Promise<UploadResult> {
    const command = new PutObjectCommand({
      Bucket: envs.R2_BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: getContentType(key, contentType),
    });

    await s3Client.send(command);

    return {
      key,
      url: `${envs.R2_PUBLIC_URL}/${key}`,
    };
  },

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: envs.R2_BUCKET_NAME,
      Key: key,
    });

    await s3Client.send(command);
  },

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: envs.R2_BUCKET_NAME,
      Key: key,
    });

    return getSignedUrl(s3Client, command, { expiresIn });
  },

  generateKey(folder: string, filename: string, id?: string): string {
    if (id) {
      return `${folder}/${id}-${filename}`;
    }
    // Fallback sin ID: timestamp + random
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = filename.split(".").pop();
    return `${folder}/${timestamp}-${random}.${ext}`;
  },
};
