from fastapi import FastAPI
from .app.routes import auth, rooms, ws, reactions, users, roles, settings

app = FastAPI(title="Dev Chatrooms API")

app.include_router(auth.router, tags=["auth"])
app.include_router(rooms.router, tags=["rooms"])
app.include_router(ws.router, tags=["websocket"])
app.include_router(reactions.router, tags=["reactions"])
app.include_router(users.router, tags=["users"])
app.include_router(roles.router, tags=["roles"])
app.include_router(settings.router, tags=["settings"])

@app.get("/")
async def root():
    return {"message": "Welcome to Dev Chatrooms API"}
