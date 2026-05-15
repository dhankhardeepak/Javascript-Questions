The Question is to flatten a deeply nested Object.

Example 1
Obj = {
    'A' : 1,
    'B' : '12',
    'C' : {
        'D' : '23',
        'E' : {
            'F' : '44'
        }
    }
}

O/P = {
    'A' : 1,
    'B' : '12',
    'C.D' : '23',
    'C.E.F' : '44'
}