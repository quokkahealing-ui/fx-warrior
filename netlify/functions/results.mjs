// 테스트 결과를 저장하고 불러오는 함수 (Netlify Blobs 사용, 별도 DB 가입 필요 없음)
import { getStore } from "@netlify/blobs";

const CHARS = ["kurumi", "mochiko", "mebuki", "yasuko"];
const MAX = 1000; // 최대 보관 개수

export default async (req) => {
  const store = getStore({ name: "fx-results", consistency: "strong" });
  const list = (await store.get("all", { type: "json" })) || [];

  if (req.method === "GET") return Response.json(list);

  if (req.method === "POST") {
    let b;
    try { b = await req.json(); } catch { return new Response("bad json", { status: 400 }); }
    const nick = String(b.nick || "").trim().slice(0, 12);
    const total = Number(b.total);
    const rounds = Array.isArray(b.rounds) ? b.rounds.slice(0, 3).map(Number) : [];
    if (!nick || !CHARS.includes(b.char) || !Number.isFinite(total) || rounds.some((x) => !Number.isFinite(x))) {
      return new Response("invalid", { status: 400 });
    }
    const entry = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7), nick, char: b.char, total: Math.round(total), rounds, at: Date.now() };
    list.push(entry);
    while (list.length > MAX) list.shift();
    await store.setJSON("all", list);
    return Response.json({ id: entry.id, list });
  }
  return new Response("method not allowed", { status: 405 });
};

export const config = { path: "/api/results" };
