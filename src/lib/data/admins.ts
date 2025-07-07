// Mutable test credentials
let testEmail = "treezyvarrick@gmail.com";
let testPassword = "677147924";

// Update admin credentials
export function updateAdmin(
  currentEmail: string,
  newEmail?: string,
  newPassword?: string
): boolean {
  if (currentEmail !== testEmail) return false;

  if (newEmail) testEmail = newEmail;
  if (newPassword) testPassword = newPassword;

  return true;
}

// Fetch user (for login)
export async function getUser(
  email: string,
  password: string
): Promise<{ email: string; id: string } | null> {
  if (email === testEmail && password === testPassword) {
    return { email, id: email };
  }

  return null;
}
