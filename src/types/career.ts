import React from 'react';

export interface Job {
  id: string;
  title: string;
  fullTitle: string;
  category: string;
  department: string;
  type: string;
  experience: string;
  location: string;
  icon: React.ReactNode;
  accentColor: string;
  avatar: string;
  skills: string[];
  summary: string;
  responsibilities: string[];
}

export interface ApplicationFormData {
  fullName: string;
  phone: string;
  email: string;
  role: string;
  experience: string;
  resumeFileName: string;
  coverNote?: string;
}
