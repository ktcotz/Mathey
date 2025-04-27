import { useDocumentTitle } from 'usehooks-ts';
import {
  BackgroundDecoration,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Stepper,
  useStepper,
} from '../ui';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../types';
import { ChevronLeft } from 'lucide-react';
import { ComponentType, useState } from 'react';
import { RegisterTeacherForm } from '../features/teacher/views/RegisterTeacherForm';
import { RegisterTeacherFormData } from '../features/teacher/schemas/RegisterTeacherFormSchema';
import { AddressInfoForm } from '../features/account/views/AddressInfoForm';
import { AddressInfoFormData } from '../features/account/schemas/AddressInfoFormSchema';
import { AnimatePresence, motion } from 'motion/react';

export type TeacherDTO = RegisterTeacherFormData & AddressInfoFormData;

type ViewComponentProps = {
  data: TeacherDTO;
  setupData: (dataToSetup: Partial<TeacherDTO>) => void;
  isCreatingTeacher?: boolean;
};

export const BeTeacher = () => {
  const { step } = useStepper();

  const [fullData, setFullData] = useState<TeacherDTO>({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    distance: 0,
    houseNumber: '',
    postalCode: '',
    street: '',
  });

  const setupData = (dataToSetup: Partial<TeacherDTO>) => {
    setFullData((prevData) => ({
      ...prevData,
      ...dataToSetup,
    }));
  };

  const currentForm: Record<number, ComponentType<ViewComponentProps>> = {
    1: RegisterTeacherForm,
    2: AddressInfoForm,
  };

  console.log(fullData);

  useDocumentTitle(
    `Zostań Korepetytorem | Mathey - Twój korepetytor matematyki online`,
  );

  const Form = currentForm[step];

  return (
    <div className="relative flex min-h-screen justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4 dark:from-gray-900 dark:to-indigo-950">
      <BackgroundDecoration />
      <div className="z-10 w-full max-w-2xl py-8">
        <div className="mb-6 text-center">
          <Link
            to={AppRoutes.Home}
            className="mb-2 inline-flex items-center text-blue-600 hover:underline dark:text-blue-400"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Powrót do strony głównej
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Zostań{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Korepetytorem
            </span>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Dołącz do naszego zespołu i pomagaj uczniom w nauce matematyki
          </p>
        </div>
        <div className="rounded-lg bg-white p-2 shadow-xl dark:bg-gray-800">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Card>
                <CardHeader>
                  <Stepper steps={3} current={step} />
                  <CardTitle>Zostań jednym z naszych nauczycieli!</CardTitle>
                  <CardDescription>
                    Podążaj za krokami i uzupełniaj dane aby zostać członkiem
                    naszej społeczności.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form
                    data={fullData}
                    setupData={setupData}
                    isCreatingTeacher={true}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
