import { supabase } from '../../../../lib';
import { UserDetailsID } from '../../../account/queries/useUserDetails';
import { CustomError } from '../../../../utils/CustomError';
import axios, { AxiosProgressEvent } from 'axios';

const BUCKET_URL = `${import.meta.env.VITE_SUPABASE_PRODUCTION_URL}/storage/v1/object`;
const BUCKET_NAME = 'avatars';

type UploadFileData = {
  image: File;
  onUpload: (progress: AxiosProgressEvent) => void;
};

const isFileInBucket = async (fileName: string) => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list('', { search: fileName });

  if (error) {
    throw new CustomError({ message: error.message });
  }

  return data?.some((file) => file.name === fileName) ?? false;
};

export const uploadFile = async ({
  userID,
  image,
  onUpload,
}: UserDetailsID & UploadFileData) => {
  try {
    const fileName = `user-${userID}-avatar.png`;

    const fileExists = await isFileInBucket(fileName);

    if (fileExists) {
      await supabase.storage.from(BUCKET_NAME).remove([fileName]);
    }

    const response = await axios.post(
      `${BUCKET_URL}/avatars/${fileName}`,
      image,
      {
        headers: {
          'Content-Type': 'image/png',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PRODUCTION_ANON_KEY}`,
        },
        onUploadProgress: onUpload,
      },
    );

    const { data: publicUrl } = await supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    if (response.status === 200) {
      const { data, error } = await supabase
        .from('users')
        .update({ avatar_url: publicUrl.publicUrl })
        .eq('user_id', userID)
        .select();

      if (error) throw new CustomError({ message: error.message });

      return data;
    }
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
  }
};
