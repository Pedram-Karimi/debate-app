export async function POST(req: Request) {
  const { email, password, username, handle } = await req.clone().json();
}
