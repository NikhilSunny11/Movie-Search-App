import { useState, useEffect } from 'react';

const PROFILE_KEY = 'cinesearch_profile';

export function useProfile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : { username: 'Guest', customLists: [] };
  });

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateUsername = (username) => {
    setProfile(prev => ({ ...prev, username }));
  };

  const addCustomList = (listName) => {
    if (!listName || listName.trim() === '') return;
    const name = listName.trim();
    setProfile(prev => {
      if (prev.customLists.includes(name)) return prev;
      return { ...prev, customLists: [...prev.customLists, name] };
    });
  };

  const removeCustomList = (listName) => {
    setProfile(prev => ({
      ...prev,
      customLists: prev.customLists.filter(name => name !== listName)
    }));
  };

  return { 
    username: profile.username, 
    customLists: profile.customLists, 
    updateUsername, 
    addCustomList, 
    removeCustomList 
  };
}
