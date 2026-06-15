import content from '@/data/content.json'
import Navbar from '@/components/Navbar'
import ModuleCard from '@/components/ModuleCard'
import SearchBar from '@/components/SearchBar'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-cloud">
      <Navbar />

      <section className="bg-indigo-deep py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-cloud text-4xl font-bold leading-tight mb-4">
            Welcome to the EX3 Training Hub
          </h1>
          <p className="text-mid-gray text-lg">
            Step-by-step guidance for Employee Central, SF Pay and Time
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-cloud py-8 px-6">
        <div className="max-w-4xl mx-auto flex justify-center">
          <SearchBar />
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-carbon text-sm font-semibold uppercase tracking-wider text-mid-gray mb-6">
            Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {content.modules.map((mod) => (
              <ModuleCard
                key={mod.id}
                id={mod.id}
                title={mod.title}
                description={mod.description}
                icon={mod.icon}
                active={mod.active}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
