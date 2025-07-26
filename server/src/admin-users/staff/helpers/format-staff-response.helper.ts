import { Staff } from '../entities/staff.entity';

export const formatStaffResponse = (staff: Staff) => {
  const {
    staffId,
    identityDocumentNumber,
    name,
    paternalSurname,
    maternalSurname,
    telephone,
    email,
    isActive,
  } = staff;
  return {
    staffId,
    identityDocumentNumber,
    name,
    paternalSurname,
    maternalSurname,
    telephone,
    email,
    isActive,
  };
};
