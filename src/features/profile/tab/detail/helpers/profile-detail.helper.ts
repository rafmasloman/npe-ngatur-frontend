export const getUserPosition = (role: string) => {
  if (role === 'PROJECT_MANAGER') {
    return 'Project Manager';
  } else {
    return 'Staff';
  }
};
