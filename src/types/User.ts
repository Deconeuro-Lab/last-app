// IMPORTANT: whenever changes are made here, make sure the data model on the server-side is consistent

interface Examiner {
  firstName: string;
  lastName: string;
  sessionID: string;
}

interface Patient {
  firstName: string;
  lastName: string;
  sessionID: string;
}

// TODO: export the User namespace
export type {Examiner, Patient};
