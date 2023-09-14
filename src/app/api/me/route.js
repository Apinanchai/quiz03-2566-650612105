import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Apinanchai yooyativong",
    studentId: "650612105",
  });
};
