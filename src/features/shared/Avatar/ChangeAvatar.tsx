import { Camera } from 'lucide-react';
import { Button, useToast } from '../../../ui';
import { User } from '../../account/schemas/UserSchema';
import { UserAvatar } from './Avatar';
import AvatarEditor from 'react-avatar-editor';

import { FileRejection, useDropzone } from 'react-dropzone';
import { useEffect, useRef, useState } from 'react';
import { AvatarModal } from './AvatarModal';
import { AvatarPreview } from './AvatarPreview';
import { AvatarControls } from './AvatarControls';
import { useUploadAvatar } from './mutations/useUploadAvatar';
import { toFile } from './utils/toFile';
import { useAvatar } from './context/useAvatar';

type ChangeAvatarProps = {
  user: User;
  className?: string;
};

const MAX_AVATAR_LENGTH = 2 * 1024 * 1024;

export const ChangeAvatar = ({
  user,
  className = 'w-12 h-12',
}: ChangeAvatarProps) => {
  const { uploadingAvatar } = useUploadAvatar({ userID: user.user_id });

  const [image, setImage] = useState('');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const { setCurrentTimestamp } = useAvatar();
  const [progress, setProgress] = useState(0);

  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const editorRef = useRef<AvatarEditor | null>(null);

  const toggleModalOpen = () => setModalOpen((prevModal) => !prevModal);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length <= 0) return null;

    const file = acceptedFiles[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      setModalOpen(true);
      setImage(e.target?.result as string);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!editorRef.current) {
      setPreview(image);
    }

    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      setPreview(canvas.toDataURL());
    }
  }, [scale, image, modalOpen, position]);

  const onDropRejected = (fileRejected: FileRejection[]) => {
    fileRejected.forEach((rejected) => {
      rejected.errors.forEach((error) => {
        toast({
          title: 'Problem z dodaniem zdjęcia',
          description: error.message,
          variant: 'destructive',
        });
      });
    });
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    const canvas = editorRef.current.getImageScaledToCanvas();
    const dataUrl = canvas.toDataURL();

    const image = await toFile(dataUrl);

    uploadingAvatar(
      {
        userID: user.user_id,
        image,
        onUpload: (progress) => {
          if (!progress.total) return;

          const progressPercent = Math.round(
            (progress.loaded * 100) / progress.total,
          );
          setProgress(progressPercent);
        },
      },
      {
        onSuccess: () => {
          setCurrentTimestamp();
          setModalOpen(false);
          setProgress(0);
        },
      },
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    multiple: false,
    maxSize: MAX_AVATAR_LENGTH,
  });

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <UserAvatar className={className} user={user} />
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
          {...getRootProps()}
        >
          <Camera className="h-4 w-4" />
          <input {...getInputProps()} />
        </Button>
      </div>
      <Button {...getRootProps()}>Zmień avatar</Button>
      {modalOpen && (
        <AvatarModal modalOpen={modalOpen} toggleModalOpen={toggleModalOpen}>
          <div className="flex flex-col items-center justify-around gap-4 sm:flex-row">
            <div className="space-y-4">
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={148}
                height={148}
                borderRadius={125}
                rotate={0}
                scale={scale}
                onPositionChange={setPosition}
              />
              <AvatarControls scale={scale} setScale={setScale} />
            </div>
            <AvatarPreview preview={preview} progress={progress} />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleSave}>
              {progress > 0 && progress < 100
                ? `Ładowanie : ${progress}%`
                : `Zapisz`}
            </Button>
          </div>
        </AvatarModal>
      )}
    </div>
  );
};
