import { store } from './store'

// Category order and copy used by the nav, home rows, footer and listing pages.
export const categoryInfo = {
  'Washing Machines': { sub: 'Front load, top load & twin tub', subs: 'Front Load · Top Load · Twin Tub', prefix: 'Grab the best deal on' },
  'Air Conditioners': { sub: 'DC inverter & split ACs', subs: 'Inverter ACs · Split ACs · Heat & Cool', prefix: 'Shop the best deals on' },
  'Refrigerators': { sub: 'Inverter, glass door & side-by-side', subs: 'Inverter · Glass Door · Side-by-Side', prefix: 'Top picks in' },
  'Small Kitchen Appliances': { sub: 'Microwaves, air fryers, blenders, kettles & irons', subs: 'Microwaves · Air Fryers · Blenders · Kettles · Irons', prefix: 'Best prices on' },
}
export const categories = Object.keys(categoryInfo)
const [WM, AC, RF, SK] = categories

// [category, brand, name, model, capacity, inverter, type, price, discounted price]
const RAW = [
  [AC, 'Haier', 'Haier 1.5 Ton DC Inverter AC', 'HSU-18HFCM', '1.5 Ton', true, 'Heat & Cool', 219999, 189999],
  [AC, 'Gree', 'Gree 1.5 Ton Pular Inverter AC', 'GS-18PITH11G', '1.5 Ton', true, 'Heat & Cool', 209000, 184500],
  [AC, 'Dawlance', 'Dawlance 1 Ton Elegance Inverter AC', 'ELEGANCE-15', '1 Ton', true, 'Heat & Cool', 159999, 139999],
  [AC, 'Orient', 'Orient 1.5 Ton Ultron Plus Inverter AC', 'OS-18MW', '1.5 Ton', true, 'Heat & Cool', 199000, 176000],
  [AC, 'PEL', 'PEL 1.5 Ton InverterOn Glam AC', 'PINV-18K', '1.5 Ton', true, 'Cool Only', 189999, 169999],
  [AC, 'Samsung', 'Samsung 2 Ton WindFree Inverter AC', 'AR24TVFZ', '2 Ton', true, 'Heat & Cool · Wi-Fi', 329999, 289999],
  [AC, 'Haier', 'Haier 1 Ton Split AC', 'HSU-12HFA', '1 Ton', false, 'Cool Only', 119999, 109999],
  [AC, 'Kenwood', 'Kenwood 1.5 Ton eSmart Inverter AC', 'KES-1840S', '1.5 Ton', true, 'Heat & Cool', 195000, 172000],
  [AC, 'Gree', 'Gree 2 Ton Fairy Inverter AC', 'GS-24FITH', '2 Ton', true, 'Heat & Cool', 285000, 259000],
  [AC, 'Dawlance', 'Dawlance 1.5 Ton Sprinter Split AC', 'SPRINTER-30', '1.5 Ton', false, 'Cool Only', 134999, 124999],
  [WM, 'Haier', 'Haier 8 kg Front Load Washer', 'HW80-BP12929', '8 kg', true, 'Front Load', 179999, 154999],
  [WM, 'Samsung', 'Samsung 9 kg EcoBubble Front Load', 'WW90T4040CE', '9 kg', true, 'Front Load', 249999, 214999],
  [WM, 'LG', 'LG 10 kg Smart Inverter Top Load', 'T2310VSAM', '10 kg', true, 'Top Load', 159999, 139999],
  [WM, 'Dawlance', 'Dawlance 12 kg Twin Tub Washer', 'DW-6550 W', '12 kg', false, 'Twin Tub', 47999, 42999],
  [WM, 'Haier', 'Haier 10 kg Top Load Automatic', 'HWM 100-1789', '10 kg', false, 'Top Load', 112999, 99999],
  [WM, 'Dawlance', 'Dawlance 8 kg Fully Automatic', 'DWT-255 C', '8 kg', false, 'Top Load', 94999, 84999],
  [WM, 'PEL', 'PEL 10 kg Twin Tub Washer', 'PWM-1100', '10 kg', false, 'Twin Tub', 42999, 38999],
  [WM, 'LG', 'LG 8 kg AI DD Front Load', 'FV1208S4W', '8 kg', true, 'Front Load', 214999, 189999],
  [RF, 'Haier', 'Haier 13 cu ft Inverter Glass Door', 'HRF-368 IBG', '13 cu ft', true, 'Glass Door', 184999, 164999],
  [RF, 'Dawlance', 'Dawlance 15 cu ft Avante+ Inverter', '9193 LF', '15 cu ft', true, 'Glass Door', 194999, 172999],
  [RF, 'PEL', 'PEL 14 cu ft Glass Door Inverter', 'PRINVO-2550', '14 cu ft', true, 'Glass Door', 169999, 149999],
  [RF, 'Orient', 'Orient 18 cu ft Grand Refrigerator', 'OR-6058 GW', '18 cu ft', false, 'Double Door', 199000, 179000],
  [RF, 'Samsung', 'Samsung 23 cu ft Side-by-Side', 'RS64R5331B4', '23 cu ft', true, 'Side-by-Side', 549999, 489999],
  [RF, 'LG', 'LG 15 cu ft Smart Inverter', 'GR-B372SQCB', '15 cu ft', true, 'No-Frost', 224999, 199999],
  [RF, 'Dawlance', 'Dawlance 11 cu ft Chrome Refrigerator', '9144 WB', '11 cu ft', false, 'Double Door', 109999, 99999],
  [RF, 'Haier', 'Haier 20 cu ft E-Star Refrigerator', 'HRF-538 EBS', '20 cu ft', true, 'Double Door', 234999, 209999],
  [SK, 'Kenwood', 'Kenwood 4.5 L Digital Air Fryer', 'HFP30', '4.5 L', false, 'Air Fryer', 29999, 24999],
  [SK, 'Dawlance', 'Dawlance 20 L Solo Microwave', 'DW-MD4', '20 L', false, 'Microwave', 24999, 21499],
  [SK, 'Kenwood', 'Kenwood 500W Blender with Mill', 'BLP41', '2 L', false, 'Blender', 16499, 13999],
  [SK, 'Orient', 'Orient 1.7 L Cordless Kettle', 'OK-1702', '1.7 L', false, 'Kettle', 6499, 5499],
  [SK, 'Samsung', 'Samsung 28 L Convection Microwave', 'MC28H5025VS', '28 L', false, 'Microwave', 67999, 58999],
  [SK, 'Kenwood', 'Kenwood 2400W Steam Iron', 'STP61', '300 ml', false, 'Iron', 9499, 7999],
  [SK, 'Haier', 'Haier 5 L Air Fryer', 'HAF-K50', '5 L', false, 'Air Fryer', 33999, 27999],
  [SK, 'PEL', 'PEL 25 L Grill Microwave', 'PMO-25G', '25 L', false, 'Microwave', 37999, 32999],
]

function specsFor({ category, model, cap, inv, type }) {
  const yn = inv ? 'Yes' : 'No'
  const rows = { Model: model }
  if (category === AC) {
    const btu = { '1 Ton': '12,000', '1.5 Ton': '18,000', '2 Ton': '24,000' }[cap]
    Object.assign(rows, { Capacity: cap, Technology: inv ? 'DC Inverter' : 'Non-Inverter', 'Cooling Capacity': `${btu} BTU/h`, Mode: type, 'Energy Saving': inv ? 'Up to 70%' : 'Standard', Refrigerant: inv ? 'R32 (eco-friendly)' : 'R410A', Warranty: '10 years compressor · 1 year parts', Installation: `Free standard installation in ${store.city}` })
  } else if (category === WM) {
    Object.assign(rows, { 'Washing Capacity': cap, Type: type, 'Inverter Motor': yn, 'Spin Speed': type === 'Front Load' ? '1200 RPM' : type === 'Top Load' ? '700 RPM' : '1350 RPM', Programs: type === 'Twin Tub' ? 'Wash · Spin' : type === 'Front Load' ? '14 programs' : '8 programs', Warranty: '10 years motor · 2 years parts', Delivery: `Free delivery in ${store.city}` })
  } else if (category === RF) {
    Object.assign(rows, { 'Gross Capacity': cap, Type: type, 'Inverter Compressor': yn, Cooling: inv ? 'No-Frost' : 'Direct Cool', 'Energy Rating': inv ? 'A+++' : 'A+', Warranty: '10 years compressor · 1 year parts', Delivery: `Free delivery in ${store.city}` })
  } else {
    const watts = { Microwave: '800 W', 'Air Fryer': '1500 W', Blender: '500 W', Kettle: '2200 W', Iron: '2400 W' }[type]
    Object.assign(rows, { 'Appliance Type': type, Capacity: cap, Power: watts, Voltage: '220–240 V', Warranty: '1 year official warranty', Delivery: `Same-day delivery in ${store.city}` })
  }
  return rows
}

export const seedProducts = RAW.map(([category, brand, name, model, cap, inv, type, price, discountedPrice], i) => {
  const product = { id: i + 1, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, brand, category, model, cap, inv, type, price, discountedPrice, stock: 10, image: '' }
  product.summary = category === SK ? `${type} · ${model}` : `${model} · ${category === AC ? type : (inv ? 'Inverter · ' : '') + type}`
  product.description = `${name} (${model}) - ${type}, ${cap}. Genuine stock with official brand warranty.`
  product.specs = specsFor(product)
  return product
})

export const brands = [...new Set(seedProducts.map((product) => product.brand))]

// "Top Appliance Brands" cards: [name, tag, % off, bg, text, tag bg, logo bg, logo text, circle, icon (category or kitchen type), dark]
export const brandDeals = [
  ['Haier', 'INVERTER ACS', 30, '#1F2A44', '#fff', 'rgba(255,255,255,.12)', '#0B5CAB', '#fff', 'rgba(255,255,255,.06)', AC, true],
  ['Dawlance', 'REFRIGERATORS', 25, '#FFF4D6', '#222', 'rgba(0,0,0,.07)', '#E30613', '#fff', 'rgba(255,255,255,.55)', RF, false],
  ['PEL', 'GLASS DOOR FRIDGES', 20, '#FDE9DF', '#222', 'rgba(0,0,0,.07)', '#C8102E', '#fff', 'rgba(255,255,255,.55)', RF, false],
  ['Orient', 'ACS & FRIDGES', 22, '#E3F4EA', '#222', 'rgba(0,0,0,.07)', '#0B7A3E', '#fff', 'rgba(255,255,255,.55)', AC, false],
  ['Gree', 'INVERTER ACS', 28, '#E6F1FB', '#222', 'rgba(0,0,0,.07)', '#0067B1', '#fff', 'rgba(255,255,255,.6)', AC, false],
  ['Samsung', 'WASHERS & MORE', 15, '#15205B', '#fff', 'rgba(255,255,255,.12)', '#fff', '#1428A0', 'rgba(255,255,255,.06)', WM, true],
  ['LG', 'WASHING MACHINES', 18, '#FBE6EE', '#222', 'rgba(0,0,0,.07)', '#A50034', '#fff', 'rgba(255,255,255,.55)', WM, false],
  ['Kenwood', 'KITCHEN', 25, '#EFEFEF', '#222', 'rgba(0,0,0,.07)', '#111', '#fff', 'rgba(255,255,255,.7)', 'Air Fryer', false],
].map(([name, tag, off, bg, fg, tagBg, logoBg, logoFg, circle, icon, dark]) => ({ name, tag, off, bg, fg, tagBg, logoBg, logoFg, circle, icon, dark }))
