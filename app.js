let client;
const ROOM_ID = "!JMaLzauHVEtDvETuQu:matrix.org";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  client = matrixcs.createClient("https://matrix.org");

  try {
    const response = await client.login("m.login.password", {
      user: username,
      password: password,
    });

    client = matrixcs.createClient({
      baseUrl: "https://matrix.org",
      accessToken: response.access_token,
      userId: response.user_id,
    });

    client.startClient();

    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("chat-screen").classList.remove("hidden");

    client.on("Room.timeline", function (event, room, toStartOfTimeline) {
      if (room.roomId === ROOM_ID && event.getType() === "m.room.message") {
        const msg = document.createElement("div");
        msg.textContent = event.getContent().body;
        document.getElementById("messages").appendChild(msg);
      }
    });

  } catch (err) {
    alert("Login failed");
  }
}

function sendMessage() {
  const text = document.getElementById("messageInput").value;
  client.sendEvent(ROOM_ID, "m.room.message", {
    msgtype: "m.text",
    body: text,
  });
  document.getElementById("messageInput").value = "";
}

function logout() {
  location.reload();
}

function joinVoice() {
  window.open("https://meet.jit.si/tgc-gray-voice", "_blank");
}
