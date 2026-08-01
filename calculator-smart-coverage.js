/* Extends practical calculator coverage without claiming every retail/OEM SKU is explicitly listed. */
(function(){
  const addUnique=(target,items)=>{const names=new Set(target.map(x=>x.name.toLowerCase()));for(const item of items){const key=item.name.toLowerCase();if(!names.has(key)){target.push(item);names.add(key)}}};

  addUnique(boards,[
    {name:'ASUS Prime Z590-V',socket:'LGA1200',memory:'DDR4'},
    {name:'ASUS Prime Z590-A',socket:'LGA1200',memory:'DDR4'},
    {name:'ASUS Prime Z590-P',socket:'LGA1200',memory:'DDR4'},
    {name:'ASUS TUF Gaming Z590-Plus WiFi',socket:'LGA1200',memory:'DDR4'},
    {name:'Gigabyte Z590 AORUS Elite AX',socket:'LGA1200',memory:'DDR4'},
    {name:'MSI MPG Z590 Gaming Edge WiFi',socket:'LGA1200',memory:'DDR4'},
    {name:'ASUS Prime Z490-V',socket:'LGA1200',memory:'DDR4'},
    {name:'ASUS Prime Z490-A',socket:'LGA1200',memory:'DDR4'},
    {name:'Gigabyte Z490 AORUS Elite AC',socket:'LGA1200',memory:'DDR4'},
    {name:'MSI MPG Z490 Gaming Plus',socket:'LGA1200',memory:'DDR4'},
    {name:'ASUS ROG Strix B550-F Gaming WiFi',socket:'AM4',memory:'DDR4'},
    {name:'Gigabyte B550 AORUS Elite AX V2',socket:'AM4',memory:'DDR4'},
    {name:'MSI MPG B550 Gaming Plus',socket:'AM4',memory:'DDR4'},
    {name:'ASUS TUF Gaming X570-Plus WiFi',socket:'AM4',memory:'DDR4'},
    {name:'MSI MAG X570S Tomahawk MAX WiFi',socket:'AM4',memory:'DDR4'},
    {name:'ASUS ROG Strix B650E-F Gaming WiFi',socket:'AM5',memory:'DDR5'},
    {name:'Gigabyte B650 Eagle AX',socket:'AM5',memory:'DDR5'},
    {name:'MSI MAG B650 Tomahawk WiFi',socket:'AM5',memory:'DDR5'},
    {name:'ASUS TUF Gaming B850-Plus WiFi',socket:'AM5',memory:'DDR5'},
    {name:'Gigabyte B850 AORUS Elite WiFi7',socket:'AM5',memory:'DDR5'},
    {name:'ASUS ROG Strix X870E-E Gaming WiFi',socket:'AM5',memory:'DDR5'},
    {name:'MSI MAG X870 Tomahawk WiFi',socket:'AM5',memory:'DDR5'},
    {name:'ASUS Prime B660-Plus D4',socket:'LGA1700',memory:'DDR4'},
    {name:'ASUS Prime B660-Plus D5',socket:'LGA1700',memory:'DDR5'},
    {name:'Gigabyte B760 Gaming X AX DDR4',socket:'LGA1700',memory:'DDR4'},
    {name:'Gigabyte B760 Gaming X AX',socket:'LGA1700',memory:'DDR5'},
    {name:'MSI MAG B760 Tomahawk WiFi DDR4',socket:'LGA1700',memory:'DDR4'},
    {name:'MSI MAG B760 Tomahawk WiFi',socket:'LGA1700',memory:'DDR5'},
    {name:'ASUS ROG Strix Z690-A Gaming WiFi D4',socket:'LGA1700',memory:'DDR4'},
    {name:'ASUS ROG Strix Z690-E Gaming WiFi',socket:'LGA1700',memory:'DDR5'},
    {name:'MSI PRO Z790-P WiFi DDR4',socket:'LGA1700',memory:'DDR4'},
    {name:'MSI PRO Z790-P WiFi',socket:'LGA1700',memory:'DDR5'},
    {name:'Gigabyte Z890 AORUS Elite WiFi7',socket:'LGA1851',memory:'DDR5'},
    {name:'ASUS ROG Strix Z890-E Gaming WiFi',socket:'LGA1851',memory:'DDR5'}
  ]);

  addUnique(gpus,[
    {name:'AMD Radeon RX 9070 GRE',score:132,power:220,length:null},
    {name:'AMD Radeon RX 9060 XT 8GB',score:101,power:150,length:null},
    {name:'AMD Radeon RX 9060 XT LP 16GB',score:106,power:160,length:null},
    {name:'AMD Radeon RX 9060 8GB',score:91,power:132,length:null},
    {name:'Intel Arc B570',score:78,power:150,length:null},
    {name:'Intel Arc A380',score:35,power:75,length:null},
    {name:'Intel Arc A580',score:58,power:185,length:null},
    {name:'Intel Arc A770 8GB',score:73,power:225,length:null},
    {name:'NVIDIA GeForce RTX 3050 6GB',score:48,power:70,length:null},
    {name:'NVIDIA GeForce RTX 3050 8GB',score:55,power:130,length:null},
    {name:'NVIDIA GeForce RTX 3060 8GB',score:64,power:170,length:null},
    {name:'NVIDIA GeForce RTX 3080 10GB',score:118,power:320,length:null},
    {name:'NVIDIA GeForce RTX 3080 12GB',score:124,power:350,length:null},
    {name:'NVIDIA GeForce RTX 3080 Ti',score:128,power:350,length:null},
    {name:'NVIDIA GeForce RTX 3090 Ti',score:140,power:450,length:null},
    {name:'NVIDIA GeForce RTX 4070 Ti',score:137,power:285,length:null},
    {name:'NVIDIA GeForce RTX 4080',score:170,power:320,length:null},
    {name:'NVIDIA GeForce RTX 5050',score:82,power:130,length:null}
  ]);

  const chipsetRules=[
    [/\b(H410|B460|H470|Q470|Z490|H510|B560|H570|Q570|Z590)\b/i,'LGA1200','DDR4'],
    [/\b(H610|B660|H670|Q670|Z690|B760|H770|Q770|Z790)\b/i,'LGA1700',null],
    [/\b(H810|B860|Q870|W880|Z890)\b/i,'LGA1851','DDR5'],
    [/\b(A320|B350|X370|B450|X470|A520|B550|X570)\b/i,'AM4','DDR4'],
    [/\b(A620|B650E?|X670E?|B840|B850|X870E?)\b/i,'AM5','DDR5']
  ];
  function inferMemory(name,defaultMemory){
    if(/\b(DDR4|D4)\b/i.test(name))return'DDR4';
    if(/\b(DDR5|D5)\b/i.test(name))return'DDR5';
    return defaultMemory;
  }
  function inferBoard(name){
    for(const [pattern,socket,memory] of chipsetRules){if(pattern.test(name)){const inferred=inferMemory(name,memory);if(inferred)return{name,socket,memory:inferred}}}
    return null;
  }
  function ensureTypedBoard(){
    const input=$('boardInput');if(!input)return;
    const name=input.value.trim();if(!name||findPart(boards,name))return;
    const inferred=inferBoard(name);if(inferred){boards.push(inferred);boards.sort((a,b)=>a.name.localeCompare(b.name));populate('boardOptions',boards)}
  }
  ['input','change'].forEach(eventName=>$('boardInput')?.addEventListener(eventName,ensureTypedBoard));
  $('calculateButton')?.addEventListener('click',ensureTypedBoard,{capture:true});

  cpus.sort((a,b)=>a.name.localeCompare(b.name));gpus.sort((a,b)=>a.name.localeCompare(b.name));boards.sort((a,b)=>a.name.localeCompare(b.name));
  populate('cpuOptions',cpus);populate('gpuOptions',gpus);populate('boardOptions',boards);
})();