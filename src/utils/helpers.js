import { getFileURL } from "./services";

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const base64ToBlob = (base64, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

export const getFileUrlFromFile = async (file, folder) => {
  try {
    debugger
    if (!file) {
      throw new Error("File is null or undefined.");
    }

    const fileToBase64 = await toBase64(file);
    if (!fileToBase64) {
      throw new Error("Failed to convert file to base64.");
    }

    const base64toblobdata = base64ToBlob(fileToBase64, file?.type);
    if (!base64toblobdata) {
      throw new Error("Failed to convert base64 to Blob.");
    }

    const data = await getFileURL(base64toblobdata, folder, file?.name);
    if (!data) {
      throw new Error("Failed to upload Blob and retrieve URL.");
    }

    return data;
  } catch (err) {
    throw new Error(`Error in getFileUrlFromFile: ${err.message}`);
  }
};

export function removeNullKeys(obj) {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      removeNullKeys(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  }
  return obj;
}