import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { process, setProcess, request, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=f4273401b1c4b74be04f2abfbb830e9f';
    const _charOffset = 210;
    const _comicsOffset = 210;


    const getAllCharacters = async (offset = _charOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        if (res.data.results[0] === undefined) {
            return undefined
        }
        return _transformCharacter(res.data.results[0]);
    }

    const getAllcomics = async (offset = _comicsOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0])
    }
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            description: comics.description ? `${comics.description.slice(0, 210)}` : 'There is no description for this comics',
            pageCount: comics.pageCount,
            language: comics.textObjects[0]?.language || "en-us",
            price: `${comics.prices[0].price}$`
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return { process, setProcess, getAllCharacters, getCharacter, clearError, getAllcomics, getComic, getCharacterByName };
}

export default useMarvelService;