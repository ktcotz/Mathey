import { TabsContent } from '@radix-ui/react-tabs';
import { BackgroundDecoration, Tabs, TabsList, TabsTrigger } from '../ui';

export const DashboardAdmin = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 py-12">
      <BackgroundDecoration />

      <div className="container mx-auto rounded-md bg-stone-50 p-4">
        <h1 className="mb-6 text-3xl font-bold">Panel Administratora</h1>

        <Tabs defaultValue="tutors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tutors">Korepetytorzy</TabsTrigger>
            <TabsTrigger value="users">Użytkownicy</TabsTrigger>
          </TabsList>

          <TabsContent value="tutors">Krepetytors</TabsContent>
          <TabsContent value="users">Users</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
