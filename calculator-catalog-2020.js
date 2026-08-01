/* Mainstream consumer desktop hardware released from 2020 onward.
   Scope excludes mobile, server/workstation, OEM-only and region-exclusive products.
   GPU board length varies by manufacturer; unlisted lengths should be entered manually. */
(function(){
  const addUnique=(target,items)=>{const names=new Set(target.map(x=>x.name.toLowerCase()));items.forEach(item=>{if(!names.has(item.name.toLowerCase())){target.push(item);names.add(item.name.toLowerCase())}})};

  addUnique(cpus,[
    // Intel 10th Gen Comet Lake-S (LGA1200)
    {name:'Intel Core i3-10100',socket:'LGA1200',score:52,power:65},{name:'Intel Core i3-10100F',socket:'LGA1200',score:52,power:65},{name:'Intel Core i3-10105',socket:'LGA1200',score:54,power:65},{name:'Intel Core i3-10105F',socket:'LGA1200',score:54,power:65},{name:'Intel Core i3-10300',socket:'LGA1200',score:57,power:65},{name:'Intel Core i3-10320',socket:'LGA1200',score:59,power:65},
    {name:'Intel Core i5-10400',socket:'LGA1200',score:65,power:65},{name:'Intel Core i5-10400F',socket:'LGA1200',score:65,power:65},{name:'Intel Core i5-10500',socket:'LGA1200',score:68,power:65},{name:'Intel Core i5-10600',socket:'LGA1200',score:72,power:65},{name:'Intel Core i5-10600K',socket:'LGA1200',score:78,power:125},{name:'Intel Core i5-10600KF',socket:'LGA1200',score:78,power:125},
    {name:'Intel Core i7-10700',socket:'LGA1200',score:82,power:65},{name:'Intel Core i7-10700F',socket:'LGA1200',score:82,power:65},{name:'Intel Core i7-10700K',socket:'LGA1200',score:90,power:125},{name:'Intel Core i7-10700KF',socket:'LGA1200',score:90,power:125},
    {name:'Intel Core i9-10850K',socket:'LGA1200',score:96,power:125},{name:'Intel Core i9-10900',socket:'LGA1200',score:94,power:65},{name:'Intel Core i9-10900F',socket:'LGA1200',score:94,power:65},{name:'Intel Core i9-10900K',socket:'LGA1200',score:100,power:125},{name:'Intel Core i9-10900KF',socket:'LGA1200',score:100,power:125},

    // Intel 11th Gen Rocket Lake-S (LGA1200)
    {name:'Intel Core i5-11400',socket:'LGA1200',score:76,power:154},{name:'Intel Core i5-11400F',socket:'LGA1200',score:76,power:154},{name:'Intel Core i5-11500',socket:'LGA1200',score:79,power:154},{name:'Intel Core i5-11600',socket:'LGA1200',score:83,power:154},{name:'Intel Core i5-11600K',socket:'LGA1200',score:89,power:181},{name:'Intel Core i5-11600KF',socket:'LGA1200',score:89,power:181},
    {name:'Intel Core i7-11700',socket:'LGA1200',score:92,power:224},{name:'Intel Core i7-11700F',socket:'LGA1200',score:92,power:224},{name:'Intel Core i7-11700K',socket:'LGA1200',score:99,power:251},{name:'Intel Core i7-11700KF',socket:'LGA1200',score:99,power:251},
    {name:'Intel Core i9-11900',socket:'LGA1200',score:98,power:224},{name:'Intel Core i9-11900F',socket:'LGA1200',score:98,power:224},{name:'Intel Core i9-11900K',socket:'LGA1200',score:104,power:251},{name:'Intel Core i9-11900KF',socket:'LGA1200',score:104,power:251},

    // Intel 12th Gen Alder Lake-S
    {name:'Intel Core i3-12100',socket:'LGA1700',score:76,power:89},{name:'Intel Core i3-12100F',socket:'LGA1700',score:76,power:89},{name:'Intel Core i3-12300',socket:'LGA1700',score:80,power:89},
    {name:'Intel Core i5-12500',socket:'LGA1700',score:88,power:117},{name:'Intel Core i5-12600',socket:'LGA1700',score:92,power:117},{name:'Intel Core i5-12600KF',socket:'LGA1700',score:101,power:150},
    {name:'Intel Core i7-12700',socket:'LGA1700',score:107,power:180},{name:'Intel Core i7-12700F',socket:'LGA1700',score:107,power:180},{name:'Intel Core i7-12700KF',socket:'LGA1700',score:112,power:190},
    {name:'Intel Core i9-12900',socket:'LGA1700',score:116,power:202},{name:'Intel Core i9-12900F',socket:'LGA1700',score:116,power:202},{name:'Intel Core i9-12900KF',socket:'LGA1700',score:120,power:241},{name:'Intel Core i9-12900KS',socket:'LGA1700',score:124,power:241},

    // Intel 13th Gen Raptor Lake-S
    {name:'Intel Core i3-13100',socket:'LGA1700',score:82,power:110},{name:'Intel Core i3-13100F',socket:'LGA1700',score:82,power:110},
    {name:'Intel Core i5-13500',socket:'LGA1700',score:111,power:154},{name:'Intel Core i5-13600KF',socket:'LGA1700',score:126,power:181},
    {name:'Intel Core i7-13700',socket:'LGA1700',score:127,power:219},{name:'Intel Core i7-13700F',socket:'LGA1700',score:127,power:219},{name:'Intel Core i7-13700KF',socket:'LGA1700',score:133,power:253},
    {name:'Intel Core i9-13900',socket:'LGA1700',score:136,power:219},{name:'Intel Core i9-13900F',socket:'LGA1700',score:136,power:219},{name:'Intel Core i9-13900KF',socket:'LGA1700',score:140,power:253},{name:'Intel Core i9-13900KS',socket:'LGA1700',score:145,power:253},

    // Intel 14th Gen Raptor Lake Refresh
    {name:'Intel Core i3-14100',socket:'LGA1700',score:86,power:110},{name:'Intel Core i3-14100F',socket:'LGA1700',score:86,power:110},
    {name:'Intel Core i5-14500',socket:'LGA1700',score:114,power:154},{name:'Intel Core i5-14600KF',socket:'LGA1700',score:132,power:181},
    {name:'Intel Core i7-14700',socket:'LGA1700',score:137,power:219},{name:'Intel Core i7-14700F',socket:'LGA1700',score:137,power:219},{name:'Intel Core i7-14700KF',socket:'LGA1700',score:143,power:253},
    {name:'Intel Core i9-14900',socket:'LGA1700',score:143,power:219},{name:'Intel Core i9-14900F',socket:'LGA1700',score:143,power:219},{name:'Intel Core i9-14900KF',socket:'LGA1700',score:147,power:253},{name:'Intel Core i9-14900KS',socket:'LGA1700',score:151,power:320},

    // Intel Core Ultra desktop LGA1851
    {name:'Intel Core Ultra 5 225',socket:'LGA1851',score:116,power:121},{name:'Intel Core Ultra 5 225F',socket:'LGA1851',score:116,power:121},{name:'Intel Core Ultra 5 235',socket:'LGA1851',score:121,power:121},{name:'Intel Core Ultra 5 245',socket:'LGA1851',score:124,power:121},{name:'Intel Core Ultra 5 245KF',socket:'LGA1851',score:128,power:159},{name:'Intel Core Ultra 5 250K Plus',socket:'LGA1851',score:136,power:159},{name:'Intel Core Ultra 5 250KF Plus',socket:'LGA1851',score:136,power:159},{name:'Intel Core Ultra 7 265',socket:'LGA1851',score:136,power:182},{name:'Intel Core Ultra 7 265F',socket:'LGA1851',score:136,power:182},{name:'Intel Core Ultra 7 265KF',socket:'LGA1851',score:140,power:250},{name:'Intel Core Ultra 7 270K Plus',socket:'LGA1851',score:150,power:250},{name:'Intel Core Ultra 9 285',socket:'LGA1851',score:142,power:182},{name:'Intel Core Ultra 9 285K',socket:'LGA1851',score:146,power:250},

    // AMD Ryzen 5000 / AM4 retail desktop
    {name:'AMD Ryzen 3 4100',socket:'AM4',score:52,power:65},{name:'AMD Ryzen 5 4500',socket:'AM4',score:61,power:65},{name:'AMD Ryzen 5 4600G',socket:'AM4',score:65,power:65},{name:'AMD Ryzen 5 5500',socket:'AM4',score:70,power:65},{name:'AMD Ryzen 5 5600G',socket:'AM4',score:75,power:65},{name:'AMD Ryzen 5 5600GT',socket:'AM4',score:77,power:65},{name:'AMD Ryzen 5 5600X',socket:'AM4',score:84,power:65},{name:'AMD Ryzen 5 5600X3D',socket:'AM4',score:103,power:105},{name:'AMD Ryzen 7 5700',socket:'AM4',score:82,power:65},{name:'AMD Ryzen 7 5700G',socket:'AM4',score:84,power:65},{name:'AMD Ryzen 7 5700X',socket:'AM4',score:90,power:65},{name:'AMD Ryzen 7 5800X',socket:'AM4',score:96,power:105},{name:'AMD Ryzen 7 5800XT',socket:'AM4',score:99,power:105},{name:'AMD Ryzen 9 5900X',socket:'AM4',score:103,power:105},{name:'AMD Ryzen 9 5900XT',socket:'AM4',score:106,power:105},{name:'AMD Ryzen 9 5950X',socket:'AM4',score:108,power:105},

    // AMD Ryzen 7000 / AM5
    {name:'AMD Ryzen 5 7500F',socket:'AM5',score:103,power:65},{name:'AMD Ryzen 5 7600X',socket:'AM5',score:113,power:105},{name:'AMD Ryzen 5 7600X3D',socket:'AM5',score:136,power:65},{name:'AMD Ryzen 7 7700X',socket:'AM5',score:122,power:105},{name:'AMD Ryzen 7 7800X3D',socket:'AM5',score:148,power:120},{name:'AMD Ryzen 9 7900',socket:'AM5',score:130,power:65},{name:'AMD Ryzen 9 7900X3D',socket:'AM5',score:151,power:120},{name:'AMD Ryzen 9 7950X',socket:'AM5',score:143,power:170},

    // AMD Ryzen 8000G / AM5
    {name:'AMD Ryzen 3 8300G',socket:'AM5',score:78,power:65},{name:'AMD Ryzen 5 8500G',socket:'AM5',score:92,power:65},{name:'AMD Ryzen 5 8600G',socket:'AM5',score:105,power:65},{name:'AMD Ryzen 7 8700G',socket:'AM5',score:116,power:65},

    // AMD Ryzen 9000 / AM5
    {name:'AMD Ryzen 5 9500F',socket:'AM5',score:113,power:65},{name:'AMD Ryzen 5 9600X',socket:'AM5',score:125,power:65},{name:'AMD Ryzen 7 9700F',socket:'AM5',score:133,power:65},{name:'AMD Ryzen 7 9850X3D',socket:'AM5',score:178,power:120},{name:'AMD Ryzen 9 9900X',socket:'AM5',score:148,power:120},{name:'AMD Ryzen 9 9900X3D',socket:'AM5',score:176,power:120},{name:'AMD Ryzen 9 9950X',socket:'AM5',score:158,power:170},{name:'AMD Ryzen 9 9950X3D',socket:'AM5',score:185,power:170}
  ]);

  addUnique(gpus,[
    // NVIDIA RTX 30 Series desktop
    {name:'NVIDIA GeForce RTX 3050 6GB',score:48,power:70,length:null},{name:'NVIDIA GeForce RTX 3050 8GB',score:55,power:130,length:null},{name:'NVIDIA GeForce RTX 3060 8GB',score:64,power:170,length:null},{name:'NVIDIA GeForce RTX 3070 Ti',score:102,power:290,length:null},{name:'NVIDIA GeForce RTX 3080 12GB',score:124,power:350,length:null},{name:'NVIDIA GeForce RTX 3080 Ti',score:128,power:350,length:null},{name:'NVIDIA GeForce RTX 3090 Ti',score:140,power:450,length:null},
    // NVIDIA RTX 40 Series desktop
    {name:'NVIDIA GeForce RTX 4060 Ti 16GB',score:94,power:165,length:null},{name:'NVIDIA GeForce RTX 4070 Ti',score:137,power:285,length:null},{name:'NVIDIA GeForce RTX 4080',score:170,power:320,length:null},
    // NVIDIA RTX 50 Series desktop
    {name:'NVIDIA GeForce RTX 5050',score:82,power:130,length:null},{name:'NVIDIA GeForce RTX 5060 Ti 8GB',score:108,power:180,length:null},

    // AMD Radeon RX 6000 Series
    {name:'AMD Radeon RX 6400',score:38,power:53,length:null},{name:'AMD Radeon RX 6500 XT 4GB',score:48,power:107,length:null},{name:'AMD Radeon RX 6500 XT 8GB',score:52,power:130,length:null},{name:'AMD Radeon RX 6600 XT',score:72,power:160,length:null},{name:'AMD Radeon RX 6700 10GB',score:82,power:175,length:null},{name:'AMD Radeon RX 6750 XT',score:96,power:250,length:null},{name:'AMD Radeon RX 6800',score:108,power:250,length:null},{name:'AMD Radeon RX 6900 XT',score:126,power:300,length:null},
    // AMD Radeon RX 7000 Series
    {name:'AMD Radeon RX 7600 XT',score:82,power:190,length:null},{name:'AMD Radeon RX 7800 XT',score:121,power:263,length:null},{name:'AMD Radeon RX 7900 GRE',score:132,power:260,length:null},{name:'AMD Radeon RX 7900 XT',score:155,power:315,length:null},{name:'AMD Radeon RX 7900 XTX',score:178,power:355,length:null},
    // AMD Radeon RX 9000 Series
    {name:'AMD Radeon RX 9060 8GB',score:98,power:132,length:null},{name:'AMD Radeon RX 9060 XT 8GB',score:103,power:150,length:null},{name:'AMD Radeon RX 9070 GRE 12GB',score:136,power:220,length:null},

    // Intel Arc desktop
    {name:'Intel Arc A310',score:28,power:75,length:null},{name:'Intel Arc A380',score:36,power:75,length:null},{name:'Intel Arc A580',score:58,power:185,length:null},{name:'Intel Arc A750',score:68,power:225,length:null},{name:'Intel Arc A770 8GB',score:73,power:225,length:null},{name:'Intel Arc A770 16GB',score:76,power:225,length:null},{name:'Intel Arc B570',score:80,power:150,length:null},{name:'Intel Arc B580',score:90,power:190,length:null}
  ]);

  addUnique(boards,[
    {name:'LGA1200 Z490 DDR4 motherboard',socket:'LGA1200',memory:'DDR4'},{name:'LGA1200 H470 DDR4 motherboard',socket:'LGA1200',memory:'DDR4'},{name:'LGA1200 B460 DDR4 motherboard',socket:'LGA1200',memory:'DDR4'},{name:'LGA1200 H410 DDR4 motherboard',socket:'LGA1200',memory:'DDR4'},{name:'LGA1200 Z590 DDR4 motherboard',socket:'LGA1200',memory:'DDR4'},{name:'LGA1200 H570 DDR4 motherboard',socket:'LGA1200',memory:'DDR4'},{name:'LGA1200 B560 DDR4 motherboard',socket:'LGA1200',memory:'DDR4'},{name:'LGA1200 H510 DDR4 motherboard',socket:'LGA1200',memory:'DDR4'},
    {name:'AM4 A520 DDR4 motherboard',socket:'AM4',memory:'DDR4'},{name:'AM4 B550 DDR4 motherboard',socket:'AM4',memory:'DDR4'},{name:'AM4 X570 DDR4 motherboard',socket:'AM4',memory:'DDR4'},
    {name:'AM5 A620 DDR5 motherboard',socket:'AM5',memory:'DDR5'},{name:'AM5 B650 DDR5 motherboard',socket:'AM5',memory:'DDR5'},{name:'AM5 B650E DDR5 motherboard',socket:'AM5',memory:'DDR5'},{name:'AM5 X670 DDR5 motherboard',socket:'AM5',memory:'DDR5'},{name:'AM5 X670E DDR5 motherboard',socket:'AM5',memory:'DDR5'},{name:'AM5 B840 DDR5 motherboard',socket:'AM5',memory:'DDR5'},{name:'AM5 B850 DDR5 motherboard',socket:'AM5',memory:'DDR5'},{name:'AM5 X870 DDR5 motherboard',socket:'AM5',memory:'DDR5'},{name:'AM5 X870E DDR5 motherboard',socket:'AM5',memory:'DDR5'},
    {name:'LGA1700 H610 DDR4 motherboard',socket:'LGA1700',memory:'DDR4'},{name:'LGA1700 B660 DDR4 motherboard',socket:'LGA1700',memory:'DDR4'},{name:'LGA1700 B660 DDR5 motherboard',socket:'LGA1700',memory:'DDR5'},{name:'LGA1700 H670 DDR4 motherboard',socket:'LGA1700',memory:'DDR4'},{name:'LGA1700 H670 DDR5 motherboard',socket:'LGA1700',memory:'DDR5'},{name:'LGA1700 Z690 DDR4 motherboard',socket:'LGA1700',memory:'DDR4'},{name:'LGA1700 Z690 DDR5 motherboard',socket:'LGA1700',memory:'DDR5'},{name:'LGA1700 B760 DDR4 motherboard',socket:'LGA1700',memory:'DDR4'},{name:'LGA1700 B760 DDR5 motherboard',socket:'LGA1700',memory:'DDR5'},{name:'LGA1700 H770 DDR5 motherboard',socket:'LGA1700',memory:'DDR5'},{name:'LGA1700 Z790 DDR4 motherboard',socket:'LGA1700',memory:'DDR4'},{name:'LGA1700 Z790 DDR5 motherboard',socket:'LGA1700',memory:'DDR5'},
    {name:'LGA1851 B860 DDR5 motherboard',socket:'LGA1851',memory:'DDR5'},{name:'LGA1851 H810 DDR5 motherboard',socket:'LGA1851',memory:'DDR5'},{name:'LGA1851 Z890 DDR5 motherboard',socket:'LGA1851',memory:'DDR5'}
  ]);

  cpus.sort((a,b)=>a.name.localeCompare(b.name));
  gpus.sort((a,b)=>a.name.localeCompare(b.name));
  boards.sort((a,b)=>a.name.localeCompare(b.name));
  populate('cpuOptions',cpus);populate('gpuOptions',gpus);populate('boardOptions',boards);
})();
