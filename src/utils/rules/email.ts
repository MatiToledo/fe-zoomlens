export const rulesEmail = {
  required: true,
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: `Ingresa un email válido`,
  },
};
