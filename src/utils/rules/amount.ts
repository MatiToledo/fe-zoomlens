export const rulesAmount = {
  required: true,
  pattern: {
    value: /^-?[0-9]+$/,
    message: `Ingrese un valor valido`,
  },
};
