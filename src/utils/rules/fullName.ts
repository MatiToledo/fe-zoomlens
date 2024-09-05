export const rulesFullName = {
  required: true,
  pattern: {
    value: /^[A-Za-z\u00C0-\u017F\s]+$/,
    message: `Ingrese un nombre válido`,
  },
  validate: (value: string) => {
    const names = value.trim().split(" ");
    if (names.length < 2) {
      return "Ingrese tanto el nombre como el apellido";
    }
    return true;
  },
};
