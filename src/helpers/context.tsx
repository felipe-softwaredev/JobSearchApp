'use client';

import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

type userType = {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  applications?: {
    createddAt: Date | null;
    jobId: number;
    job: {
      id: number;
      title: string;
      salary: number | null;
      equity: number | null;
      company_handle: string;
    };
  }[];
} | null;

type applicationsType =
  | {
      applications?: {
        createddAt: Date | null;
        jobId: number;
        job: {
          id: number;
          title: string;
          salary: number | null;
          equity: number | null;
          company_handle: string;
        };
      }[];
    }[];

type applicationsId = number[];

type contextDefaultType = {
  currentUser: userType | null;
  setCurrentUser: Dispatch<SetStateAction<userType | null>>;
  applications: applicationsType | [];
  setApplications: Dispatch<SetStateAction<applicationsType | []>>;
  applicationsId: applicationsId | null;
  setApplicationsId: Dispatch<SetStateAction<applicationsId | []>>;
};

const AppContext = createContext<contextDefaultType | null>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [currentUser, setCurrentUser] = useState<userType | null>(null);
  let [applications, setApplications] = useState<applicationsType | []>([]);
  let [applicationsId, setApplicationsId] = useState<applicationsId | []>([]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        applications,
        setApplications,
        applicationsId,
        setApplicationsId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

// type userType = {
//   first_name: string;
//   last_name: string;
//   email: string;
//   applications?: {
//     createddAt: Date | null;
//     job: {
//       id: number;
//       title: string;
//       salary: number | null;
//       equity: number | null;
//       company_handle: string;
//     };
//   }[];
// } | null;

// type contextDefaultType = {
//   currentUser: userType;
//   setCurrentUser: Dispatch<SetStateAction<userType | null>>;
// } | null;
