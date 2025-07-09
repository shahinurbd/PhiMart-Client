import { useEffect, useState } from "react";

const DiscountTimer = () => {
    const targetDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 25; //set 25 days cowndown

    const getTimeRemaining = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        return {
            days: Math.floor(difference / (1000* 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    };

    const [timeleft, setTimeLeft] = useState(getTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining());
        }, 1000);

        return () => clearInterval(timer); 
    }, []);
    return (
        <div>
            <div className="flex justify-center items-center md:justify-start space-x-8 my-4 font-semibold text-2xl">
                <div>
                    <span className="text-pink-500 text-2xl font-bold">{timeleft.days}</span>
                    <p className="font-bold text-xl">Days</p>
                    </div>
                    <div>
                    <span className="text-pink-500 text-2xl font-bold">{timeleft.hours}</span>
                    <p className="font-bold text-xl">Hrs</p>
                    </div>
                    <div>
                    <span className="text-pink-500 text-2xl font-bold">{timeleft.minutes}</span>
                    <p className="font-bold text-xl">Min</p>
                    </div>
                    <div>
                    <span className="text-pink-500 text-2xl font-bold">{timeleft.seconds}</span>
                    <p className="font-bold text-xl">Sec</p>
                    </div>
                </div>
        </div>
    );
};

export default DiscountTimer;