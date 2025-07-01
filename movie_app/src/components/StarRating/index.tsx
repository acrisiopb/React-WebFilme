import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export interface Props {
    rating: number
}

export default function starRating(props: Props) {

    const numStarts = Math.round(props.rating / 2);
    // console.log(numStarts)

    const fullStars = [];
    const emptyStars = [];

    for (let i = 0; i < 5; i++) {

        if (i < numStarts) {
            fullStars.push(i);
        }
        else {
            emptyStars.push(i);
        }
    }

    return (
        <div>
            
            {fullStars.map(index =>
                <FaStar key={index} />
            )}
            {emptyStars.map(index =>

                <FaRegStar key={index}/>

            )}

        </div>
    );

}