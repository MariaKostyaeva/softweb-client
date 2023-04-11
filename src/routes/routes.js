import {
    ABOUT_ROUTE, ACCOUNT_DETAILS_ROUTE,
    ADMIN_ROUTE, ALL_PROGRAM_ROUTE,
    CATALOG_ROUTE, CATEGORY_ROUTE, CREATE_PROGRAM_ROUTE,
    DEVELOPER_ROUTE, FRONT_PAGE_ROUTE,
    LOGIN_ROUTE, PROGRAM_ROUTE,
    REGISTRATION_ROUTE, SEARCH_PAGE_ROUTE
} from "./consts";
import Catalog from "../pages/Catalog";
import Authorization from "../pages/Authorization";
import About from "../pages/About";
import ProgramPage from "../pages/ProgramPage/ProgramPage";
import DeveloperPage from "../pages/DeveloperPage";
import AllProgramPage from "../pages/AllProgramPage";
import CreateProgramPage from "../pages/CreateProgramPage";
import AdminPage from "../pages/AdminPage";
import AccountDetails from "../pages/AccountDetails";
import CategoryPage from "../pages/CategoryPage";
import FrontPage from "../pages/FrontPage/FrontPage";
import SearchPage from "../pages/SearchPage";

export const devRoutes = [
    {
        path: DEVELOPER_ROUTE,
        Element: DeveloperPage
    },
    {
        path: ACCOUNT_DETAILS_ROUTE,
        Element: AccountDetails
    },
    {
        path: ALL_PROGRAM_ROUTE,
        Element: AllProgramPage
    },
    {
        path: CREATE_PROGRAM_ROUTE,
        Element: CreateProgramPage
    }
]

export const adminRoutes = [
    {
        path: DEVELOPER_ROUTE,
        Element: DeveloperPage
    },
    {
        path: ACCOUNT_DETAILS_ROUTE,
        Element: AccountDetails
    },
    {
        path: ALL_PROGRAM_ROUTE,
        Element: AllProgramPage
    },
    {
        path: CREATE_PROGRAM_ROUTE,
        Element: CreateProgramPage
    },
    {
        path: ADMIN_ROUTE,
        Element: AdminPage
    }
]

export const publicRoutes = [
    {
        path: CATALOG_ROUTE,
        Element: Catalog
    },
    {
        path: FRONT_PAGE_ROUTE,
        Element: FrontPage
    },
    {
        path: SEARCH_PAGE_ROUTE,
        Element: SearchPage
    },
    {
        path: CATEGORY_ROUTE,
        Element: CategoryPage
    },
    {
        path: LOGIN_ROUTE,
        Element: Authorization
    },
    {
        path: REGISTRATION_ROUTE,
        Element: Authorization
    },
    {
        path: ABOUT_ROUTE,
        Element: About
    },
    {
        path: PROGRAM_ROUTE,
        Element: ProgramPage
    }
]