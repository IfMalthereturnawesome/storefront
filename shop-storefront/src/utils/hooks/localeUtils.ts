// localeUtils.ts

export type LocaleMap = {
    [key: string]: string;
};

export const regionToLocaleMap: LocaleMap = {
    Austria: "de-AT",
    Belgium: "nl-BE",
    CzechRepublic: "cs-CZ",
    Denmark: "da-DK",
    Estonia: "et-EE",
    Finland: "fi-FI",
    France: "fr-FR",
    Germany: "de-DE",
    Greece: "el-GR",
    Hungary: "hu-HU",
    Ireland: "en-IE",
    Italy: "it-IT",
    Latvia: "lv-LV",
    Lithuania: "lt-LT",
    Luxembourg: "lb-LU",
    Netherlands: "nl-NL",
    Poland: "pl-PL",
    Portugal: "pt-PT",
    Romania: "ro-RO",
    Slovakia: "sk-SK",
    Slovenia: "sl-SI",
    Spain: "es-ES",
    Sweden: "sv-SE"
};

export function getLocaleForRegion(regionName: string): string {
    return regionToLocaleMap[regionName] || "en-US";
}
