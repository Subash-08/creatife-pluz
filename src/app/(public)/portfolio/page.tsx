import { connectToDatabase } from '@/lib/db'
import Project from '@/lib/models/Project'
import PortfolioContent from './PortfolioContent'
import PortfolioFilters from './PortfolioFilters.client'
import ProjectGrid from './ProjectGrid.client'
import { Project as ProjectType } from './types'

// ISR: Revalidate every 24 hours or on-demand
export const revalidate = 86400 // 24 hours in seconds

async function getProjects(): Promise<ProjectType[]> {
    try {
        await connectToDatabase()

        // Fetch all projects for now (including drafts) so user can see their work
        // In production, you might want to switch back to { status: 'published' }
        const projects = await Project.find({})
            .sort({
                featuredOrder: -1,
                publishedAt: -1,
                createdAt: -1
            })
            .select('title slug category year excerpt coverImage size featured featuredOrder clientName duration status')
            .lean()

        // Return serialized data
        return JSON.parse(JSON.stringify(projects))
    } catch (error) {
        console.error('Failed to fetch projects:', error)
        return []
    }
}

// Extract unique categories from all projects
function getCategories(projects: ProjectType[]): string[] {
    const categories = ['All', ...new Set(projects.map(p => p.category))]
    return Array.from(categories)
}

export default async function PortfolioPage() {
    // Parallel data fetching
    const [projects] = await Promise.all([
        getProjects()
    ])

    const categories = getCategories(projects)

    return (
        <main className="min-h-screen bg-gray-900">
            <PortfolioContent />

            {/* Server renders categories, Client handles filtering */}
            <PortfolioFilters categories={categories} />

            {/* Client handles animations */}
            <ProjectGrid projects={projects} />
        </main>
    )
}
