export const convertToCSV = (objArray) => {
  var array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";

    console.log(line);
  }

  return str;
};

export const exportCSVFile = (headers, items, fileTitle) => {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + ".csv" || "export.csv";

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

export const getStringForValues = (listData) => {};

export const getJsonFromCsv = (csv) => {
  let items = [];

  let rows = csv.split(/\n/g);
  let keys = rows.shift().split(",");

  console.log("rows=====", rows);
  console.log("keys=====", keys);

  rows.forEach((raw_row) => {
    var row = {};
    var columns = raw_row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

    columns.forEach((column, index) => {
      var key = keys[index];
      if (!key) return;
      row[key] = column;
    });
    items.push(row);
  });

  console.log("itemss======>", JSON.stringify(items));

  return items;
};

const getJsonDataFromCSV = () => {
  const test = `name,phone_code,code,currency_code
  Afghanistan,93,AF,AFN
  Aland Islands,358,AX,EUR
  Albania,355,AL,ALL
  Algeria,213,DZ,DZD
  AmericanSamoa,1684,AS,EUR
  Andorra,376,AD,EUR
  Angola,244,AO,AOA
  Anguilla,1264,AI,XCD
  Antarctica,672,AQ,AQD
  Antigua and Barbuda,1268,AG,XCD
  Argentina,54,AR,ARS
  Armenia,374,AM,AMD
  Aruba,297,AW,ANG
  Australia,61,AU,AUD
  Austria,43,AT,EUR
  Azerbaijan,994,AZ,AZN
  Bahamas,1242,BS,BSD
  Bahrain,973,BH,BHD
  Bangladesh,880,BD,BDT
  Barbados,1246,BB,BBD
  Belarus,375,BY,BYR
  Belgium,32,BE,EUR
  Belize,501,BZ,BZD
  Benin,229,BJ,XOF
  Bermuda,1441,BM,BMD
  Bhutan,975,BT,INR
  "Bolivia, Plurinational State of",591,BO,BOB
  Bosnia and Herzegovina,387,BA,BAM
  Botswana,267,BW,BWP
  Brazil,55,BR,BRL
  British Indian Ocean Territory,246,IO,USD
  Brunei Darussalam,673,BN,BND
  Bulgaria,359,BG,BGN
  Burkina Faso,226,BF,XOF
  Burundi,257,BI,BIF
  Cambodia,855,KH,KHR
  Cameroon,237,CM,XAF
  Canada,1,CA,CAD
  Cape Verde,238,CV,CVE
  Cayman Islands,345,KY,KYD
  Central African Republic,236,CF,XAF
  Chad,235,TD,XAF
  Chile,56,CL,CLP
  China,86,CN,CNY
  Christmas Island,61,CX,AUD
  Cocos (Keeling) Islands,61,CC,AUD
  Colombia,57,CO,COP
  Comoros,269,KM,KMF
  Congo,242,CG,XAF
  "Congo, The Democratic Republic of the Congo",243,CD,CDF
  Cook Islands,682,CK,NZD
  Costa Rica,506,CR,CRC
  Cote d'Ivoire,225,CI,XOF
  Croatia,385,HR,HRK
  Cuba,53,CU,CUP
  Cyprus,357,CY,CYP
  Czech Republic,420,CZ,CZK
  Denmark,45,DK,DKK
  Djibouti,253,DJ,DJF
  Dominica,1767,DM,XCD
  Dominican Republic,1849,DO,DOP
  Ecuador,593,EC,ECS
  Egypt,20,EG,EGP
  El Salvador,503,SV,SVC
  Equatorial Guinea,240,GQ,XAF
  Eritrea,291,ER,ETB
  Estonia,372,EE,EEK
  Ethiopia,251,ET,ETB
  Falkland Islands (Malvinas),500,FK,FKP
  Faroe Islands,298,FO,DKK
  Fiji,679,FJ,FJD
  Finland,358,FI,EUR
  France,33,FR,EUR
  French Guiana,594,GF,EUR
  French Polynesia,689,PF,XPF
  Gabon,241,GA,XAF
  Gambia,220,GM,GMD
  Georgia,995,GE,GEL
  Germany,49,DE,EUR
  Ghana,233,GH,GHS
  Gibraltar,350,GI,GIP
  Greece,30,GR,EUR
  Greenland,299,GL,DKK
  Grenada,1473,GD,XCD
  Guadeloupe,590,GP,EUR
  Guam,1671,GU,USD
  Guatemala,502,GT,GTQ
  Guernsey,44,GG,GGP
  Guinea,224,GN,GNF
  Guinea-Bissau,245,GW,XOF
  Guyana,595,GY,GYD
  Haiti,509,HT,HTG
  Holy See (Vatican City State),379,VA,EUR
  Honduras,504,HN,HNL
  Hong Kong,852,HK,HKD
  Hungary,36,HU,HUF
  Iceland,354,IS,ISK
  India,91,IN,INR
  Indonesia,62,ID,IDR
  "Iran, Islamic Republic of Persian Gulf",98,IR,IRR
  Iraq,964,IQ,IQD
  Ireland,353,IE,EUR
  Isle of Man,44,IM,GBP
  Israel,972,IL,ILS
  Italy,39,IT,EUR
  Jamaica,1876,JM,JMD
  Japan,81,JP,JPY
  Jersey,44,JE,GBP
  Jordan,962,JO,JOD
  Kazakhstan,77,KZ,KZT
  Kenya,254,KE,KES
  Kiribati,686,KI,AUD
  "Korea, Democratic People's Republic of Korea",850,KP,KPW
  "Korea, Republic of South Korea",82,KR,KRW
  Kuwait,965,KW,KWD
  Kyrgyzstan,996,KG,KGS
  Laos,856,LA,LAK
  Latvia,371,LV,LVL
  Lebanon,961,LB,LBP
  Lesotho,266,LS,LSL
  Liberia,231,LR,LRD
  Libyan Arab Jamahiriya,218,LY,LYD
  Liechtenstein,423,LI,CHF
  Lithuania,370,LT,LTL
  Luxembourg,352,LU,EUR
  Macao,853,MO,MOP
  Macedonia,389,MK,MKD
  Madagascar,261,MG,MGA
  Malawi,265,MW,MWK
  Malaysia,60,MY,MYR
  Maldives,960,MV,MVR
  Mali,223,ML,XOF
  Malta,356,MT,MTL
  Marshall Islands,692,MH,USD
  Martinique,596,MQ,EUR
  Mauritania,222,MR,MRO
  Mauritius,230,MU,MUR
  Mayotte,262,YT,EUR
  Mexico,52,MX,MXN
  "Micronesia, Federated States of Micronesia",691,FM,USD
  Moldova,373,MD,MDL
  Monaco,377,MC,EUR
  Mongolia,976,MN,MNT
  Montenegro,382,ME,EUR
  Montserrat,1664,MS,XCD
  Morocco,212,MA,MAD
  Mozambique,258,MZ,MZN
  Myanmar,95,MM,MMK
  Namibia,264,NA,NAD
  Nauru,674,NR,AUD
  Nepal,977,NP,NPR
  Netherlands,31,NL,EUR
  Netherlands Antilles,599,AN,ANG
  New Caledonia,687,NC,XPF
  New Zealand,64,NZ,NZD
  Nicaragua,505,NI,NIO
  Niger,227,NE,XOF
  Nigeria,234,NG,NGN
  Niue,683,NU,NZD
  Norfolk Island,672,NF,AUD
  Northern Mariana Islands,1670,MP,USD
  Norway,47,NO,NOK
  Oman,968,OM,OMR
  Pakistan,92,PK,PKR
  Palau,680,PW,USD
  "Palestinian Territory, Occupied",970,PS,JOD
  Panama,507,PA,PAB
  Papua New Guinea,675,PG,PGK
  Paraguay,595,PY,PYG
  Peru,51,PE,PEN
  Philippines,63,PH,PHP
  Pitcairn,872,PN,NZD
  Poland,48,PL,PLN
  Portugal,351,PT,EUR
  Puerto Rico,1939,PR,USD
  Qatar,974,QA,QAR
  Reunion,262,RE,EUR
  Romania,40,RO,RON
  Russia,7,RU,RUB
  Rwanda,250,RW,RWF
  Saint Barthelemy,590,BL,EUR
  "Saint Helena, Ascension and Tristan Da Cunha",290,SH,GBP
  Saint Kitts and Nevis,1869,KN,XCD
  Saint Lucia,1758,LC,XCD
  Saint Martin,590,MF,ANG
  Saint Pierre and Miquelon,508,PM,EUR
  Saint Vincent and the Grenadines,1784,VC,XCD
  Samoa,685,WS,EUR
  San Marino,378,SM,EUR
  Sao Tome and Principe,239,ST,STD
  Saudi Arabia,966,SA,SAR
  Senegal,221,SN,XOF
  Serbia,381,RS,RSD
  Seychelles,248,SC,SCR
  Sierra Leone,232,SL,SLL
  Singapore,65,SG,SGD
  Slovakia,421,SK,SKK
  Slovenia,386,SI,EUR
  Solomon Islands,677,SB,SBD
  Somalia,252,SO,SOS
  South Africa,27,ZA,ZAR
  South Georgia and the South Sandwich Islands,500,GS,GBP
  South Sudan,211,SS,#N/A
  Spain,34,ES,EUR
  Sri Lanka,94,LK,LKR
  Sudan,249,SD,SDG
  Suriname,597,SR,SRD
  Svalbard and Jan Mayen,47,SJ,NOK
  Swaziland,268,SZ,SZL
  Sweden,46,SE,SEK
  Switzerland,41,CH,CHF
  Syrian Arab Republic,963,SY,SYP
  Taiwan,886,TW,TWD
  Tajikistan,992,TJ,TJS
  "Tanzania, United Republic of Tanzania",255,TZ,TZS
  Thailand,66,TH,THB
  Timor-Leste,670,TL,#N/A
  Togo,228,TG,XOF
  Tokelau,690,TK,NZD
  Tonga,676,TO,TOP
  Trinidad and Tobago,1868,TT,TTD
  Tunisia,216,TN,TND
  Turkey,90,TR,TRY
  Turkmenistan,993,TM,TMT
  Turks and Caicos Islands,1649,TC,USD
  Tuvalu,688,TV,AUD
  Uganda,256,UG,UGX
  Ukraine,380,UA,UAH
  United Arab Emirates,971,AE,AED
  United Kingdom,44,GB,GBP
  United States,1,US,USD
  Uruguay,598,UY,UYU
  Uzbekistan,998,UZ,UZS
  Vanuatu,678,VU,VUV
  "Venezuela, Bolivarian Republic of Venezuela",58,VE,VEF
  Vietnam,84,VN,VND
  "Virgin Islands, British",1284,VG,USD
  "Virgin Islands, U.S.",1340,VI,USD
  Wallis and Futuna,681,WF,XPF
  Yemen,967,YE,YER
  Zambia,260,ZM,ZMK
  Zimbabwe,263,ZW,ZWD`;
  return getJsonFromCsv(test);
};
