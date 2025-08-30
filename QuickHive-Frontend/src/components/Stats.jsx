export default function StatsSection(){
    const stats=[
        {number:"10,000+", label:"Events Hosted"},
        {number:"98%", label:"Customer Satisfaction"},
        {number:"200+", label:"Cities Covered"},
        {number:"24/7", label:"Support Available"}
    ];

    return (
        <section className=" px-4 py-16 center flex justify-center items-center ">

                <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-8">
                    {stats.map((stat)=>(
                        <div key={stat._id} className="group">
                            <p className="font-bold text-slate-700 text-4xl md:5xl ">{stat.number}</p>
                            <p className="text-teal-800 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            
        </section>
    )
}