import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Person = {
  name: string;
  id: string;
};

type PeopleContextType = {
  people: Person[];
  setPeople: (data: Person[]) => void;
  refreshPeopleFromStorage: () => Promise<void>;
  clearPeople: () => void;
};

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [people, setPeopleState] = useState<Person[]>([]);

  const setPeople = (data: Person[]) => {
    setPeopleState(data);
    AsyncStorage.setItem('people_data', JSON.stringify(data)).catch(err =>
      console.error('Failed to save people data', err),
    );
  };

  const clearPeople = async () => {
    setPeopleState([]);
    try {
      await AsyncStorage.removeItem('people_data');
    } catch (err) {
      console.error('Failed to clear people data', err);
    }
  };

  const loadPeopleFromStorage = async () => {
    try {
      const stored = await AsyncStorage.getItem('people_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPeopleState(parsed);
      }
    } catch (err) {
      console.error('Failed to load people data', err);
    }
  };

  useEffect(() => {
    loadPeopleFromStorage();
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        refreshPeopleFromStorage: loadPeopleFromStorage,
        clearPeople,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);
  if (!context) {
    throw new Error('usePeople must be used within a PeopleProvider');
  }
  return context;
};
