from database import SessionLocal, init_db, Workspace, Room, User
from auth import get_password_hash

def seed():
    init_db()
    db = SessionLocal()
    
    # Create a default workspace
    workspace = db.query(Workspace).filter(Workspace.slug == "general").first()
    if not workspace:
        workspace = Workspace(name="General Developers", slug="general")
        db.add(workspace)
        db.commit()
        db.refresh(workspace)
    
    # Create some rooms
    existing_rooms = db.query(Room).filter(Room.workspace_id == workspace.id).all()
    if not existing_rooms:
        rooms = [
            Room(name="General Chat", topic="Discuss anything dev related", workspace_id=workspace.id),
            Room(name="Python", topic="Python programming language", workspace_id=workspace.id),
            Room(name="Javascript/React", topic="Web development", workspace_id=workspace.id),
            Room(name="AI/LLMs", topic="Building with Gemini and other LLMs", workspace_id=workspace.id),
        ]
        db.add_all(rooms)
    
    # Create a test user
    existing_user = db.query(User).filter(User.email == "test@example.com").first()
    if not existing_user:
        user = User(
            name="Test User",
            email="test@example.com",
            password_hash=get_password_hash("password123"),
            workspace_id=workspace.id
        )
        db.add(user)
    
    db.commit()
    print("Database seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed()
