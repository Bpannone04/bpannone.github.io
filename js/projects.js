// Shared project data for home page and projects page
// Edit the array below to change project cards.
// - description: short summary on the card
// - detail: full content in the modal when the card is clicked (optional; falls back to description)
export const projects = [
    {
        title: "Gym Management Software",
        description: "Designed and built an application for managing Gyms. Utilized JavaScript and Node.js, along with MySQL for the database. Designed the database to follow business rules and properly configured all tables and keys.",
        detail: "The problem I aimed to solve was the ease of checking in at the gym, signing up for classes, and managing the gym. I found a lack of comprehensive software that covered all of these aspects, which led me to develop this program.\n\n" +
            "My solution to this problem was to build a database management system that would allow gyms to control which classes are published and which notifications are sent to users, as well as gym information such as location, hours of operation, and name. It also allows users to select membership types and for gym staff to set membership statuses. To tackle this problem, I used tools such as JavaScript and Node.js, MySQL for the database, and Docker for local development instances.\n\n" +
            "Technologies Used:\n" +
            "• JavaScript\n" +
            "• Node.js\n" +
            "• MySQL\n" +
            "• Docker\n\n" +
            "My Role: Lead Developer and Designer",
        tags: ["JavaScript", "Node.js", "MySQL"],
        gallery: [
            "images/GymManagement/home-screen.png",
            "images/GymManagement/user-dashboard.png",
            "images/GymManagement/user-notifications.png",
            "images/GymManagement/manager-dashboard.png",
            "images/GymManagement/manager-user-information-dashboard.png",
            "images/GymManagement/manager-classes-dashboard.png",
            "images/GymManagement/manager-rooms-dashboard.png",
            "images/GymManagement/manager-notifications-dashboard.png",
        ],
    },
    {
        title: "Real-Time Portfolio Analytics",
        description: "I am currently designing a desktop application that will allow users to import their portfolios from E*TRADE or manually enter this information. Once the system has this information, it will provide different analytics and allow users to test how a potential trade will perform. This will be done through a series of calculations that pull data from a real-time market data API.",
        detail: "There is a lack of tools for risk assessment with real-time portfolios as the markets change, and many broker platforms fail to provide deeper insight into this volatility. The interest in this project stems explicitly from the ability to work with multiple APIs, data visualization, and real-time systems to solve a problem.\n\n" +
            "Implementation for this project will take place as a desktop application built with Electron, with a frontend developed in React. Users can load a portfolio in two ways: manually enter the information or link their E*TRADE account to load it from the platform. Real-time analytics will be calculated using portfolio information with live market data. Some of the data presented will be value at risk (VaR), portfolio volatility, and asset allocation exposure. Information will be presented in an easy-to-understand, interactive way. Some of the expected tasks include securely authenticating with E*TRADE, connecting to live market data, designing visualizations, and computing various metrics.\n\n" +
            "Technologies Used:\n" +
            "• Node.js and SQL (Backend)\n" +
            "• React and Tailwind (Frontend)\n" +
            "• Electron (For the desktop application)\n" +
            "• PostgreSQL (Database)\n" +
            "• E*TRADE API and a live market API (For portfolio and market data)\n" +
            "• OAuth and Visualizations libraries (For authentication and visualization)\n\n" +
            "My Role: Lead Developer and Designer",
        tags: ["Node.js", "PostgreSQL", "Electron", "In Progress"],
        gallery: [
            "images/Real-TimePortfolioAnalytics/Real-time portfolio log in.png",
            "images/Real-TimePortfolioAnalytics/Real-time portfolio home page.png",
        ],
    },
    {
        title: "Personal Portfolio Website",
        description: "This personal website uses TypeScript and Tailwind CSS to create a modern, responsive design. It highlights clean layouts, follows best practices, and includes dynamic content, image galleries, and a layout that works well on any device.",
        detail: "I built this website mainly because I wanted to learn TypeScript and use Tailwind. After some thought, I also needed a personal website to accompany my resume, so working on this project made sense.\n\n" +
            "My first step in creating this site was to figure out the design, so I sketched out some ideas and went from there. I then began learning TypeScript and Tailwind and started building the pages. I also decided to use GitHub Pages to host the site, which meant I would need to compile TypeScript to JavaScript to make it live. So I learned how to set up a GitHub action that compiles TypeScript to JavaScript whenever I merge the develop branch into the main branch, so the changes go live.\n\n" +
            "Technologies Used:\n" +
            "• TypeScript\n" +
            "• Tailwind\n" +
            "• GitHub Actions\n\n" +
            "My Role: Lead Developer and Designer",
        tags: ["TypeScript", "Tailwind CSS"],
    },
];
