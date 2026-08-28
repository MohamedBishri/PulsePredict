function Gauge({ value, level }) {
    const safeValue = Number(value) || 0;
    const deg = Math.round(safeValue * 360);
    const riskLevel = String(level || 'low').toLowerCase();

    return (
        <div
            className={`gauge ${riskLevel}`}
            style={{
                background: `conic-gradient(
                    var(--risk) ${deg}deg,
                    #17303b ${deg}deg
                )`
            }}
        >
            <div>
                <b>
                    {Math.round(safeValue * 100)}%
                </b>

                <span>
                    {level || 'Low'} risk
                </span>
            </div>
        </div>
    );
}

export default Gauge;