import React from 'react';

function AdminPage({ stats }) {
    if (!stats) return null;

    const cards = [
        ['Registered users', stats.users],
        ['Predictions', stats.predictions],
        ['High-risk results', stats.high_risk],
        [
            'Average probability',
            `${Math.round(
                stats.average_probability * 100
            )}%`
        ]
    ];

    return (
        <div className="stats">
            {cards.map(([label, value]) => (
                <div
                    className="panel stat"
                    key={label}
                >
                    <small>{label}</small>
                    <strong>{value}</strong>
                </div>
            ))}
        </div>
    );
}

export default AdminPage;