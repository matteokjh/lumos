import React from 'react';

interface RankProps {
    rank: number;
}

const Rank = (props: RankProps) => {
    const { rank } = props;

    // methods
    const getRankColor = (num: number) => {
        switch(num) {
            case 1: return '#21a5f3';
            case 2: return '#ff9800';
            case 3: return '#4caf50';
            case 4: return '#8c00d4';
            case 5: return '#f35ce8';
            case 6: return '#f35c5c';
            default: return '#9e9e9e'
        }
    }

    return <span className="Rank" style={{
        color: '#fff',
        backgroundColor: getRankColor(rank),
        borderRadius: '3px',
        padding: '0 5px',
        fontSize: 10,
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)'
    }}>Lv{rank}</span>;
};

export default Rank;
