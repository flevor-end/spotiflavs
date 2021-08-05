import { useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import flavImage from "../../assets/images/spotiHome.png"
import { spotifyTokenResponse } from "../../recoil/auth/atoms"
import { spotifyResult } from "../../recoil/songs/atoms";
import { spotifySearchCall } from "../../utils"
import HomeFilters from "../../components/HomeFilters";
import { filterType as filterTypeSelector } from "../../recoil/songs/selectors";
import "./style.css";
import Track from "../../components/Track"


export default function Home() {
    const [searchText, setSearchText] = useState("");
    const [tokenResponse] = useRecoilState(spotifyTokenResponse);
    const [searchResponse, setSearchResponse] = useRecoilState(spotifyResult);
    const [filterType] = useRecoilState(filterTypeSelector);
    const resetFilter = useResetRecoilState(filterTypeSelector);

    const handleSearchClick = async () => {
        let type = filterType ?? "track";
        const paramsArray = [{
          q: searchText
        }, {
          type,
        }, {
          offset: 50,
        }];

        const response = await spotifySearchCall(paramsArray, tokenResponse.access_token);
        setSearchResponse(response);
    };


    return (
        <div className="home">
            <div style={{ backgroundImage: `url(${flavImage})`}} className="home-cover-container"/>
            <h2 className="home-title">Busca tu cancion favorita</h2>
            <div className="home-searchbox">
                <input type="text" className="home-searchbox-input" value={searchText} onChange={({ target: { value }}) => setSearchText(value)} />
                <button className="home-searchbox-button" onClick={handleSearchClick}>Buscar</button>
            </div>
            <HomeFilters />
            <button onClick={resetFilter} className="home-clean-filters-button">Borrar Filtros</button>
            <div className="home-tracks-container">
              <p className="home-tracks-title">Canciones</p>
              <div className="home-tracks-container-items">
              {searchResponse?.tracks?.items?.map((item, index) => <Track key={index} {...item} />)}
              </div>
            </div>
        </div>

    );
}