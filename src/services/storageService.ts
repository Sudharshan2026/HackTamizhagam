import { AssessmentResults } from '../types/assessment';

export function saveAssessmentData(data: AssessmentResults): void {
  const filename = `${data.username}.json`;
  const jsonString = JSON.stringify(data, null, 2);
  
  // Create a Blob containing the JSON data
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element and trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
  // Store in localStorage for persistence
  try {
    localStorage.setItem(`assessment_${data.username}`, jsonString);
  } catch (error) {
    console.error('Failed to store assessment data in localStorage:', error);
  }
}

export function getStoredAssessmentData(username: string): AssessmentResults | null {
  try {
    const data = localStorage.getItem(`assessment_${username}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to retrieve assessment data from localStorage:', error);
    return null;
  }
}