from database import SessionLocal, init_db, Workspace, Room, User, Message
from auth import get_password_hash
from datetime import datetime, timedelta
import random

def seed():
    init_db()
    db = SessionLocal()
    
    # Create workspaces
    workspaces = {}
    workspace_data = [
        {"name": "General Developers", "slug": "general"},
        {"name": "DevOps Team", "slug": "devops"},
        {"name": "Frontend Guild", "slug": "frontend"},
    ]
    
    for ws_data in workspace_data:
        existing = db.query(Workspace).filter(Workspace.slug == ws_data["slug"]).first()
        if not existing:
            ws = Workspace(name=ws_data["name"], slug=ws_data["slug"])
            db.add(ws)
            db.commit()
            db.refresh(ws)
            workspaces[ws_data["slug"]] = ws
        else:
            workspaces[ws_data["slug"]] = existing
    
    # Create test users across workspaces
    users = {}
    user_data = [
        {"name": "Test User", "email": "test@example.com", "workspace": "general"},
        {"name": "Alice Developer", "email": "alice@example.com", "workspace": "general"},
        {"name": "Bob Engineer", "email": "bob@example.com", "workspace": "general"},
        {"name": "Carol DevOps", "email": "carol@example.com", "workspace": "devops"},
        {"name": "David Frontend", "email": "david@example.com", "workspace": "frontend"},
        {"name": "Eve Fullstack", "email": "eve@example.com", "workspace": "general"},
    ]
    
    for user_info in user_data:
        existing = db.query(User).filter(User.email == user_info["email"]).first()
        if not existing:
            user = User(
                name=user_info["name"],
                email=user_info["email"],
                password_hash=get_password_hash("password123"),
                workspace_id=workspaces[user_info["workspace"]].id
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            users[user_info["email"]] = user
        else:
            users[user_info["email"]] = existing
    
    # Create rooms for each workspace
    rooms_data = {
        "general": [
            {"name": "General Chat", "topic": "Discuss anything dev related"},
            {"name": "Python", "topic": "Python programming language"},
            {"name": "Javascript/React", "topic": "Web development with React"},
            {"name": "AI/LLMs", "topic": "Building with Gemini and other LLMs"},
        ],
        "devops": [
            {"name": "Infrastructure", "topic": "DevOps and infrastructure discussion"},
            {"name": "CI/CD Pipeline", "topic": "Continuous integration and deployment"},
            {"name": "Kubernetes", "topic": "Container orchestration"},
        ],
        "frontend": [
            {"name": "React Best Practices", "topic": "React patterns and optimization"},
            {"name": "CSS & UI Components", "topic": "Styling and component design"},
            {"name": "Performance", "topic": "Frontend performance optimization"},
        ]
    }
    
    rooms = {}
    for ws_slug, room_list in rooms_data.items():
        for room_info in room_list:
            existing = db.query(Room).filter(
                Room.workspace_id == workspaces[ws_slug].id,
                Room.name == room_info["name"]
            ).first()
            if not existing:
                room = Room(
                    name=room_info["name"],
                    topic=room_info["topic"],
                    workspace_id=workspaces[ws_slug].id
                )
                db.add(room)
                db.commit()
                db.refresh(room)
                rooms[room_info["name"]] = room
            else:
                rooms[room_info["name"]] = existing
    
    # Create mock messages with timestamps
    sample_conversations = {
        "General Chat": [
            ("alice@example.com", "Hey everyone! Just got started with the new project"),
            ("bob@example.com", "Welcome! Happy to have you on the team"),
            ("eve@example.com", "@ai What are the best practices for REST API design?"),
            ("alice@example.com", "Looking forward to learning from you all"),
            ("bob@example.com", "Check out our wiki for onboarding docs"),
        ],
        "Python": [
            ("test@example.com", "Has anyone tried the new Python 3.12 features?"),
            ("alice@example.com", "Yes! The type hints improvements are amazing"),
            ("eve@example.com", "@ai Can you explain Python's async/await in simple terms?"),
            ("bob@example.com", "Pattern matching is also a great addition"),
            ("test@example.com", "Let's schedule a Python workshop next month"),
        ],
        "Javascript/React": [
            ("david@example.com", "Just upgraded react to v19, smooth transition"),
            ("alice@example.com", "Did you encounter any breaking changes?"),
            ("eve@example.com", "@ai How do I optimize React component rendering?"),
            ("david@example.com", "Not too bad, mostly just updated hooks"),
            ("bob@example.com", "Let me know if you need help with migration"),
        ],
        "AI/LLMs": [
            ("eve@example.com", "Started experimenting with Gemini for code generation"),
            ("alice@example.com", "How are the results compared to other models?"),
            ("eve@example.com", "@ai What are the token limits for different Gemini models?"),
            ("test@example.com", "Gemini seems to handle code pretty well"),
            ("bob@example.com", "We should document our findings in a case study"),
        ],
    }
    
    # Add messages with spread out timestamps (last 30 days)
    base_time = datetime.utcnow()
    for room_name, messages in sample_conversations.items():
        if room_name in rooms:
            for idx, (user_email, content) in enumerate(messages):
                existing_msg = db.query(Message).filter(
                    Message.room_id == rooms[room_name].id,
                    Message.content == content
                ).first()
                if not existing_msg:
                    # Spread messages across the last 30 days
                    msg_time = base_time - timedelta(days=30 - (idx * 6))
                    
                    is_ai = content.startswith("@ai")
                    user_id = users[user_email].id if user_email in users else None
                    
                    message = Message(
                        content=content,
                        room_id=rooms[room_name].id,
                        user_id=user_id if not is_ai else None,
                        is_ai=is_ai,
                        timestamp=msg_time
                    )
                    db.add(message)
            db.commit()
    
    print("✅ Database seeded successfully!")
    print(f"   Created {len(workspaces)} workspaces")
    print(f"   Created {len(users)} users")
    print(f"   Created {len(rooms)} rooms")
    db.close()

if __name__ == "__main__":
    seed()

