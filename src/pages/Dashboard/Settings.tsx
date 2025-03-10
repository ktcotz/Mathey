import { useDocumentTitle } from 'usehooks-ts';
import { UserSettings } from '../../features/student/Settings/UserSettings';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui';

export const Settings = () => {
  useDocumentTitle(`Ustawienia | Mathey - Twój korepetytor matematyki online`);

  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <CardTitle>Ustawienia profilu</CardTitle>
        </CardHeader>
        <CardContent>
          <UserSettings />
        </CardContent>
      </Card>
    </div>
  );
};
