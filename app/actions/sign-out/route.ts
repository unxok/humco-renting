"use server";

import sbRoute from "@/utils/supabase/SupabaseClients/sbRoute";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestURL = new URL(request.url);
  const db = sbRoute();
  await db.auth.signOut();
  return NextResponse.redirect(requestURL.origin + "/login");
}
