import { z } from "zod";

const CountryScheme = z.array(
  z.object({
    name: z.object({
      common: z.string(),
      official: z.string(),
      nativeName: z.object({
        //pol: z.object({ official: z.string(), common: z.string() }),
      }),
    }),
    tld: z.array(z.string()),
    cca2: z.string(),
    ccn3: z.string(),
    cca3: z.string(),
    cioc: z.string(),
    independent: z.boolean(),
    status: z.string(),
    unMember: z.boolean(),
    currencies: z.object({
      //PLN: z.object({ name: z.string(), symbol: z.string() }),
    }),
    idd: z.object({ root: z.string(), suffixes: z.array(z.string()) }),
    capital: z.array(z.string()),
    altSpellings: z.array(z.string()),
    region: z.string(),
    subregion: z.string(),
    //languages: z.object({ pol: z.string() }),
    translations: z.object({
      ara: z.object({ official: z.string(), common: z.string() }),
      bre: z.object({ official: z.string(), common: z.string() }),
      ces: z.object({ official: z.string(), common: z.string() }),
      cym: z.object({ official: z.string(), common: z.string() }),
      deu: z.object({ official: z.string(), common: z.string() }),
      est: z.object({ official: z.string(), common: z.string() }),
      fin: z.object({ official: z.string(), common: z.string() }),
      fra: z.object({ official: z.string(), common: z.string() }),
      hrv: z.object({ official: z.string(), common: z.string() }),
      hun: z.object({ official: z.string(), common: z.string() }),
      ita: z.object({ official: z.string(), common: z.string() }),
      jpn: z.object({ official: z.string(), common: z.string() }),
      kor: z.object({ official: z.string(), common: z.string() }),
      nld: z.object({ official: z.string(), common: z.string() }),
      per: z.object({ official: z.string(), common: z.string() }),
      pol: z.object({ official: z.string(), common: z.string() }),
      por: z.object({ official: z.string(), common: z.string() }),
      rus: z.object({ official: z.string(), common: z.string() }),
      slk: z.object({ official: z.string(), common: z.string() }),
      spa: z.object({ official: z.string(), common: z.string() }),
      srp: z.object({ official: z.string(), common: z.string() }),
      swe: z.object({ official: z.string(), common: z.string() }),
      tur: z.object({ official: z.string(), common: z.string() }),
      urd: z.object({ official: z.string(), common: z.string() }),
      zho: z.object({ official: z.string(), common: z.string() }),
    }),
    latlng: z.array(z.number()),
    landlocked: z.boolean(),
    borders: z.array(z.string()),
    area: z.number(),
    demonyms: z.object({
      eng: z.object({ f: z.string(), m: z.string() }),
      fra: z.object({ f: z.string(), m: z.string() }),
    }),
    flag: z.string(),
    maps: z.object({ googleMaps: z.string(), openStreetMaps: z.string() }),
    population: z.number(),
    //gini: z.object({ 2018: z.number() }),
    fifa: z.string(),
    car: z.object({ signs: z.array(z.string()), side: z.string() }),
    timezones: z.array(z.string()),
    continents: z.array(z.string()),
    flags: z.object({ png: z.string(), svg: z.string(), alt: z.string() }),
    coatOfArms: z.object({ png: z.string(), svg: z.string() }),
    startOfWeek: z.string(),
    capitalInfo: z.object({ latlng: z.array(z.number()) }),
    postalCode: z.object({ format: z.string(), regex: z.string() }),
  })
);

type CountryType = z.infer<typeof CountryScheme>;

const inpCountry = document.getElementById("input") as HTMLInputElement;
const result = document.getElementById("response") as HTMLDivElement;

export async function Submit() {
  const country = inpCountry.value;

  if (country) {
    try {
      const CountryData = await GetData(country);
      Display(CountryData);
    } catch (error) {
      console.error(error);
    }
  }
}

async function GetData(countryName: string) {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  const response = await fetch(url);
  if (!response.ok) {
    result.innerHTML = "Please input another country";
    throw new Error("could not fetch data");
  } else {
    return CountryScheme.parse(await response.json());
  }
}

const debil = "jakis debil pisal to api";

function Display(data: CountryType) {
  result.innerHTML = `<img src="${data[0].flags.svg}" id="img" />
  <h1 id="countryName">${data[0].name.common}</h1>
  <p id="capital"><b>Capital:</b> ${data[0].capital[0]}</p>
  <p id="continent"><b>Continent:</b> ${data[0].continents}</p>
  <p id="population"><b>Population:</b> ${data[0].population}</p>
  <p id="currency"><b>Currency:</b> <i>${debil}</i></p>
  <p id="commonLanguages"><b>Common Languages:</b> <i>${debil}</i></p>`;
}

(window as any).Submit = Submit;
