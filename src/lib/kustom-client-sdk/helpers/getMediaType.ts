import mime from 'mime-types';

export enum MediaType {
  IMAGE = 'image',
  PDF = 'pdf',
  VIDEO = 'video',
  APP = 'application',
  UNKNOWN = 'unknown',
}

const getMediaType = (filename: string): MediaType => {
  const mimeType = mime.lookup(filename);

  if (!mimeType) {
    return MediaType.UNKNOWN;
  }

  if (mimeType === 'application/pdf') {
    return MediaType.PDF;
  }

  const parts = mimeType.split('/');

  return parts[0] as MediaType;
};

export default getMediaType;
