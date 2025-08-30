export default function StatsSection(){
    const stats = [
        {id: 1, number: "10,000+", label: "Active Community Members"},
        {id: 2, number: "98%", label: "Attendee Satisfaction Rate"},
        {id: 3, number: "2000+", label: "Events Created"},
        {id: 4, number: "24/7", label: "Customer Support"}
    ];

    return (
        <section className="px-4 py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-8">
                    {stats.map((stat) => (
                        <div key={stat.id} className="group p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <p className="font-bold text-gray-800 text-4xl md:text-5xl mb-2">{stat.number}</p>
                            <p className="text-gray-600 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
