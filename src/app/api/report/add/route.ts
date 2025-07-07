import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { addReport } from "@/lib/data/reports";

export async function POST(req: NextRequest) {
  //   const session = await auth();
  //   if (!session)
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const token = body.recaptchaToken;

  if (!token) {
    return new Response(JSON.stringify({ message: "Token manquant" }), {
      status: 400,
    });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const googleCheck = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secret}&response=${token}`,
    }
  );

  const googleResponse = await googleCheck.json();

  if (!googleResponse.success || googleResponse.score < 0.5) {
    return new Response(
      JSON.stringify({ message: "Échec de la vérification reCAPTCHA" }),
      { status: 403 }
    );
  }

  const report = {
    ...body,
    id: uuidv4(),
    date: new Date().toISOString(),
  };

  addReport(report);

  return NextResponse.json({ message: "Report added", report });
}
