function Die({value, hold, isHeld}) {
    const styleColor = {backgroundColor: isHeld ? '#2e424e' : 'orange' }
    return (
        <button style={styleColor} onClick={hold}>{value}</button>
    );
}

export default Die;