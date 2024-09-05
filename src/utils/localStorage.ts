export function getLSToken(type: "user" | "backoffice") {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(
      type === "user" ? "token" : "token_backoffice"
    );
    return token;
  }
}
export function saveLSToken(token: string, type: "user" | "backoffice") {
  localStorage.setItem(type === "user" ? "token" : "token_backoffice", token);
}

export function removeLSToken(type: "user" | "backoffice") {
  localStorage.removeItem(type === "user" ? "token" : "token_backoffice");
}
