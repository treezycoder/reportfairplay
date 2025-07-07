type User = {
  email: string;
  id: string;
};

const admins = [{ email: "treezyvarrick@gmail.com", password: "677147924" }];

export function updateAdmin(
  currentEmail: string,
  newEmail?: string,
  newPassword?: string
) {
  const index = admins.findIndex((admin) => admin.email === currentEmail);

  if (index === -1) return false;

  if (newEmail) admins[index].email = newEmail;
  if (newPassword) admins[index].password = newPassword;

  return true;
}

export async function getUser(
  email: string,
  password: string
): Promise<User | null> {
  const admin = admins.find(
    (a) => a.email === email && a.password === password
  );

  if (!admin) return null;

  return {
    email: admin.email,
    id: admin.email, // or any unique id if available
  };
}
