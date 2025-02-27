import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../ui';

type AvatarModalProps = {
  modalOpen: boolean;
  toggleModalOpen: () => void;
  children: ReactNode;
};

export const AvatarModal = ({
  modalOpen,
  toggleModalOpen,
  children,
}: AvatarModalProps) => {
  return (
    <Dialog open={modalOpen} onOpenChange={toggleModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dostosuj avatar</DialogTitle>
          <DialogDescription>
            Przesuń i powiększ obraz, aby idealnie dopasować avatar.
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
