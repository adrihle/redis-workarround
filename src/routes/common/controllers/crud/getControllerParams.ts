const getControllerParam = (route: string) => {
  const sanitizedRoute = route.split(' ').join('');
  const controllerName =
    sanitizedRoute.charAt(0).toUpperCase() + sanitizedRoute.slice(1);
  return {
    sanitizedRoute,
    controllerName,
  };
};

export { getControllerParam };
