{
    "version": 2,
    "builds": [
      {
        "src": "server.js",
        "use": "@vercel/node",
        "config": {
          "maxDuration": 30,
          "memory": 1024
        }
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "/server.js"
      }
    ],
    "env": {
      "URI": "mongodb+srv://greatstack:LH4q9cYUxfJ4QDUn@cluster0.67jhg.mongodb.net/jwtnodejs"
    }
  }
  