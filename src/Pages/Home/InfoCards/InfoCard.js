import React from 'react';

const InfoCard = ({ card }) => {
    const { title, description, icon, bgClass } = card
    return (
        <div className={`card mg:card-side ${bgClass} text-white shadow-xl p-4`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default InfoCard;