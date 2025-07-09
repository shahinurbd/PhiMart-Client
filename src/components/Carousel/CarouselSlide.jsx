import bgimg from "../../assets/images/banner-image-bg.jpg"
const CarouselSlide = ({title, subtitle, image}) => {
    return (
        <section className="w-full h-[650px] bg-cover bg-center flex justify-center items-center px-4 md:px-8" style={{backgroundImage: `url(${bgimg})`}}>
        <div className="max-w-6xl w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-8">
            {/* Left Content */}
            <div className="w-full md:w-1/2 text-center md:text-left pb-8 md:pb-0 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold ">{title}</h1>
                <p className="text-gray-600">{subtitle}</p>
                <button className="btn btn-secondary px-5 py-3 rounded-full shadow-md">Shop Product</button>
            </div>

            {/* Right Image  */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img className="max-w-full md:max-w-md drop-shadow-lg" src={image} alt="" />
                </div>


        </div>
        </section>
    );
};

export default CarouselSlide;