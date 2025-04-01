import { Badge } from '../../../ui';
import { SubjectSchemaType } from './schemas/SubjectsSchema';

export const SubjectBadge = ({ name }: SubjectSchemaType) => {
  return <Badge>{name}</Badge>;
};
