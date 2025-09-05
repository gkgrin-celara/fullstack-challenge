# Full Stack Developer Challenge

## Steps to start the project

Project is prepared to be executed with a Docker setup
docker-compose.yml has three services:
* Backend: Node + Express application
* Frontend: React + Vite application
* MongoDB: simple MongoDB, with user/pass root/root


## Activities:
### Fixes
1. Start the project either through the compose file or executing locally. Using compose is recommended unless you already have a MongoDB server
1. Open the front end at http://localhost:3000. You'll notice that it performs a healthcheck. The healthcheck is not working properly. Fix it so it shows current backend status
1. Add a second component to show database status. Verify it turning off the database
1. There are two API routes, Notes and URLs. Both store and retrieve respective entities, but the date is not being set automatically. Fix it.

### URLs
1. URL is supposed to be used for a short url generator. Implement the following:
    1. The POST /api/urls should receive only the regular URL, store it in the database, and return the full object. It's currently mocked, and returns a static object
    1. There should be a lookup for short URLs, where you hit with the short URL and you get the full URL stored in the DB. It's currently set in the GET urls/:id, but it's just mocked, and returns a static object
    1. If the short URL was created more than a week ago, result should inform that the short URL has expired
1. In the Frontend, there is a section where you can test both features, the Short URL creation and the Full URL retrieval. Make them work
1. In the backend, when creating a short url, add a 5 seconds delay. In the front end, handle that and showing a gut"Generating Short URL..." state until it's available
