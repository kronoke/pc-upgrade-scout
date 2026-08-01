// Mainstream Intel 10th- and 11th-generation desktop additions (2020–2021).
// Relative gaming scores are planning estimates used only by this site's balance model.
const addedCpus = [
  {name:'Intel Core i3-10100',socket:'LGA1200',score:58,power:65},
  {name:'Intel Core i3-10100F',socket:'LGA1200',score:58,power:65},
  {name:'Intel Core i3-10300',socket:'LGA1200',score:61,power:65},
  {name:'Intel Core i3-10320',socket:'LGA1200',score:63,power:65},
  {name:'Intel Core i5-10400',socket:'LGA1200',score:72,power:65},
  {name:'Intel Core i5-10400F',socket:'LGA1200',score:72,power:65},
  {name:'Intel Core i5-10500',socket:'LGA1200',score:75,power:65},
  {name:'Intel Core i5-10600',socket:'LGA1200',score:79,power:65},
  {name:'Intel Core i5-10600K',socket:'LGA1200',score:86,power:125},
  {name:'Intel Core i5-10600KF',socket:'LGA1200',score:86,power:125},
  {name:'Intel Core i7-10700',socket:'LGA1200',score:91,power:65},
  {name:'Intel Core i7-10700F',socket:'LGA1200',score:91,power:65},
  {name:'Intel Core i7-10700K',socket:'LGA1200',score:98,power:125},
  {name:'Intel Core i7-10700KF',socket:'LGA1200',score:98,power:125},
  {name:'Intel Core i9-10850K',socket:'LGA1200',score:102,power:125},
  {name:'Intel Core i9-10900',socket:'LGA1200',score:101,power:65},
  {name:'Intel Core i9-10900F',socket:'LGA1200',score:101,power:65},
  {name:'Intel Core i9-10900K',socket:'LGA1200',score:108,power:125},
  {name:'Intel Core i9-10900KF',socket:'LGA1200',score:108,power:125},
  {name:'Intel Core i9-10900KS',socket:'LGA1200',score:111,power:125},
  {name:'Intel Core i5-11400',socket:'LGA1200',score:80,power:65},
  {name:'Intel Core i5-11400F',socket:'LGA1200',score:80,power:65},
  {name:'Intel Core i5-11500',socket:'LGA1200',score:83,power:65},
  {name:'Intel Core i5-11600',socket:'LGA1200',score:87,power:65},
  {name:'Intel Core i5-11600K',socket:'LGA1200',score:94,power:125},
  {name:'Intel Core i5-11600KF',socket:'LGA1200',score:94,power:125},
  {name:'Intel Core i7-11700',socket:'LGA1200',score:98,power:65},
  {name:'Intel Core i7-11700F',socket:'LGA1200',score:98,power:65},
  {name:'Intel Core i7-11700K',socket:'LGA1200',score:104,power:125},
  {name:'Intel Core i7-11700KF',socket:'LGA1200',score:104,power:125},
  {name:'Intel Core i9-11900',socket:'LGA1200',score:103,power:65},
  {name:'Intel Core i9-11900F',socket:'LGA1200',score:103,power:65},
  {name:'Intel Core i9-11900K',socket:'LGA1200',score:110,power:125},
  {name:'Intel Core i9-11900KF',socket:'LGA1200',score:110,power:125}
];

const addedBoards = [
  {name:'ASUS Prime Z490-P',socket:'LGA1200',memory:'DDR4'},
  {name:'ASUS ROG Strix Z490-E Gaming',socket:'LGA1200',memory:'DDR4'},
  {name:'MSI MPG Z490 Gaming Edge WiFi',socket:'LGA1200',memory:'DDR4'},
  {name:'MSI B460 Tomahawk',socket:'LGA1200',memory:'DDR4'},
  {name:'ASUS TUF Gaming B460-Plus',socket:'LGA1200',memory:'DDR4'},
  {name:'Gigabyte H470 AORUS Pro AX',socket:'LGA1200',memory:'DDR4'},
  {name:'ASUS Prime Z590-P',socket:'LGA1200',memory:'DDR4'},
  {name:'ASUS ROG Strix Z590-E Gaming WiFi',socket:'LGA1200',memory:'DDR4'},
  {name:'MSI Z590-A PRO',socket:'LGA1200',memory:'DDR4'},
  {name:'MSI MAG B560 Tomahawk WiFi',socket:'LGA1200',memory:'DDR4'},
  {name:'ASUS TUF Gaming B560-Plus WiFi',socket:'LGA1200',memory:'DDR4'},
  {name:'Gigabyte B560 AORUS Pro AX',socket:'LGA1200',memory:'DDR4'},
  {name:'ASUS Prime H570-Plus',socket:'LGA1200',memory:'DDR4'}
];

function mergeUnique(target, additions) {
  const existing = new Set(target.map(item => item.name.toLowerCase()));
  additions.forEach(item => {
    if (!existing.has(item.name.toLowerCase())) target.push(item);
  });
}

mergeUnique(cpus, addedCpus);
mergeUnique(boards, addedBoards);
cpus.sort((a,b)=>a.name.localeCompare(b.name));
boards.sort((a,b)=>a.name.localeCompare(b.name));
populate('cpuOptions', cpus);
populate('boardOptions', boards);
