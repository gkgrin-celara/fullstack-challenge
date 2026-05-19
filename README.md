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

### URL Management (Advanced)
1. Add ability to **delete URLs** from the stored list:
    1. Backend: Add DELETE `/api/urls/:id` endpoint to remove a URL from the database
    1. Frontend: Add a delete button on each URL card that removes it from the list and database
    1. Handle loading state and errors properly
1. Add ability to **retrieve/view full URL details**:
    1. Backend: Enhance the URL object to include metadata (creation date, expiration status, access count)
    1. Frontend: Show expanded view or modal when clicking a URL card with all details

### TypeScript Migration
Convert the entire project from JavaScript to TypeScript. This includes:
1. Backend:
    1. Rename all `.js` files to `.ts`
    1. Create `tsconfig.json` with appropriate Node configuration
    1. Install TypeScript dependencies: `typescript`, `ts-node`, `@types/express`, `@types/node`
    1. Add type annotations to all routes, models, and middleware
    1. Update `package.json` scripts to use `ts-node` for development
1. Frontend:
    1. Rename all `.jsx` files to `.tsx` and `.js` files to `.ts`
    1. Add proper React type annotations (props, state, hooks)
    1. Install TypeScript dependencies: `typescript`, `@types/react`, `@types/react-dom`
    1. Update Vite config if needed (should work out of the box)
    1. Fix any type errors that emerge during conversion

### UI Refactor with Ant Design
Replace inline CSS styles with Ant Design (antd) components to match production patterns:
1. Install dependencies:
    1. `npm install antd @ant-design/icons`
1. Refactor components:
    1. Replace `<input>` with `<Input>` components wrapped in `<Form.Item>`
    1. Replace `<button>` with Ant `<Button>` components
    1. Replace `<ul>` lists with `<Table>` or `<List>` components
    1. Use `<Form>` component for form handling (Notes and URLs forms)
    1. Replace error display with `<Alert>` components
    1. Use `<Spin>` for loading states
    1. Add `<Popconfirm>` or `<Modal>` for delete confirmations
1. Test responsive design and component interactions
