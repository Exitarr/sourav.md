import { lazy } from "react";

// Each page is its own chunk, shared by the router and the terminal's inline output.
export const Home = lazy(() => import("./Home"));
export const Info = lazy(() => import("./Info"));
export const Work = lazy(() => import("./Work"));
export const Skill = lazy(() => import("./Skill"));
export const Project = lazy(() => import("./Project"));
export const ProjectDetail = lazy(() => import("./ProjectDetail"));
export const Education = lazy(() => import("./Education"));
export const Contact = lazy(() => import("./Contact"));
export const NotFound = lazy(() => import("./NotFound"));
