var options = [
  {
    id: 1,
    name: 'a1',
    children: [
      {
        id: 11,
        name: 'a11',
        children: [
          {
            id: 111,
            name: 'a111'
          }
        ]
      },
      {
        id: 12,
        name: '12',
        children: [
          {
            id: 121,
            name: '121'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '2',
    children: [
      {
        id: 21,
        name: '21',
        children: [
          {
            id: 211,
            name: '211'
          }
        ]
      }
    ]
  }
]

var a = '1_11_111'

var rs = [];

var pool = options;


function findOne(total, currentValue) {
  let r = total.find(item => item.id == currentValue);
  rs.push(r.name);
  return r.children;
}

let arr = a.split('_');
arr.reduce(findOne, pool);

// console.log(rs);

// console.log(options);

// console.log(pool);

function changeSymbol(arr) {
  arr.forEach(item => {
    item.value = item.id;
    if (item.children && item.children.length > 0) {
      changeSymbol(item.children);
    }
  });
}

changeSymbol(options);

console.log(options);