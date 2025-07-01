export interface Props {
    rating: number
}

export default function starRating(props: Props) {
    const numStarts = Math.round(props.rating / 2);
    // console.log(numStarts)

    return (
        <div>
            Teste
        </div>
    );

}