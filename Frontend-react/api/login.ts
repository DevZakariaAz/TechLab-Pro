// api/login.ts

const users = [
  { email: "test@example.com", password: "123456" },
  { email: "zakaria@dev.com", password: "password" },
];

export const login = (email: string, password: string) => {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  return user ? { success: true, user } : { success: false };
};
