import PageBreadcrumb from "@/components/Common/Breadcrumb/PageBreadcrumb";
import TextField from "@/components/Common/Input/TextField";
import SelectField from "@/components/Common/Input/SelectField";
import ButtonPrimary from "@/components/Common/Button/ButtonPrimary";
import ButtonTransparent from "@/components/Common/Button/ButtonTransparent";
import TagsInput from "@/components/Common/Input/TagsInput";
import PhoneInput from "@/components/Common/Input/PhoneInput";
import CNPJInput from "@/components/Common/Input/CNPJInput";
import CEPInput from "@/components/Common/Input/CEPInput";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { placeValidate } from "@/services/addPlaceService";
import { getPlaceTypesService } from "@/services/getPlaceTypesService";
import { addPlaceService } from "@/services/addPlaceService";
import { useMutation, useQuery } from "@tanstack/react-query";
import GlobalAlertContext from "@/context/GlobalAlertContext";
import { 
  AddPlaceDescription, 
  AddPlaceForm, 
  AddPlaceError,
  AddPlaceFormBtnGroup, 
  AddPlaceFormCard, 
  AddPlaceFormSection, 
  AddPlaceFormTop, 
  AddPlaceFormTopMessage, 
  AddPlaceInfo, 
  AddPlacePresentation, 
  AddPlaceTitle 
} from "./AddPlaceStyle";

const AddPlaceErrorMessage = ({ errors, id }) => {
  return (
    <>
      {errors && errors.map((error, index) => {
        if (error.fields.includes(id)) {
          return (
            <AddPlaceError key={index}>{ error.message }</AddPlaceError>
          )
        }
      })}
    </>
  );
};

export default function AddPlace() {

  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [inputError, setInputError] = useState([]);

  const globalAlert = useContext(GlobalAlertContext);

  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState("default");
  const [nickname, setNickname] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [city, setCity] = useState("");
  const [cep, setCEP] = useState("");
  const [complement, setComplement] = useState("");
  const [state, setState] = useState("default");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inputs, setInputs] = useState([]);
  const [turnstiles, setTurnstiles] = useState([]);

  const placeTypesQuery = useQuery({
    queryFn: async () => {
      return await getPlaceTypesService();
    },
    queryKey: ["place-types-data"],
    retry: false,
  });

  const addPlaceMutation = useMutation({
    mutationFn: async (payload) => {
      return await addPlaceService(payload);
    },

    onSuccess: (response) => {
      if (response.status == 201) {

        globalAlert.setIsSuccessActivated(true);
        globalAlert.setSuccessMessage("um novo local foi adicionado");

        navigate("/places");

        setTimeout(() => {
          globalAlert.setIsSuccessActivated(false);
        }, 5000);
      }
    },

    onError: (response) => {
      console.log(response);

      globalAlert.setIsErrorActivated(true);
      globalAlert.setErrorMessage("Não foi possível adicionar local");

      setTimeout(() => {
        globalAlert.setIsErrorActivated(false);
      }, 5000);
    }
  });

  const populateInputsError = (errorsArray) => {
    errorsArray.forEach(errorElement => {
      setInputError(prevId => [...prevId, ...errorElement.fields]);
    }); 
  }

  const handleAddPlaceForm = async (e) => {
    e.preventDefault();

    const payload = {
      name, 
      typeId,
      nickname,
      cnpj,
      city,
      cep,
      complement,
      state,
      address,
      email,
      phone,
      inputs,
      turnstiles
    };

    setErrors([]);
    setInputError([]);

    const placeValidationResponse = await placeValidate(payload);

    if (placeValidationResponse.errors) {
      setErrors(placeValidationResponse.errors);
      populateInputsError(placeValidationResponse.errors);
      return;
    }

    addPlaceMutation.mutate(payload);
  }

  return (
    <>
      <AddPlacePresentation> 
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
      </AddPlacePresentation> 

      <AddPlaceInfo>
        <AddPlaceTitle>Adicionar novo local</AddPlaceTitle>
        <AddPlaceDescription>*Campos obrigatórios</AddPlaceDescription>
      </AddPlaceInfo>

      <AddPlaceForm onSubmit={handleAddPlaceForm}>

        <AddPlaceFormTop>
          <AddPlaceFormTopMessage>Informações básicas</AddPlaceFormTopMessage>
        </AddPlaceFormTop>

        <AddPlaceFormSection>

          <AddPlaceFormCard>
            <Box>
              <TextField 
                id="name" 
                text="Nome do local*" 
                placeholder="Informe o nome do local"
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                className={inputError.includes("name") ? "error" : null}
              />
              <AddPlaceErrorMessage errors={errors} id="name" />  
            </Box>

            <Box>
              {placeTypesQuery.data ? (
                <SelectField 
                  id="typeId"
                  text="Selecione um tipo*"
                  defaultKey={typeId}
                  defaultValue="Selecione um tipo"
                  items={placeTypesQuery.data.data}
                  onChange={(e) => setTypeId(e.target.value)}
                  className={inputError.includes("typeId") ? "error" : null}
                />
              ) : (
                <SelectField 
                  id="typeId"
                  text="Selecione um tipo*"
                  defaultKey={typeId}
                  defaultValue="Carregando itens..."
                  items={[]}
                  className="loading"
                  loading={true}
                />
              )}

              <AddPlaceErrorMessage errors={errors} id="typeId" />  
            </Box>

          </AddPlaceFormCard>

          <AddPlaceFormCard>

            <Box>
              <TextField 
                id="nickname" 
                text="Apelido" 
                placeholder="Informe um apelido (caso exista)"
                maxLength={100}
                onChange={(e) => setNickname(e.target.value)}
                className={inputError.includes("nickname") ? "error" : null}
              />
              <AddPlaceErrorMessage errors={errors} id="nickname" />  
            </Box>

            <Box>
              <CNPJInput 
                id="cnpj" 
                text="CNPJ*" 
                placeholder="Informe um CNPJ"
                onChange={(e) => setCNPJ(e.target.value)}
                defaultValue={cnpj || undefined}
                className={inputError.includes("cnpj") ? "error" : null}
              />
              <AddPlaceErrorMessage errors={errors} id="cnpj" />  
            </Box>

          </AddPlaceFormCard>

        </AddPlaceFormSection>

        <AddPlaceFormTop>
          <AddPlaceFormTopMessage>Localização</AddPlaceFormTopMessage>
        </AddPlaceFormTop>

        <AddPlaceFormSection>

          <AddPlaceFormCard>
            <Box>
              <TextField 
                id="city" 
                text="Cidade*" 
                placeholder="Informe a cidade"
                maxLength={80}
                onChange={(e) => setCity(e.target.value)}
                className={inputError.includes("city") ? "error" : null}
              />
              <AddPlaceErrorMessage errors={errors} id="city" />  
            </Box>

            <Box>
              <CEPInput 
                id="cep" 
                text="CEP*" 
                placeholder="Informe o CEP"
                onChange={(e) => setCEP(e.target.value)}
                defaultValue={cep || undefined}
                className={inputError.includes("cep") ? "error" : null}
              /> 
              <AddPlaceErrorMessage errors={errors} id="cep" />  
            </Box>

            <Box>
              <TextField 
                id="complement" 
                text="Complemento" 
                placeholder="Informe o complemento"
                maxLength={80}
                onChange={(e) => setComplement(e.target.value)}
                className={inputError.includes("complement") ? "error" : null}
              /> 
              <AddPlaceErrorMessage errors={errors} id="complement" />  
            </Box>

          </AddPlaceFormCard>

          <AddPlaceFormCard>

            <Box>
              <SelectField 
                id="state"
                text="Estado*"
                defaultKey={state}
                defaultValue="Selecione um estado"
                items={[
                  { name: "AC", value: "AC" },
                  { name: "AL", value: "AL" },
                  { name: "AP", value: "AP" },
                  { name: "AM", value: "AM" },
                  { name: "BA", value: "BA" },
                  { name: "CE", value: "CE" },
                  { name: "DF", value: "DF" },
                  { name: "ES", value: "ES" },
                  { name: "GO", value: "GO" },
                  { name: "MA", value: "MA" },
                  { name: "MT", value: "MT" },
                  { name: "MS", value: "MS" },
                  { name: "MG", value: "MG" },
                  { name: "PA", value: "PA" },
                  { name: "PB", value: "PB" },
                  { name: "PR", value: "PR" },
                  { name: "PE", value: "PE" },
                  { name: "PI", value: "PI" },
                  { name: "RJ", value: "RJ" },
                  { name: "RN", value: "RN" },
                  { name: "RS", value: "RS" },
                  { name: "RO", value: "RO" },
                  { name: "RR", value: "RR" },
                  { name: "SC", value: "SC" },
                  { name: "SP", value: "SP" },
                  { name: "SE", value: "SE" },
                  { name: "TO", value: "TO" }
                ]}
                onChange={(e) => setState(e.target.value)}
                className={inputError.includes("state") ? "error" : null}
              /> 
              <AddPlaceErrorMessage errors={errors} id="state" />  
            </Box>

            <Box>
              <TextField 
                id="address" 
                text="Endereço*" 
                placeholder="Informe o Endereço"
                maxLength={80}
                onChange={(e) => setAddress(e.target.value)}
                className={inputError.includes("address") ? "error" : null}
              />
              <AddPlaceErrorMessage errors={errors} id="address" />  
            </Box>

          </AddPlaceFormCard>

        </AddPlaceFormSection>

        <AddPlaceFormTop>
          <AddPlaceFormTopMessage>Contato</AddPlaceFormTopMessage>
        </AddPlaceFormTop>

        <AddPlaceFormSection>

          <AddPlaceFormCard>
            <Box>
              <TextField 
                id="email" 
                text="E-mail*" 
                placeholder="Informe um e-mail"
                maxLength={100}
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email || undefined}
                className={inputError.includes("email") ? "error" : null}
              />
              <AddPlaceErrorMessage errors={errors} id="email" />  
            </Box>

          </AddPlaceFormCard>

          <AddPlaceFormCard>

            <Box>
              <PhoneInput 
                id="phone" 
                text="Telefone" 
                placeholder="Informe um telefone"
                onChange={(e) => setPhone(e.target.value)}
                defaultValue={phone || undefined}
                className={inputError.includes("phone") ? "error" : null}
              />
              <AddPlaceErrorMessage errors={errors} id="phone" />  
            </Box>

          </AddPlaceFormCard>

        </AddPlaceFormSection>

        <AddPlaceFormTop>
          <AddPlaceFormTopMessage>Cadastro de entradas e catracas</AddPlaceFormTopMessage>
        </AddPlaceFormTop>

        <AddPlaceFormSection>

          <AddPlaceFormCard>
            <Box>
              <TagsInput 
                id="inputs" 
                text="Cadastre as entradas" 
                placeholder="Insira as entradas"
                setState={setInputs}
              />
              <AddPlaceErrorMessage errors={errors} id="inputs" />  
            </Box>
          </AddPlaceFormCard>

          <AddPlaceFormCard>
            <Box>
              <TagsInput 
                id="turnstiles" 
                text="Cadastre as catracas" 
                placeholder="Insira as catracas"
                setState={setTurnstiles}
              />
              <AddPlaceErrorMessage errors={errors} id="turnstiles" />  
            </Box>
          </AddPlaceFormCard>

        </AddPlaceFormSection>

        <AddPlaceFormBtnGroup>

          <ButtonTransparent 
            text="Cancelar"
            style={{ width: 200, marginRight: 30 }}
            onClick={() => navigate("/places")}
          />

          {addPlaceMutation.isPending ? (
            <ButtonPrimary 
              type="button"
              text="Cadastrar"
              style={{ width: 200 }}
              loading
            />
          ) : (
              <ButtonPrimary 
                type="submit"
                text="Cadastrar"
                style={{ width: 200 }}
              />
            )}
        </AddPlaceFormBtnGroup>

      </AddPlaceForm>

    </>
  );
}
