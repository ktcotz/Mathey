import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  Stepper,
  useStepper,
} from '../../../ui';

import { PersonalInfoForm } from './PersonalInfoForm';
import { AddressInfoForm } from './AddressInfoForm';
import { ElementType } from 'react';

const currentForm: Record<number, ElementType> = {
  1: PersonalInfoForm,
  2: AddressInfoForm,
};

export const MoreDetailsForm = () => {
  const { step } = useStepper();

  const Form = currentForm[step];

  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogHeader>
          <Stepper steps={2} current={step} />
          <DialogTitle>Uzupełnij swój profil</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Opowiedz nam troszkę więcej o sobie, potrzebujemy tych danych aby
            lepiej zarządzać twoim kontem a także wybrać dla Ciebie najbardziej
            odpowiedniego korepetytora.
          </DialogDescription>
        </DialogHeader>
        {<Form />}
      </DialogContent>
    </Dialog>
  );
};
