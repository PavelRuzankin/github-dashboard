export const getEventMethod = (str) => "on" + str.split('')[0].toUpperCase() + str.slice(1)
