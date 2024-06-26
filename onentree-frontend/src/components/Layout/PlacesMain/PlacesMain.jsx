import PageBreadcrumb from "@/components/Common/Breadcrumb/PageBreadcrumb";
import SearchInput from "@/components/Common/Input/SearchInput";
import ButtonPrimary from "@/components/Common/Button/ButtonPrimary";
import PlacesTable from "@/components/UI/PlacesTable/PlacesTable";
import PlacesLoadingTable from "@/components/UI/PlacesTable/Children/PlacesLoadingTable";
import { useNavigate } from "react-router-dom";
import debounce from "@/utils/debounce";
import { searchPlaceService } from "@/services/searchPlaceService";
import { useState } from "react";

import { 
  PlacesMainDescription, 
  PlacesMainHeader, 
  PlacesMainHeaderWrapper, 
  PlacesMainInfo, 
  PlacesMainPresentation, 
  PlacesMainTitle 
} from "./PlacesMainStyle";

import { useMediaQuery } from "@mui/material";

export default function PlacesMain() {

  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width: 700px)");

  const [searchedName, setSearchedName] = useState("");
  const [isSearchedPlacesLoading, setIsSearchedPlacesLoading] = useState(false);
  const [searchActivated, setSearchActivated] = useState(false);
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [searchedPlacesQuantity, setSearchedPlacesQuantity] = useState(0);
  const [searchedPlacesMessage, setSearchedPlaceMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchPlace = async (e) => {
    const { value } = e.target;
    const name = value.trim();

    if (name !== "") {
      setSearchedName(name);
      setSearchActivated(true);
      setIsSearchedPlacesLoading(true);

      const { data: places } = await searchPlaceService(name, 0, 5);
      const { data: placesQuantity } = await searchPlaceService(name, 0, "undefined");

      setSearchedPlaceMessage(`${placesQuantity.length} resultados encontrados para "${name}"`);
      setSearchedPlaces(places);
      setSearchedPlacesQuantity(placesQuantity.length);
    } else {
      setCurrentPage(1);
      setSearchedName("");
      setSearchActivated(false);
      setSearchedPlacesQuantity(0);
      setSearchedPlaceMessage("");
    }

    setIsSearchedPlacesLoading(false);
  }

  const handleSearchPlaceDebounce = debounce(handleSearchPlace);

  return (
    <>
      <PlacesMainPresentation> 
        <PageBreadcrumb items={[
          {
            page: "Home",
            path: "/",
            isLastItem: false
          },
          {
            page: "Locais",
            path: "/places",
            isLastItem: true
          }
        ]} />
      </PlacesMainPresentation> 

      <PlacesMainInfo>
        <PlacesMainTitle>Locais</PlacesMainTitle>
        <PlacesMainDescription>Confira a lista de todos os locais cadastrados</PlacesMainDescription>
      </PlacesMainInfo>

      <PlacesMainHeaderWrapper>
        <PlacesMainHeader>
          <SearchInput 
            placeholder="Pesquise por nome do local"
            onChange={handleSearchPlaceDebounce}
          /> 
          <ButtonPrimary 
            text="Adicionar local" 
            onClick={() => navigate("/places/add")}
            style={{ marginTop: matches ? "2rem" : 0}}
          />
        </PlacesMainHeader>

        {isSearchedPlacesLoading ? (
          <PlacesLoadingTable />
        ) : (
            <>
              {searchActivated ? (
                <em style={{ 
                  color: "var(--primary)",
                  marginBottom: 20
                }}>{searchedPlacesMessage}</em>
              ) : null}

              <PlacesTable 
                searchActivated={searchActivated} 
                searchedName={searchedName}
                searchedEvents={searchedPlaces}
                searchedQuantity={searchedPlacesQuantity}

                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
      </PlacesMainHeaderWrapper>
    </>
  );
}

