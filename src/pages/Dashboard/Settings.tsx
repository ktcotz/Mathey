import { UserSettings } from '../../features/student/Settings/UserSettings';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui';

export const Settings = () => {
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
