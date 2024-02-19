# Wikipedia Search and Analysis Tool

Welcome to the Wikipedia Search and Analysis Tool! This application allows users to search Wikipedia articles

## Features

* **Search Form:** Input box component for entering search text.
* **Search Results:** Displays search results with pagination.
* **Pagination:** Allows navigation through multiple pages of search results.
* **Componentization:** Utilizes atomic design principles for component structure.

## UI/UX Design

The Wikipedia Search and Analysis Tool offers a clean and intuitive user interface aimed at providing a seamless search experience. Key design principles include:

* **Simplicity:** The interface features a minimalist design with a focus on essential elements, making it easy for users to navigate and interact with the application.
* **Search Form:** A simple and intuitive search input box allows users to enter their search queries effortlessly. The debounce functionality ensures that search requests are optimized for performance by reducing unnecessary API calls while typing.
* **Search Results:** Fetched results are displayed in a clean and organized manner, providing users with relevant information in a structured format. The use of virtualized lists enhances performance by efficiently rendering large datasets, ensuring smooth scrolling and improved user experience.
* **Pagination:** The application incorporates pagination controls to navigate through multiple pages of search results, allowing users to explore a comprehensive set of articles. Pagination ensures that the user interface remains responsive and manageable, even with large datasets.
* **Responsiveness:** Tailwind CSS is employed to create a responsive layout, ensuring that the application adapts seamlessly to various screen sizes and devices. This responsiveness enhances accessibility and usability across different platforms, providing a consistent experience for all users.

Overall, the UI/UX design of the Wikipedia Search and Analysis Tool prioritizes simplicity, efficiency, and responsiveness, offering users a streamlined search experience with optimized performance and intuitive controls.

## Tech Stack and Packages choices

* **Next.js:** React framework for SPA application (this project bootstrapped with [`create-next-app`])
* **Node JS:** Created a custom server to get data from wiki using wiki API
* **Tailwind CSS:** Utility-first CSS framework used for styling the application's user interface, providing responsive and customizable designs with minimal CSS code.
* **Express:** Web framework for Node.js used to handle API requests and server-side routing.
* **React Virtual:** Library for efficiently rendering large lists used in this application to load results list.
* **UseHooks-ts:** Library for hooks-based utilities, i have utilisted useDebounce from this library for debouncing.
* **Axios:** Promise-based HTTP client for making API requests.
* **Sanitize-HTML:** Package for sanitizing HTML content, used in search input box
* **He:** Package for HTML entity decoding.
* **dompurify:** Package for sanitising html that is getting rendered on the browser, this avoids xss attacks.

## Optimization Techniques

* **Virtualization:** Uses`react-virtual` for rendering large lists efficiently.
* **Debouncing:** Implements debouncing to optimize API requests on input changes.
* **Pagination:** Implements server-side pagination to load data incrementally.

## Security Techniques

* **Sanitization:** Utilizes the`sanitize-html` and`dompurify` packages to sanitize HTML content and prevent XSS attacks.
* **HTTPS:** The application is served over HTTPS to ensure secure communication.
* **Rate Limiting:** Implemented rate limiting using express-rate-limit to prevent abuse, ensure fair usage of the server resources and protect against potential**`DDoS`** attacks.

## Server

The custom server is located inside `scripts/server.js`

## Development, testing and build

### Requirements

* Download code from drive or clone from github repository
* Node version 18 or above
* mkcert

```bash
git clone https://github.com/vittaljk/wikipedia-search
```

```bash
cd wikipedia-search
and
npm install
# or
yarn
```

### Running the development server:

```bash
mkcert localhost
and
npm run dev
# or
yarn dev
```

server starts at [https://localhost:443]()
if you find trouble loading the app, let us connect and i will help out

Note!: if it shows Not secure, please go ahead and select advanced, there could be problem with certificate generation for localhost

### To execute test cases

```bash
npm run test
# or
yarn test
```

### Production build

```bash
npm run build
# or
yarn build
```
