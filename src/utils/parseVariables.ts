export const parseVariables = (variablesString: string) => {
  try {
    return variablesString ? JSON.parse(variablesString) : {};
  } catch (error) {
    console.error('Error parsing variables:', error);
    return null;
  }
};
