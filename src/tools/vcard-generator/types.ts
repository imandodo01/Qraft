export interface VCardContact {
  formattedName: string;
  givenName: string;
  familyName: string;
  organization: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
}

export type VCardValidationResult =
  | { valid: true }
  | { valid: false; field: keyof VCardContact; message: string };

export function createEmptyContact(): VCardContact {
  return {
    formattedName: "",
    givenName: "",
    familyName: "",
    organization: "",
    jobTitle: "",
    email: "",
    phone: "",
    website: "",
  };
}
