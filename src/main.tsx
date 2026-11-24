import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Shell } from "./components/Shell";
import { Contact, Education, Home, NotFound, Project, ProjectDetail, Skill, Work } from "./pages/lazy";
import "./styles.css";

const router = createBrowserRouter([
  {
    element: <Shell />,
    children: [
      { index: true, element: <Home /> },
      { path: "info", element: <Navigate to="/" replace /> },
      { path: "work", element: <Work /> },
      { path: "skill", element: <Skill /> },
      { path: "project", element: <Project /> },
      { path: "project/:slug", element: <ProjectDetail /> },
      { path: "education", element: <Education /> },
      { path: "contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
