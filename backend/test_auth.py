import httpx
import asyncio

async def test_auth():
    async with httpx.AsyncClient(base_url="http://localhost:8001") as client:
        # 1. Signup
        print("Testing Signup...")
        signup_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword"
        }
        res = await client.post("/signup", json=signup_data)
        print(f"Signup Status: {res.status_code}")
        print(f"Signup Response: {res.json()}")

        # 2. Login
        print("\nTesting Login...")
        login_data = {
            "username": "testuser",
            "password": "testpassword"
        }
        res = await client.post("/login", data=login_data)
        print(f"Login Status: {res.status_code}")
        token = res.json().get("access_token")
        print(f"Login Token: {token}")

        # 3. Get Me
        print("\nTesting /me...")
        headers = {"Authorization": f"Bearer {token}"}
        res = await client.get("/me", headers=headers)
        print(f"Get Me Status: {res.status_code}")
        print(f"Get Me Response: {res.json()}")

if __name__ == "__main__":
    asyncio.run(test_auth())
