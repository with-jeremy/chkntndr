interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  priceLevel?: number;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
     {/*  <Image className="w-full h-48 object-cover" src={restaurant.photoUrl} alt={restaurant.name} layout="responsive" width={700} height={300} /> */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{restaurant.name}</h2>
        <p className="text-gray-700 text-base mb-2">{restaurant.address}</p>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">Rating:</span>
          <span>{restaurant.rating}</span>
        </div>
        {restaurant.priceLevel && (
          <div className="flex items-center">
            <span className="text-gray-700 mr-1">Price Level:</span>
            <span>{"$".repeat(restaurant.priceLevel)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
