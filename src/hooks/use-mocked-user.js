export const useMockedUser = () => {
  // To get the user from the authContext, you can use
  const { user } = useAuth();
  return {
    id: user,
    avatar: '/assets/avatars/avatar-anika-visser.png',
    name: 'Anika Visser',
    email: 'anika.visser@devias.io'
  };
};
