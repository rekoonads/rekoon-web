import { Card, CardContent } from '../components/ui/card';

export default function BrandsTable() {
  const brandData = [
    { name: 'Nike', campaign: 'Just Do It', expenses: 3.75, color: '#f0a' },
    {
      name: 'Apple',
      campaign: 'Think Different',
      expenses: 1.8,
      color: '#0af',
    },
    { name: 'Coca-Cola', campaign: 'Share a Coke', expenses: 4, color: '#f00' },
    {
      name: "McDonald's",
      campaign: "I'm Lovin' It",
      expenses: 2.4,
      color: '#fc0',
    },
    {
      name: 'Amazon',
      campaign: 'Work Hard. Have Fun. Make History.',
      expenses: 11,
      color: '#0f9',
    },
  ];

  const maxExpense = Math.max(...brandData.map((brand) => brand.expenses));

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Brand Insights
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandData.map((brand) => (
          <Card
            key={brand.name}
            className="bg-gray-800 overflow-hidden group transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl shadow-xl"
          >
            <CardContent className="p-6 relative">
              <div
                className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${brand.color}22, ${brand.color}44)`,
                }}
              ></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-3xl font-bold text-white group-hover:text-4xl transition-all duration-300 ease-in-out">
                    {brand.name}
                  </h2>
                  <span
                    className="text-sm font-medium px-2 py-1 rounded-full transition-all duration-300 ease-in-out group-hover:scale-110"
                    style={{ backgroundColor: brand.color }}
                  >
                    ${brand.expenses}B
                  </span>
                </div>
                <p className="text-gray-400 mb-4 h-12 overflow-hidden group-hover:text-white transition-all duration-300 ease-in-out">
                  {brand.campaign}
                </p>
                <div className="relative pt-2">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-700">
                    <div
                      style={{
                        width: `${(brand.expenses / maxExpense) * 100}%`,
                        backgroundColor: brand.color,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-in-out group-hover:w-full"
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
