import { FaShoppingCart } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";
import { BsFillTagsFill } from "react-icons/bs";
import { MdPrivacyTip } from "react-icons/md";

const Features = () => {

    const features = [
        {
            icon: <FaShoppingCart />,
            title: "Free Delivery",
            description: "Get your delivery without extra cost."
        },
        {
            icon: <PiSealCheckFill />,
            title: "Quality Guarantee",
            description: "We ensure top-notch quality for every products you purchase."
        },
        {
            icon: <BsFillTagsFill />,
            title: "Daily Offers",
            description: "Exclusive Discounts and special deals availble every day."
        },
        {
            icon: <MdPrivacyTip />,
            title: "100% Secure Payment",
            description: "Your payment information is encrypted and completely secure."
        },
    ]
    return (
        <section className="px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {features.map((item) => (
                    <div className="flex flex-col items-center text-center">
                        <div className="text-red-500 text-4xl">{item.icon}</div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;