import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default auth(async (req: NextRequest) => {
  // セッション情報を取得
  const session = await auth();
  
  // 未認証のユーザーはログインページにリダイレクト
  if (!session) {
    console.log("ユーザーは未認証です。ログインページにリダイレクトします。");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  // 認証済みの場合はそのまま次の処理へ進む
  return NextResponse.next();
});

// matcherで特定のパスにのみミドルウェアを適用
export const config = {
  matcher: ["/dashboard/:path*"],
};
