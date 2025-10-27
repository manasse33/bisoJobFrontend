export default function NewsSection() {
  const news = [
    {
      title: "Bourses d’excellence 2025 – Ministère ESU",
      date: "15 août 2025",
    },
    {
      title: "Concours INPT – Session octobre 2025",
      date: "10 août 2025",
    },
    {
      title: "Journées portes ouvertes – UMN",
      date: "1 août 2025",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Actualités, concours & bourses</h2>
        <button className="text-blue-600 hover:underline">Tout voir</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {news.map((item, idx) => (
          <div key={idx} className="bg-white shadow rounded-xl p-6 border">
            <p className="text-sm text-gray-500">{item.date}</p>
            <h3 className="font-semibold text-gray-800 mt-2">{item.title}</h3>
            <button className="mt-3 text-blue-600 hover:underline">Lire</button>
          </div>
        ))}
      </div>
    </section>
  );
}
