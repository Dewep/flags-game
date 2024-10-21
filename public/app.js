let svgContainer = null
let svgElement = null

// Fetch the SVG map and add it to the container
fetch('world.svg')
  .then(response => response.text())
  .then(svgData => {
    svgContainer = document.getElementById('map-container');
    svgContainer.innerHTML = svgData;
    // addCountryClickEvents();
    svgElement = svgContainer.querySelector('svg')
    addZoomAndPanFunctionality(svgElement);
    // colorCountry('fr');
  });

function addZoomAndPanFunctionality(svgElement) {
  let viewBox = svgElement.viewBox.baseVal; // Get the current viewBox
  let isPanning = false;
  let startX, startY; // Variables to store the starting mouse positions for panning

  // Handle mouse wheel zooming
  svgContainer.addEventListener('wheel', function (event) {
    event.preventDefault();

    // Calculate the scale factor
    const zoomFactor = 0.1;
    const zoomIn = event.deltaY < 0 ? 1 + zoomFactor : 1 - zoomFactor;

    // Get the current mouse position relative to the container
    const rect = svgElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate mouse position relative to the current viewBox
    const svgMouseX = viewBox.x + (mouseX / rect.width) * viewBox.width;
    const svgMouseY = viewBox.y + (mouseY / rect.height) * viewBox.height;

    // Adjust the viewBox for zoom
    viewBox.width /= zoomIn;
    viewBox.height /= zoomIn;

    // Re-center the viewBox around the cursor position
    viewBox.x = svgMouseX - (mouseX / rect.width) * viewBox.width;
    viewBox.y = svgMouseY - (mouseY / rect.height) * viewBox.height;

    // Update the viewBox
    svgElement.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
  });

  // Handle panning
  svgContainer.addEventListener('mousedown', function (event) {
    isPanning = true;
    startX = event.clientX;
    startY = event.clientY;
    svgContainer.style.cursor = 'grabbing'; // Change cursor on drag
  });

  svgContainer.addEventListener('mousemove', function (event) {
    if (!isPanning) return;

    // Calculate the pan offsets
    const dx = (startX - event.clientX) * (viewBox.width / svgContainer.clientWidth);
    const dy = (startY - event.clientY) * (viewBox.height / svgContainer.clientHeight);

    // Update the viewBox
    viewBox.x += dx;
    viewBox.y += dy;

    // Update starting positions for the next movement
    startX = event.clientX;
    startY = event.clientY;

    // Apply the updated viewBox to pan the SVG
    svgElement.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`);
  });

  svgContainer.addEventListener('mouseup', function () {
    isPanning = false;
    svgContainer.style.cursor = 'grab'; // Revert cursor after drag
  });

  svgContainer.addEventListener('mouseleave', function () {
    isPanning = false;
    svgContainer.style.cursor = 'grab'; // Revert cursor after leaving container
  });
}

function zoomToElement(svgElement, selector) {
  const targetElement = svgElement.querySelector(selector);

  if (targetElement) {
    const bbox = targetElement.getBBox(); // Get the bounding box of the element

    // Adjust the viewBox to focus on the element's bounding box
    const padding = 10; // Add some padding around the element
    const viewBoxX = bbox.x - padding;
    const viewBoxY = bbox.y - padding;
    const viewBoxWidth = bbox.width + padding * 2;
    const viewBoxHeight = bbox.height + padding * 2;

    svgElement.setAttribute('viewBox', `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
  } else {
    console.error(`Element with selector "${selector}" not found.`);
  }
}

// Function to color a country dynamically
function colorCountry(countryCode, color = 'orange') {
  for (const land of document.querySelectorAll('.landxx')) {
    land.style.fill = ''
  }
  if (countryCode) {
    for (const land of document.querySelectorAll('.landxx.' + countryCode)) {
      land.style.fill = color;
    }
    zoomToElement(svgElement, '#' + countryCode)
  }
}

// https://hampusborgos.github.io/country-flags/
const countries = [
  {code:"AD",en:"Andorra",fr:"Andorre"},
  {code:"AE",en:"United Arab Emirates",fr:"Émirats arabes unis"},
  {code:"AF",en:"Afghanistan",fr:"Afghanistan"},
  {code:"AG",en:"Antigua and Barbuda",fr:"Antigua-et-Barbuda"},
  {code:"AI",en:"Anguilla",fr:"Anguilla"},
  {code:"AL",en:"Albania",fr:"Albanie"},
  {code:"AM",en:"Armenia",fr:"Arménie"},
  {code:"AO",en:"Angola",fr:"Angola"},
  {code:"AQ",en:"Antarctica",fr:"Antarctique"},
  {code:"AR",en:"Argentina",fr:"Argentine"},
  {code:"AS",en:"American Samoa",fr:"Samoa américaines"},
  {code:"AT",en:"Austria",fr:"Autriche"},
  {code:"AU",en:"Australia",fr:"Australie"},
  {code:"AW",en:"Aruba",fr:"Aruba"},
  {code:"AX",en:"Åland Islands",fr:"Îles Åland"},
  {code:"AZ",en:"Azerbaijan",fr:"Azerbaïdjan"},
  {code:"BA",en:"Bosnia and Herzegovina",fr:"Bosnie-Herzégovine"},
  {code:"BB",en:"Barbados",fr:"Barbade"},
  {code:"BD",en:"Bangladesh",fr:"Bangladesh"},
  {code:"BE",en:"Belgium",fr:"Belgique"},
  {code:"BF",en:"Burkina Faso",fr:"Burkina Faso"},
  {code:"BG",en:"Bulgaria",fr:"Bulgarie"},
  {code:"BH",en:"Bahrain",fr:"Bahreïn"},
  {code:"BI",en:"Burundi",fr:"Burundi"},
  {code:"BJ",en:"Benin",fr:"Bénin"},
  {code:"BL",en:"Saint Barthélemy",fr:"Saint-Barthélemy"},
  {code:"BM",en:"Bermuda",fr:"Bermudes"},
  {code:"BN",en:"Brunei Darussalam",fr:"Brunéi Darussalam"},
  {code:"BO",en:"Bolivia, Plurinational State of",fr:"Bolivie"},
  {code:"BQ",en:"Caribbean Netherlands",fr:"Pays-Bas caribéens"},
  {code:"BR",en:"Brazil",fr:"Brésil"},
  {code:"BS",en:"Bahamas",fr:"Bahamas"},
  {code:"BT",en:"Bhutan",fr:"Bhoutan"},
  {code:"BV",en:"Bouvet Island",fr:"Île Bouvet"},
  {code:"BW",en:"Botswana",fr:"Botswana"},
  {code:"BY",en:"Belarus",fr:"Biélorussie"},
  {code:"BZ",en:"Belize",fr:"Belize"},
  {code:"CA",en:"Canada",fr:"Canada"},
  {code:"CC",en:"Cocos (Keeling) Islands",fr:"Îles Cocos (Keeling)"},
  {code:"CD",en:"Congo, the Democratic Republic of the",fr:"République démocratique du Congo"},
  {code:"CF",en:"Central African Republic",fr:"République centrafricaine"},
  {code:"CG",en:"Republic of the Congo",fr:"République du Congo"},
  {code:"CH",en:"Switzerland",fr:"Suisse"},
  {code:"CI",en:"Côte d'Ivoire",fr:"Côte d'Ivoire"},
  {code:"CK",en:"Cook Islands",fr:"Îles Cook"},
  {code:"CL",en:"Chile",fr:"Chili"},
  {code:"CM",en:"Cameroon",fr:"Cameroun"},
  {code:"CN",en:"China (People's Republic of China)",fr:"Chine"},
  {code:"CO",en:"Colombia",fr:"Colombie"},
  {code:"CR",en:"Costa Rica",fr:"Costa Rica"},
  {code:"CU",en:"Cuba",fr:"Cuba"},
  {code:"CV",en:"Cape Verde",fr:"Cap-Vert"},
  {code:"CW",en:"Curaçao",fr:"Curaçao"},
  {code:"CX",en:"Christmas Island",fr:"Île Christmas"},
  {code:"CY",en:"Cyprus",fr:"Chypre"},
  {code:"CZ",en:"Czech Republic",fr:"République tchèque"},
  {code:"DE",en:"Germany",fr:"Allemagne"},
  {code:"DJ",en:"Djibouti",fr:"Djibouti"},
  {code:"DK",en:"Denmark",fr:"Danemark"},
  {code:"DM",en:"Dominica",fr:"Dominique"},
  {code:"DO",en:"Dominican Republic",fr:"République dominicaine"},
  {code:"DZ",en:"Algeria",fr:"Algérie"},
  {code:"EC",en:"Ecuador",fr:"Équateur"},
  {code:"EE",en:"Estonia",fr:"Estonie"},
  {code:"EG",en:"Egypt",fr:"Égypte"},
  {code:"EH",en:"Western Sahara",fr:"Sahara occidental"},
  {code:"ER",en:"Eritrea",fr:"Érythrée"},
  {code:"ES",en:"Spain",fr:"Espagne"},
  {code:"ET",en:"Ethiopia",fr:"Éthiopie"},
  {code:"EU",en:"Europe",fr:"Europe"},
  {code:"FI",en:"Finland",fr:"Finlande"},
  {code:"FJ",en:"Fiji",fr:"Fidji"},
  {code:"FK",en:"Falkland Islands (Malvinas)",fr:"Îles Malouines"},
  {code:"FM",en:"Micronesia, Federated States of",fr:"Micronésie"},
  {code:"FO",en:"Faroe Islands",fr:"Îles Féroé"},
  {code:"FR",en:"France",fr:"France"},
  {code:"GA",en:"Gabon",fr:"Gabon"},
  {code:"GB-ENG",en:"England",fr:"Angleterre"},
  {code:"GB-NIR",en:"Northern Ireland",fr:"Irlande du Nord"},
  {code:"GB-SCT",en:"Scotland",fr:"Écosse"},
  {code:"GB-WLS",en:"Wales",fr:"Pays de Galles"},
  {code:"GB",en:"United Kingdom",fr:"Royaume-Uni"},
  {code:"GD",en:"Grenada",fr:"Grenade"},
  {code:"GE",en:"Georgia",fr:"Géorgie"},
  {code:"GF",en:"French Guiana",fr:"Guyane française"},
  {code:"GG",en:"Guernsey",fr:"Guernesey"},
  {code:"GH",en:"Ghana",fr:"Ghana"},
  {code:"GI",en:"Gibraltar",fr:"Gibraltar"},
  {code:"GL",en:"Greenland",fr:"Groenland"},
  {code:"GM",en:"Gambia",fr:"Gambie"},
  {code:"GN",en:"Guinea",fr:"Guinée"},
  {code:"GP",en:"Guadeloupe",fr:"Guadeloupe"},
  {code:"GQ",en:"Equatorial Guinea",fr:"Guinée équatoriale"},
  {code:"GR",en:"Greece",fr:"Grèce"},
  {code:"GS",en:"South Georgia and the South Sandwich Islands",fr:"Géorgie du Sud et îles Sandwich du Sud"},
  {code:"GT",en:"Guatemala",fr:"Guatemala"},
  {code:"GU",en:"Guam",fr:"Guam"},
  {code:"GW",en:"Guinea-Bissau",fr:"Guinée-Bissau"},
  {code:"GY",en:"Guyana",fr:"Guyana"},
  {code:"HK",en:"Hong Kong",fr:"Hong Kong"},
  {code:"HM",en:"Heard Island and McDonald Islands",fr:"Île Heard et îles McDonald"},
  {code:"HN",en:"Honduras",fr:"Honduras"},
  {code:"HR",en:"Croatia",fr:"Croatie"},
  {code:"HT",en:"Haiti",fr:"Haïti"},
  {code:"HU",en:"Hungary",fr:"Hongrie"},
  {code:"ID",en:"Indonesia",fr:"Indonésie"},
  {code:"IE",en:"Ireland",fr:"Irlande"},
  {code:"IL",en:"Israel",fr:"Israël"},
  {code:"IM",en:"Isle of Man",fr:"Île de Man"},
  {code:"IN",en:"India",fr:"Inde"},
  {code:"IO",en:"British Indian Ocean Territory",fr:"Territoire britannique de l'océan Indien"},
  {code:"IQ",en:"Iraq",fr:"Irak"},
  {code:"IR",en:"Iran, Islamic Republic of",fr:"Iran"},
  {code:"IS",en:"Iceland",fr:"Islande"},
  {code:"IT",en:"Italy",fr:"Italie"},
  {code:"JE",en:"Jersey",fr:"Jersey"},
  {code:"JM",en:"Jamaica",fr:"Jamaïque"},
  {code:"JO",en:"Jordan",fr:"Jordanie"},
  {code:"JP",en:"Japan",fr:"Japon"},
  {code:"KE",en:"Kenya",fr:"Kenya"},
  {code:"KG",en:"Kyrgyzstan",fr:"Kirghizistan"},
  {code:"KH",en:"Cambodia",fr:"Cambodge"},
  {code:"KI",en:"Kiribati",fr:"Kiribati"},
  {code:"KM",en:"Comoros",fr:"Comores"},
  {code:"KN",en:"Saint Kitts and Nevis",fr:"Saint-Kitts-et-Nevis"},
  {code:"KP",en:"Korea, Democratic People's Republic of",fr:"Corée du Nord"},
  {code:"KR",en:"Korea, Republic of",fr:"Corée du Sud"},
  {code:"KW",en:"Kuwait",fr:"Koweït"},
  {code:"KY",en:"Cayman Islands",fr:"Îles Caïmans"},
  {code:"KZ",en:"Kazakhstan",fr:"Kazakhstan"},
  {code:"LA",en:"Laos (Lao People's Democratic Republic)",fr:"Laos"},
  {code:"LB",en:"Lebanon",fr:"Liban"},
  {code:"LC",en:"Saint Lucia",fr:"Sainte-Lucie"},
  {code:"LI",en:"Liechtenstein",fr:"Liechtenstein"},
  {code:"LK",en:"Sri Lanka",fr:"Sri Lanka"},
  {code:"LR",en:"Liberia",fr:"Libéria"},
  {code:"LS",en:"Lesotho",fr:"Lesotho"},
  {code:"LT",en:"Lithuania",fr:"Lituanie"},
  {code:"LU",en:"Luxembourg",fr:"Luxembourg"},
  {code:"LV",en:"Latvia",fr:"Lettonie"},
  {code:"LY",en:"Libya",fr:"Libye"},
  {code:"MA",en:"Morocco",fr:"Maroc"},
  {code:"MC",en:"Monaco",fr:"Monaco"},
  {code:"MD",en:"Moldova, Republic of",fr:"Moldavie"},
  {code:"ME",en:"Montenegro",fr:"Monténégro"},
  {code:"MF",en:"Saint Martin",fr:"Saint-Martin"},
  {code:"MG",en:"Madagascar",fr:"Madagascar"},
  {code:"MH",en:"Marshall Islands",fr:"Îles Marshall"},
  {code:"MK",en:"North Macedonia",fr:"Macédoine du Nord"},
  {code:"ML",en:"Mali",fr:"Mali"},
  {code:"MM",en:"Myanmar",fr:"Myanmar"},
  {code:"MN",en:"Mongolia",fr:"Mongolie"},
  {code:"MO",en:"Macao",fr:"Macao"},
  {code:"MP",en:"Northern Mariana Islands",fr:"Îles Mariannes du Nord"},
  {code:"MQ",en:"Martinique",fr:"Martinique"},
  {code:"MR",en:"Mauritania",fr:"Mauritanie"},
  {code:"MS",en:"Montserrat",fr:"Montserrat"},
  {code:"MT",en:"Malta",fr:"Malte"},
  {code:"MU",en:"Mauritius",fr:"Maurice"},
  {code:"MV",en:"Maldives",fr:"Maldives"},
  {code:"MW",en:"Malawi",fr:"Malawi"},
  {code:"MX",en:"Mexico",fr:"Mexique"},
  {code:"MY",en:"Malaysia",fr:"Malaisie"},
  {code:"MZ",en:"Mozambique",fr:"Mozambique"},
  {code:"NA",en:"Namibia",fr:"Namibie"},
  {code:"NC",en:"New Caledonia",fr:"Nouvelle-Calédonie"},
  {code:"NE",en:"Niger",fr:"Niger"},
  {code:"NF",en:"Norfolk Island",fr:"Île Norfolk"},
  {code:"NG",en:"Nigeria",fr:"Nigéria"},
  {code:"NI",en:"Nicaragua",fr:"Nicaragua"},
  {code:"NL",en:"Netherlands",fr:"Pays-Bas"},
  {code:"NO",en:"Norway",fr:"Norvège"},
  {code:"NP",en:"Nepal",fr:"Népal"},
  {code:"NR",en:"Nauru",fr:"Nauru"},
  {code:"NU",en:"Niue",fr:"Niue"},
  {code:"NZ",en:"New Zealand",fr:"Nouvelle-Zélande"},
  {code:"OM",en:"Oman",fr:"Oman"},
  {code:"PA",en:"Panama",fr:"Panama"},
  {code:"PE",en:"Peru",fr:"Pérou"},
  {code:"PF",en:"French Polynesia",fr:"Polynésie française"},
  {code:"PG",en:"Papua New Guinea",fr:"Papouasie-Nouvelle-Guinée"},
  {code:"PH",en:"Philippines",fr:"Philippines"},
  {code:"PK",en:"Pakistan",fr:"Pakistan"},
  {code:"PL",en:"Poland",fr:"Pologne"},
  {code:"PM",en:"Saint Pierre and Miquelon",fr:"Saint-Pierre-et-Miquelon"},
  {code:"PN",en:"Pitcairn",fr:"Pitcairn"},
  {code:"PR",en:"Puerto Rico",fr:"Porto Rico"},
  {code:"PS",en:"Palestine",fr:"Palestine"},
  {code:"PT",en:"Portugal",fr:"Portugal"},
  {code:"PW",en:"Palau",fr:"Palaos"},
  {code:"PY",en:"Paraguay",fr:"Paraguay"},
  {code:"QA",en:"Qatar",fr:"Qatar"},
  {code:"RE",en:"Réunion",fr:"La Réunion"},
  {code:"RO",en:"Romania",fr:"Roumanie"},
  {code:"RS",en:"Serbia",fr:"Serbie"},
  {code:"RU",en:"Russian Federation",fr:"Russie"},
  {code:"RW",en:"Rwanda",fr:"Rwanda"},
  {code:"SA",en:"Saudi Arabia",fr:"Arabie saoudite"},
  {code:"SB",en:"Solomon Islands",fr:"Îles Salomon"},
  {code:"SC",en:"Seychelles",fr:"Seychelles"},
  {code:"SD",en:"Sudan",fr:"Soudan"},
  {code:"SE",en:"Sweden",fr:"Suède"},
  {code:"SG",en:"Singapore",fr:"Singapour"},
  {code:"SH",en:"Saint Helena, Ascension and Tristan da Cunha",fr:"Sainte-Hélène, Ascension et Tristan da Cunha"},
  {code:"SI",en:"Slovenia",fr:"Slovénie"},
  {code:"SJ",en:"Svalbard and Jan Mayen Islands",fr:"Svalbard et Jan Mayen"},
  {code:"SK",en:"Slovakia",fr:"Slovaquie"},
  {code:"SL",en:"Sierra Leone",fr:"Sierra Leone"},
  {code:"SM",en:"San Marino",fr:"Saint-Marin"},
  {code:"SN",en:"Senegal",fr:"Sénégal"},
  {code:"SO",en:"Somalia",fr:"Somalie"},
  {code:"SR",en:"Suriname",fr:"Suriname"},
  {code:"SS",en:"South Sudan",fr:"Soudan du Sud"},
  {code:"ST",en:"Sao Tome and Principe",fr:"Sao Tomé-et-Principe"},
  {code:"SV",en:"El Salvador",fr:"Salvador"},
  {code:"SX",en:"Sint Maarten (Dutch part)",fr:"Saint-Martin (partie néerlandaise)"},
  {code:"SY",en:"Syrian Arab Republic",fr:"Syrie"},
  {code:"SZ",en:"Swaziland",fr:"Eswatini"},
  {code:"TC",en:"Turks and Caicos Islands",fr:"Îles Turques-et-Caïques"},
  {code:"TD",en:"Chad",fr:"Tchad"},
  {code:"TF",en:"French Southern Territories",fr:"Terres australes françaises"},
  {code:"TG",en:"Togo",fr:"Togo"},
  {code:"TH",en:"Thailand",fr:"Thaïlande"},
  {code:"TJ",en:"Tajikistan",fr:"Tadjikistan"},
  {code:"TK",en:"Tokelau",fr:"Tokelau"},
  {code:"TL",en:"Timor-Leste",fr:"Timor oriental"},
  {code:"TM",en:"Turkmenistan",fr:"Turkménistan"},
  {code:"TN",en:"Tunisia",fr:"Tunisie"},
  {code:"TO",en:"Tonga",fr:"Tonga"},
  {code:"TR",en:"Turkey",fr:"Turquie"},
  {code:"TT",en:"Trinidad and Tobago",fr:"Trinité-et-Tobago"},
  {code:"TV",en:"Tuvalu",fr:"Tuvalu"},
  {code:"TW",en:"Taiwan (Republic of China)",fr:"Taïwan"},
  {code:"TZ",en:"Tanzania, United Republic of",fr:"Tanzanie"},
  {code:"UA",en:"Ukraine",fr:"Ukraine"},
  {code:"UG",en:"Uganda",fr:"Ouganda"},
  {code:"UM",en:"US Minor Outlying Islands",fr:"Îles mineures éloignées des États-Unis"},
  {code:"US",en:"United States",fr:"États-Unis"},
  {code:"UY",en:"Uruguay",fr:"Uruguay"},
  {code:"UZ",en:"Uzbekistan",fr:"Ouzbékistan"},
  {code:"VA",en:"Holy See (Vatican City State)",fr:"Saint-Siège (État de la Cité du Vatican)"},
  {code:"VC",en:"Saint Vincent and the Grenadines",fr:"Saint-Vincent-et-les-Grenadines"},
  {code:"VE",en:"Venezuela, Bolivarian Republic of",fr:"Venezuela"},
  {code:"VG",en:"Virgin Islands, British",fr:"Îles Vierges britanniques"},
  {code:"VI",en:"Virgin Islands, U.S.",fr:"Îles Vierges des États-Unis"},
  {code:"VN",en:"Vietnam",fr:"Viêt Nam"},
  {code:"VU",en:"Vanuatu",fr:"Vanuatu"},
  {code:"WF",en:"Wallis and Futuna Islands",fr:"Wallis-et-Futuna"},
  {code:"WS",en:"Samoa",fr:"Samoa"},
  {code:"XK",en:"Kosovo",fr:"Kosovo"},
  {code:"YE",en:"Yemen",fr:"Yémen"},
  {code:"YT",en:"Mayotte",fr:"Mayotte"},
  {code:"ZA",en:"South Africa",fr:"Afrique du Sud"},
  {code:"ZM",en:"Zambia",fr:"Zambie"},
  {code:"ZW",en:"Zimbabwe",fr:"Zimbabwe"}
]

const { createApp, ref, computed, watch } = Vue

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function normalizeStr(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function setup() {
  const hardMode = ref(true)
  const selectionIndex = ref(0)
  const score = ref(0)
  const scores = ref([])

  const nextIndexes = ref([])

  const index = ref(0)

  const query = ref('')

  const mapCountry = ref(null)

  const allCountries = computed(() => countries.map(c => ({
    ...c,
    code: c.code.toLowerCase(),
    query: normalizeStr(c.fr + ' ' + c.en),
  })))

  const country = computed(() => {
    return allCountries.value[index.value]
  })

  const possibilities = computed(() => {
    const list = hardMode.value ? [...allCountries.value] : [country.value]
    while (list.length < 10) {
      const randCountry = allCountries.value[Math.floor(Math.random() * allCountries.value.length)]
      if (!list.some(c => c.code === randCountry.code)) {
        list.push(randCountry)
      }
    }
    shuffleArray(list)
    return list
  })

  const filteredPossibilities = computed(() => possibilities.value.filter(c => {
    if (!query.value.length) {
      return true
    }
    return c.query.includes(normalizeStr(query.value))
  }))

  watch([filteredPossibilities, selectionIndex], () => {
    if (selectionIndex.value >= filteredPossibilities.value.length) {
      selectionIndex.value = filteredPossibilities.value.length - 1
    }
    if (selectionIndex.value < 0) {
      selectionIndex.value = 0
    }
  })

  const updateScore = (offset) => {
    score.value += offset
    scores.value.unshift(offset)
    if (scores.value.length > 10) {
      scores.value.pop()
    }
  }

  const reset = () => {
    if (nextIndexes.value.length < 50) {
      const newNextIndexes = [...nextIndexes.value, ...Array.from(Array(allCountries.value.length).keys())]
      shuffleArray(newNextIndexes)
      nextIndexes.value = newNextIndexes
    }

    index.value = nextIndexes.value.pop()
    query.value = ''
    selectionIndex.value = 0
    hardMode.value = true

    if (document.querySelector('input')) {
      document.querySelector('input').focus()
    }
  }

  const select = (code) => {
    const error = country.value.code !== code
    if (hardMode.value && error) {
      hardMode.value = false
      query.value = ''
      updateScore(-1)
      return
    }
    if (error) {
      updateScore(-3)
    } else if (hardMode.value) {
      updateScore(2)
    } else {
      updateScore(1)
    }

    colorCountry(country.value.code)
    mapCountry.value = country.value

    reset()
  }

  const enter = () => {
    if (selectionIndex.value < filteredPossibilities.value.length) {
      select(filteredPossibilities.value[selectionIndex.value].code)
    }
  }

  reset()

  return {
    score,
    scores,
    query,
    selectionIndex,
    mapCountry,
    country,
    filteredPossibilities,
    select,
    enter,
  }
}

createApp({ setup }).mount('#app')
