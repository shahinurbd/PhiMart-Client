import { IoIosArrowForward } from "react-icons/io";

const CategoryItems = ({index, category}) => {
    const gradiants = [
        "from-pink-100 to-blue-100",
        "from-blue-100 to-purple-100",
        "from-purple-100 to-pink-100",
        "from-pink-100 to-blue-100",
    ];
    return (
        <div className="">

            {/* Categories */}
            
            <section className="flex justify-between items-center px-4 md:px-8 mt-6">
                <div className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer bg-gradient-to-br ${gradiants[index % gradiants.length]} w-full p-5 py-5`}>
                    <div className="flex justify-between items-center">
                        <div className="bg-pink-500 p-2 rounded-full  w-10 text-center text-white">{category.name.charAt(0)}</div>
                        <div className="bg-gray-50 text-center w-20 rounded-full">{category.product_count} items</div>
                    </div>
                    <div className="py-5 space-y-3">
                    <h3 className="text-gray-900 text-md font-bold">{category.name}</h3>
                    <p className="text-gray-500 text-sm">{category.description}</p>
                    <button className="text-pink-500 font-bold hover:text-pink-600 transition-colors flex items-center text-md">Explore <IoIosArrowForward /></button>
                    </div>
                </div>
            </section>
        </div>


    );
};

export default CategoryItems;