import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  readDB();

  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: DB.rooms.length,
  });
};

export const POST = async (request) => {
  const payload = checkToken();
  const rawAuthHeader = headers().get("authorization");
  let role = null;
  role = payload.role;

  if (role !== "ADMIN" || role !== "SUPER_ADMIN")
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();

  const body = await request.json();
  const { roomName } = body;

  const foundRoomId = DB.rooms.find(
    (x) => x.roomId === roomId && x.roomName === roomName
  );
  if (foundRoomId) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room ${"replace this with room name"} already exists`,
      },
      { status: 400 }
    );
  }
  // const roomId = nanoid();

  DB.rooms.push({
    roomId,
  });

  const token = jwt.sign(
    { username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  //call writeDB after modifying Database
  writeDB();

  if (!foundRoomId) {
    return NextResponse.json({
      ok: true,
      roomId: token,
      message: `Room ${"replace this with room name"} has been created`,
    });
  }
};
