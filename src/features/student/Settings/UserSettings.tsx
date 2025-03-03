import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsTrigger,
  TabsList,
} from '../../../ui';
import { useAuth } from '../../account/context/useAuth';
import { GeneralSettings } from './views/GeneralSettings';

export const UserSettings = () => {
  const { user } = useAuth();

  return (
    <Card className="mx-auto w-full max-w-7xl">
      <CardHeader>
        <CardTitle>Ustawienia dla profilu - {user?.email}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="flex h-auto w-fit flex-wrap items-center justify-start">
            <TabsTrigger value="general">Ogólne</TabsTrigger>
            <TabsTrigger value="subjects">Przedmioty</TabsTrigger>
            <TabsTrigger value="notifications">Powiadomienia</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralSettings />
          </TabsContent>
          <TabsContent value="subjects">Przedmioty</TabsContent>
          <TabsContent value="notifications">Powiadomienia</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
