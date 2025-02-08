import CryptoJS from "crypto-js";

import { Character } from "../domain/character";
import { CharacterAppearance } from "../domain/character-apperance";
import { CharacterApi } from "../domain/character.api";
const getHash = (apiKey: string, privateKey: string) => {
  if (!apiKey) {
    throw new Error("marvel apiKey is required");
  }
  if (!privateKey) {
    throw new Error("marvel privateKey is required");
  }
  const ts = Date.now();
  const hash = CryptoJS.MD5(`${ts}${privateKey}${apiKey}`);
  return { ts, hash };
};

const mapCharacter = (character: MarvelCharacter): Character => ({
  id: character.id,
  name: character.name,
  description: character.description,
  image: character.thumbnail.path + "." + character.thumbnail.extension,
});

const mapComic = (comic: MarvelComic): CharacterAppearance => ({
  id: comic.id,
  name: comic.title,
  description: new Date(comic.dates[0].date).getFullYear().toString(),
  image: comic.thumbnail.path + "." + comic.thumbnail.extension,
});

export const createMarvelCharacterApi = (apiKey: string, privateKey: string): CharacterApi => ({
  getCharacters: async (search: string) => {
    const { ts, hash } = getHash(apiKey, privateKey);
    let response;
    if (!search) {
      response = await fetch(`https://gateway.marvel.com/v1/public/characters?apikey=${apiKey}&ts=${ts}&hash=${hash}&limit=50`);
    } else {
      response = await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${search}&apikey=${apiKey}&ts=${ts}&hash=${hash}&limit=50`);
    }
    const data: MarvelResponse<MarvelCharacter> = await response.json();
    return data.data.results.map(mapCharacter);
  },
  getCharacterById: async (id: number) => {
    const { ts, hash } = getHash(apiKey, privateKey);
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${apiKey}&ts=${ts}&hash=${hash}`);
    if (response.status === 404) {
      throw new Error("Character not found");
    }
    const data: MarvelResponse<MarvelCharacter> = await response.json();
    return mapCharacter(data.data.results[0]);
  },
  getCharacterAppearances: async (id: number) => {
    const { ts, hash } = getHash(apiKey, privateKey);
    const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}/comics?apikey=${apiKey}&ts=${ts}&hash=${hash}&orderBy=focDate&limit=20`);
    const data: MarvelResponse<MarvelComic> = await response.json();
    return data.data.results.map(mapComic).sort((a, b) => new Date(a.description).getTime() - new Date(b.description).getTime());
  },
});

interface MarvelResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: MarvelData<T>;
}

interface MarvelData<T> {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: T[];
}

interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Comics;
  urls: Url[];
}

interface Url {
  type: string;
  url: string;
}

interface Comics {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
}

interface Item {
  resourceURI: string;
  name: string;
}

interface Thumbnail {
  path: string;
  extension: string;
}

interface MarvelComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  dates: Date[];
  thumbnail: Thumbnail;
  images: Thumbnail[];
}

interface Date {
  type: string;
  date: string;
}

interface TextObject {
  type: string;
  language: string;
  text: string;
}