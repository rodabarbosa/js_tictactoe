function getWinnerValue(cells) {
    // Horizontals
    if (cells[0].getValue() && cells[0].getValue() === cells[1].getValue() && cells[1].getValue() === cells[2].getValue()) {
        return cells[0].getValue();
    }

    if (cells[3].getValue() && cells[3].getValue() === cells[4].getValue() && cells[4].getValue() === cells[5].getValue()) {
        return cells[3].getValue()
    }

    if (cells[6].getValue() && cells[6].getValue() === cells[7].getValue() && cells[7].getValue() === cells[8].getValue()) {
        return cells[6].getValue()
    }

    // Verticals
    if (cells[0].getValue() && cells[0].getValue() === cells[3].getValue() && cells[3].getValue() === cells[6].getValue()) {
        return cells[0].getValue();
    }

    if (cells[1].getValue() && cells[1].getValue() === cells[4].getValue() && cells[4].getValue() === cells[7].getValue()) {
        return cells[1].getValue();
    }

    if (cells[2].getValue() && cells[2].getValue() === cells[5].getValue() && cells[5].getValue() === cells[8].getValue()) {
        return cells[2].getValue();
    }

    // Diagonols
    if (cells[0].getValue() && cells[0].getValue() === cells[4].getValue() && cells[4].getValue() === cells[8].getValue()) {
        return cells[0].getValue();
    }

    if (cells[2].getValue() && cells[2].getValue() === cells[4].getValue() && cells[4].getValue() === cells[6].getValue()) {
        return cells[2].getValue();
    }

    return null;
}

function makeCells(values) {
    return values.map(v => ({ getValue: () => v }));
}

const tests = [
    {name: 'middle vertical O', vals: [null,'O',null,null,'O',null,null,'O',null], expected: 'O'},
    {name: 'top horizontal X', vals: ['X','X','X',null,null,null,null,null,null], expected: 'X'},
    {name: 'diag X', vals: ['X',null,null,null,'X',null,null,null,'X'], expected: 'X'},
    {name: 'no winner', vals: ['X','O','X','X','O','O','O','X','O'], expected: null}
];

tests.forEach(t => {
    const res = getWinnerValue(makeCells(t.vals));
    console.log(t.name + ': expected=' + t.expected + ' got=' + res + ' => ' + (res===t.expected ? 'OK' : 'FAIL'));
});
