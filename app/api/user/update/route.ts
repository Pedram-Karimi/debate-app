export async function POST(req: any) {
  const { id, usernameInput } = await req.clone().json();

  const token = req.cookies["next-auth.session-token"];
  console.log(token, ">>>>>>>>>>>>>>>>>>>>");
  return { token: " " };
}
