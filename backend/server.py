import os
import base64
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Ethan Bwibo Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────
# Spotify
# ──────────────────────────────
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing"


def get_spotify_access_token():
    client_id = os.environ.get("SPOTIFY_CLIENT_ID", "")
    client_secret = os.environ.get("SPOTIFY_CLIENT_SECRET", "")
    refresh_token = os.environ.get("SPOTIFY_REFRESH_TOKEN", "")

    creds = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    resp = requests.post(
        SPOTIFY_TOKEN_URL,
        headers={
            "Authorization": f"Basic {creds}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data={"grant_type": "refresh_token", "refresh_token": refresh_token},
        timeout=10,
    )
    return resp.json().get("access_token")


@app.get("/api/spotify")
async def get_now_playing():
    try:
        access_token = get_spotify_access_token()
        if not access_token:
            return {"isPlaying": False}

        resp = requests.get(
            SPOTIFY_NOW_PLAYING_URL,
            headers={"Authorization": f"Bearer {access_token}"},
            timeout=10,
        )

        if resp.status_code in (204, 404):
            return {"isPlaying": False}

        song = resp.json()
        if not song or not song.get("item"):
            return {"isPlaying": False}

        return {
            "isPlaying": song["is_playing"],
            "title": song["item"]["name"],
            "artist": ", ".join(a["name"] for a in song["item"]["artists"]),
            "album": song["item"]["album"]["name"],
            "albumArt": song["item"]["album"]["images"][0]["url"]
            if song["item"]["album"]["images"]
            else None,
            "songUrl": song["item"]["external_urls"]["spotify"],
        }
    except Exception as e:
        print(f"Spotify error: {e}")
        return {"isPlaying": False}


# ──────────────────────────────
# GitHub
# ──────────────────────────────
KNOWN_REPOS = [
    "mohi-chatbot",
    "Hilton-the-Artist",
    "Google-Workspace-Automation-Suite",
    "AgriTour-Android-App",
    "Portfolio-Website",
    "Hilda-s-Recipes-Project",
]


@app.get("/api/github")
async def get_github_commits():
    username = os.environ.get("GITHUB_USERNAME", "EthanBwibo")
    commits = []

    try:
        for repo in KNOWN_REPOS:
            if len(commits) >= 6:
                break
            resp = requests.get(
                f"https://api.github.com/repos/{username}/{repo}/commits?per_page=2",
                headers={
                    "Accept": "application/vnd.github.v3+json",
                    "User-Agent": "ethan-bwibo-portfolio",
                },
                timeout=8,
            )
            if resp.status_code != 200:
                continue

            for c in resp.json()[:2]:
                msg = c["commit"]["message"].split("\n")[0][:65]
                commits.append(
                    {
                        "repo": repo,
                        "message": msg,
                        "date": c["commit"]["author"]["date"],
                        "sha": c["sha"][:7],
                    }
                )
                if len(commits) >= 6:
                    break

        return {"commits": commits, "username": username}
    except Exception as e:
        print(f"GitHub error: {e}")
        return {"commits": [], "username": username}


# ──────────────────────────────
# Contact / Resend Email
# ──────────────────────────────
class ContactForm(BaseModel):
    name: str
    email: str
    subject: str
    message: str


def build_email_html(heading: str, body_html: str) -> str:
    return f"""
    <div style="font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);">
        <div style="background:linear-gradient(135deg,#FFD700 0%,#FFA500 100%);color:#0a0a0a;padding:28px;text-align:center;">
          <h1 style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Ethan Bwibo</h1>
          <p style="margin:4px 0 0;font-size:13px;opacity:0.75;">Software Developer &amp; Data Analyst</p>
        </div>
        <div style="padding:28px;color:#333333;font-size:15px;line-height:1.6;">
          <h2 style="color:#B8860B;margin-top:0;">{heading}</h2>
          {body_html}
        </div>
        <div style="background:#f9fafb;padding:16px;text-align:center;font-size:13px;color:#888;border-top:1px solid #eee;">
          <a href="https://www.linkedin.com/in/ethan-bwibo/" style="color:#B8860B;text-decoration:none;margin:0 8px;">LinkedIn</a> ·
          <a href="https://github.com/EthanBwibo" style="color:#B8860B;text-decoration:none;margin:0 8px;">GitHub</a>
        </div>
      </div>
    </div>
    """


@app.post("/api/contact")
async def send_contact_email(form: ContactForm):
    import resend as resend_module

    resend_module.api_key = os.environ.get("RESEND_API_KEY", "")

    msg_html = form.message.replace("\n", "<br>")

    notification_body = f"""
        <p><strong>From:</strong> {form.name}</p>
        <p><strong>Email:</strong> <a href="mailto:{form.email}" style="color:#B8860B;">{form.email}</a></p>
        <p><strong>Subject:</strong> {form.subject}</p>
        <div style="background:#fffbea;border-left:4px solid #FFD700;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;">
          {msg_html}
        </div>
        <p style="font-size:13px;color:#888;margin-top:16px;">Sent from your portfolio contact form.</p>
    """

    try:
        resend_module.Emails.send(
            {
                "from": "Portfolio Contact <onboarding@resend.dev>",
                "to": ["enbwibo@gmail.com"],
                "reply_to": form.email,
                "subject": f"[Portfolio] {form.subject}",
                "html": build_email_html("New Portfolio Message", notification_body),
            }
        )
    except Exception as e:
        print(f"Notification email error: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email. Please try again.")

    # Auto-reply to the sender — best effort
    try:
        auto_reply_body = f"""
            <p>Hi {form.name},</p>
            <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
            <p><strong>Subject:</strong> {form.subject}</p>
            <div style="background:#fffbea;border-left:4px solid #FFD700;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;">
              {msg_html}
            </div>
            <p>Best regards,<br><strong>Ethan Bwibo</strong><br>
            <a href="https://www.linkedin.com/in/ethan-bwibo/" style="color:#B8860B;">LinkedIn</a> &middot;
            <a href="https://github.com/EthanBwibo" style="color:#B8860B;">GitHub</a></p>
        """
        resend_module.Emails.send(
            {
                "from": "Ethan Bwibo <onboarding@resend.dev>",
                "to": [form.email],
                "subject": f"Thanks for reaching out, {form.name}!",
                "html": build_email_html(f"Hi {form.name}!", auto_reply_body),
            }
        )
    except Exception as e:
        print(f"Auto-reply error (non-fatal): {e}")

    return {"success": True, "message": "Message sent successfully!"}


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "ethan-bwibo-portfolio-api"}
