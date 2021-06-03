import React, {FC, ReactElement, useState} from 'react';
import './TinderCards.css';
import TinderCard from "react-tinder-card";

interface Props {
    title?: String
}

const TinderCards: FC<Props> = ({title}): ReactElement => {
    const [people, setPeople] = useState([

        {
            name: 'Tom ',
            url: "https://pictures.immobilienscout24.de/listings/81ea8e03-c3b1-4771-a7f7-4bd2bdf455ed-1445457548.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73"
        },
        {
            name: 'Manuel ',
            url: "https://pictures.immobilienscout24.de/listings/f2e15e09-7b03-4a27-b523-2d7b876d6c34-1445457551.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73"

        }, {
            name: 'Ingo ',
            url: "https://pictures.immobilienscout24.de/listings/4ea91338-876e-4a0b-8da9-bb0be297f591-1445457555.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73"
        }, {
            name: 'Carolin',
            url: "https://pictures.immobilienscout24.de/listings/cf42f15e-7869-4f8c-a66f-4807138d1490-1445457553.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73"

        }
    ])

    const swiped = (direction: string, nameToDelete: string) => {
        console.log('removing' + nameToDelete);
    }
    const outOfFrame = (name: string) => {
        console.log('someone has left the party' + name);
    }

    return (
        <div className={'tinderCards'}>
            <div className={"tinderCards_cardContainer"}>

                {people.map((
                    person
                ) => (
                    //@ts-ignore
                    <div className={'swipe'}>
                        <TinderCard
                            key={person.name}
                            preventSwipe={["up", "down"]}
                            onSwipe={(dir: string) => swiped(dir, person.name)}
                            onCardLeftScreen={() => outOfFrame(person.name)}
                        >
                            <div
                                style={{backgroundImage: `url(${person.url})`}} className={'card'}>

                                <h3>{person.name}</h3>
                            </div>

                        </TinderCard></div>

                ))}
            </div>

        </div>


    )


}

export default TinderCards;