export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };
export const formatPotentiallyHazardous = (value: string): string => {
    if (value === 'Y') return 'Yes';
    if (value === 'N') return 'No';
    return '';
  };