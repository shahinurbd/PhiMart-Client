import bgImg from "../../assets/images/banner-image-bg-1.jpg"
import bnrImg from "../../assets/images/banner-image3.png"
import DiscountTimer from "./DiscountTimer";
const DiscountSection = () => {
    return (
        <section className="w-full h-[600px] bg-cover bg-center flex justify-center items-center px-4 md:px-8" style={{backgroundImage: `url(${bgImg})`}}>
                <div className="container w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-8">

                    {/* Left Content */}

                    <div className="w-full md:w-1/2 flex justify-center">
                            <img className="w-2/3 md:w-1/2 drop-shadow-2xl" src={bnrImg} alt="" />
                        </div>
        
                    {/* Right Content  */}

                    <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">30% Discount On All Items. Hurry Up !!!</h2>

                        {/* countdown timer */}
                        <DiscountTimer />
                        <button className="text-white bg-pink-500 px-5 py-2 rounded-full">Shop Collection</button>
                    </div>
                        
        
        
                </div>
                </section>
    );
};

export default DiscountSection;