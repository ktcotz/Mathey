import { Badge } from '../../../ui';
import { SUBJECTS_NAMES } from './constants';
import { SubjectsType } from './schemas/SubjectsSchema';

type SubjectBadgeProps = {
  subject: SubjectsType;
};

export const SubjectBadge = ({ subject }: SubjectBadgeProps) => {
  return <Badge>{SUBJECTS_NAMES[subject]}</Badge>;
};
