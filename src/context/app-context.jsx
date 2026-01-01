"use client";
import { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext(undefined);
// Mock user data for demonstration
const mockUsers = {
    jobseeker: {
        id: "1",
        email: "john@example.com",
        name: "John Developer",
        role: "jobseeker",
        avatar: "/professional-male-developer.jpg",
        profile: {
            title: "Senior Frontend Developer",
            location: "San Francisco, CA",
            about: "Passionate frontend developer with 5+ years of experience building modern web applications.",
            skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "GraphQL"],
            experience: [
                {
                    id: "1",
                    company: "Tech Corp",
                    title: "Senior Frontend Developer",
                    startDate: "2022-01",
                    endDate: null,
                    current: true,
                    description: "Leading frontend development for enterprise applications.",
                },
                {
                    id: "2",
                    company: "StartupXYZ",
                    title: "Frontend Developer",
                    startDate: "2019-06",
                    endDate: "2021-12",
                    current: false,
                    description: "Built and maintained React-based web applications.",
                },
            ],
            education: [
                {
                    id: "1",
                    institution: "Stanford University",
                    degree: "B.S. Computer Science",
                    year: "2019",
                },
            ],
            certifications: ["AWS Certified Developer", "Google Cloud Professional"],
            projects: [
                {
                    id: "1",
                    name: "E-commerce Platform",
                    description: "Built a full-stack e-commerce platform with React and Node.js",
                    url: "https://example.com",
                },
            ],
            category: "Software Development",
            jobRole: "Frontend Developer",
            visibility: true,
        },
    },
    employer: {
        id: "2",
        email: "hr@techcompany.com",
        name: "Sarah HR Manager",
        role: "employer",
        avatar: "/professional-female-hr-manager.jpg",
        company: {
            name: "TechVentures Inc.",
            logo: "/tech-company-logo.jpg",
            industry: "Technology",
            size: "100-500 employees",
            website: "https://techventures.com",
        },
        savedCandidates: ["1", "3", "5"],
    },
    admin: {
        id: "3",
        email: "admin@talenthub.com",
        name: "Admin User",
        role: "admin",
        avatar: "/professional-administrator.jpg",
    },
};
// Mock candidates data
const mockCandidates = [
    {
        id: "1",
        name: "John Developer",
        title: "Senior Frontend Developer",
        location: "San Francisco, CA",
        avatar: "/professional-male-developer.jpg",
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        experience: "5+ years",
        category: "Software Development",
        jobRole: "Frontend Developer",
        availability: "Immediate",
        salary: "$120k - $150k",
    },
    {
        id: "2",
        name: "Emily Designer",
        title: "UI/UX Designer",
        location: "New York, NY",
        avatar: "/professional-female-designer.png",
        skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
        experience: "4+ years",
        category: "Design",
        jobRole: "UI/UX Designer",
        availability: "2 weeks",
        salary: "$100k - $130k",
    },
    {
        id: "3",
        name: "Michael Backend",
        title: "Backend Engineer",
        location: "Austin, TX",
        avatar: "/professional-male-engineer.jpg",
        skills: ["Python", "Django", "PostgreSQL", "AWS"],
        experience: "6+ years",
        category: "Software Development",
        jobRole: "Backend Developer",
        availability: "1 month",
        salary: "$130k - $160k",
    },
    {
        id: "4",
        name: "Lisa Data",
        title: "Data Scientist",
        location: "Seattle, WA",
        avatar: "/professional-female-data-scientist.png",
        skills: ["Python", "TensorFlow", "SQL", "Machine Learning"],
        experience: "3+ years",
        category: "Data Science",
        jobRole: "Data Scientist",
        availability: "Immediate",
        salary: "$140k - $170k",
    },
    {
        id: "5",
        name: "David Product",
        title: "Product Manager",
        location: "Los Angeles, CA",
        avatar: "/professional-male-product-manager.png",
        skills: ["Agile", "Scrum", "Jira", "Product Strategy"],
        experience: "7+ years",
        category: "Product",
        jobRole: "Product Manager",
        availability: "2 weeks",
        salary: "$150k - $180k",
    },
    {
        id: "6",
        name: "Anna DevOps",
        title: "DevOps Engineer",
        location: "Chicago, IL",
        avatar: "/professional-female-devops-engineer.jpg",
        skills: ["Kubernetes", "Docker", "Terraform", "CI/CD"],
        experience: "4+ years",
        category: "Software Development",
        jobRole: "DevOps Engineer",
        availability: "Immediate",
        salary: "$125k - $155k",
    },
];
const categories = [
    "Software Development",
    "Design",
    "Data Science",
    "Product",
    "Marketing",
    "Sales",
    "Operations",
    "Finance",
    "Human Resources",
];
const jobRoles = {
    "Software Development": [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile Developer",
        "DevOps Engineer",
    ],
    Design: ["UI/UX Designer", "Product Designer", "Graphic Designer", "Motion Designer"],
    "Data Science": ["Data Scientist", "Data Engineer", "ML Engineer", "Data Analyst"],
    Product: ["Product Manager", "Product Owner", "Technical PM"],
    Marketing: ["Marketing Manager", "Content Strategist", "SEO Specialist", "Growth Hacker"],
    Sales: ["Sales Manager", "Account Executive", "Business Development"],
    Operations: ["Operations Manager", "Project Manager", "Scrum Master"],
    Finance: ["Financial Analyst", "Accountant", "CFO"],
    "Human Resources": ["HR Manager", "Recruiter", "Talent Acquisition"],
};
export function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [candidates, setCandidates] = useState(mockCandidates);
    const [allUsers, setAllUsers] = useState([
        { ...mockUsers.jobseeker, status: "active", createdAt: "2024-01-15" },
        { ...mockUsers.employer, status: "active", createdAt: "2024-02-20" },
        {
            id: "4",
            email: "jane@example.com",
            name: "Jane Smith",
            role: "jobseeker",
            status: "active",
            createdAt: "2024-03-10",
        },
        {
            id: "5",
            email: "company@example.com",
            name: "Bob Wilson",
            role: "employer",
            status: "inactive",
            createdAt: "2024-03-25",
        },
    ]);
    useEffect(() => {
        // Check for saved user session
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);
    const login = (email, password, role) => {
        // Mock login - in real app, this would call API
        const userData = mockUsers[role];
        if (userData) {
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            return { success: true, user: userData };
        }
        return { success: false, error: "Invalid credentials" };
    };
    const signup = (data) => {
        // Mock signup
        const newUser = {
            id: Date.now().toString(),
            ...data,
            avatar: `/placeholder.svg?height=100&width=100&query=professional ${data.name}`,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        return { success: true, user: newUser };
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    const updateProfile = (profileData) => {
        if (user) {
            const updatedUser = { ...user, profile: { ...user.profile, ...profileData } };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    };
    const saveCandidateAction = (candidateId) => {
        if (user && user.role === "employer") {
            const saved = user.savedCandidates || [];
            const updatedSaved = saved.includes(candidateId)
                ? saved.filter((id) => id !== candidateId)
                : [...saved, candidateId];
            const updatedUser = { ...user, savedCandidates: updatedSaved };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    };
    // Admin functions
    const createUser = (userData) => {
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            status: "active",
            createdAt: new Date().toISOString().split("T")[0],
        };
        setAllUsers([...allUsers, newUser]);
        return { success: true, user: newUser };
    };
    const updateUser = (userId, updates) => {
        setAllUsers(allUsers.map((u) => (u.id === userId ? { ...u, ...updates } : u)));
    };
    const deleteUser = (userId) => {
        setAllUsers(allUsers.filter((u) => u.id !== userId));
    };
    const toggleUserStatus = (userId) => {
        setAllUsers(allUsers.map((u) => (u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)));
    };
    return (<AppContext.Provider value={{
            user,
            candidates,
            allUsers,
            categories,
            jobRoles,
            login,
            signup,
            logout,
            updateProfile,
            saveCandidateAction,
            createUser,
            updateUser,
            deleteUser,
            toggleUserStatus,
        }}>
      {children}
    </AppContext.Provider>);
}
export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
