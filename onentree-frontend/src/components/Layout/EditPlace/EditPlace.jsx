import PageBreadcrumb from "@/components/Common/Breadcrumb/PageBreadcrumb";
import TextField from "@/components/Common/Input/TextField";
import SelectField from "@/components/Common/Input/SelectField";
import ButtonPrimary from "@/components/Common/Button/ButtonPrimary";
import ButtonTransparent from "@/components/Common/Button/ButtonTransparent";
import TagsInput from "@/components/Common/Input/TagsInput";
import CNPJInput from "@/components/Common/Input/CNPJInput";
import CEPInput from "@/components/Common/Input/CEPInput";
import PhoneInput from "@/components/Common/Input/PhoneInput";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { placeValidate } from "@/services/updatePlaceService";
import { updatePlaceService } from "@/services/updatePlaceService";
import { getPlaceTypesService } from "@/services/getPlaceTypesService";
import { getPlaceService } from "@/services/getPlaceService";
import { useMutation, useQuery } from "@tanstack/react-query";
import GlobalAlertContext from "@/context/GlobalAlertContext";
import { 
  EditPlaceDescription, 
  EditPlaceForm, 
  EditPlaceError,
  EditPlaceFormBtnGroup, 
  EditPlaceFormCard, 
  EditPlaceFormSection, 
  EditPlaceFormTop, 
  EditPlaceFormTopMessage, 
  EditPlaceInfo, 
  EditPlacePresentation, 
  EditPlaceTitle } from "./EditPlaceStyle";

const EditPlaceErrorMessage = ({ errors, id }) => {
  return (
    <>
      {errors && errors.map((error, index) => {
        if (error.fields.includes(id)) {
          return (
            <EditPlaceError key={index}>{ error.message }</EditPlaceError>
          )
        }
      })}
    </>
  );
};

export default function EditPlace() {

  const navigate = useNavigate();
  const { id } = useParams();

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

  const { isLoading: placeLoading } = useQuery({
    queryFn: async () => {
      const response = await getPlaceService(id);

      setName(response.data.name);
      setTypeId(response.data.type_id);
      setNickname(response.data.nickname);
      setCNPJ(response.data.cnpj);
      setCity(response.data.city);
      setCEP(response.data.cep);
      setComplement(response.data.complement);
      setState(response.data.state);
      setAddress(response.data.address);
      setEmail(response.data.email);
      setPhone(response.data.phone);
      setInputs(response.data.inputs.split(", "));
      setTurnstiles(response.data.turnstiles.split(", "));

      return response;
    },
    queryKey: ["place-data"],
    retry: false,
  }); 

  const { data: placeTypesQuery } = useQuery({
    queryFn: async () => {
      return await getPlaceTypesService();
    },
    queryKey: ["place-types-data"],
    retry: false,
  }); 

  const updatePlaceMutation = useMutation({
    mutationFn: async (payload) => {
      return await updatePlaceService(id, payload);
    },

    onSuccess: (response) => {
      if (response.status == 200) {

        globalAlert.setIsSuccessActivated(true);
        globalAlert.setSuccessMessage("local foi editado");

        navigate("/places");

        setTimeout(() => {
          globalAlert.setIsSuccessActivated(false);
        }, 5000);
      }
    },

    onError: (response) => {
      console.log(response);

      globalAlert.setIsErrorActivated(true);
      globalAlert.setErrorMessage("Não foi possível editar local");

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

  const handleEditPlaceForm = async (e) => {
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

    updatePlaceMutation.mutate(payload);
  }

  return (
    <>
      <EditPlacePresentation> 
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
      </EditPlacePresentation> 

      <EditPlaceInfo>
        <EditPlaceTitle>Editar local</EditPlaceTitle>
        <EditPlaceDescription>*Campos obrigatórios</EditPlaceDescription>
      </EditPlaceInfo>

      <EditPlaceForm onSubmit={handleEditPlaceForm}>

        <EditPlaceFormTop>
          <EditPlaceFormTopMessage>Informações básicas</EditPlaceFormTopMessage>
        </EditPlaceFormTop>

        <EditPlaceFormSection>

          <EditPlaceFormCard>
            <Box>
              {placeLoading ? (
                <TextField 
                  id="name" 
                  text="Nome do local*" 
                  placeholder="Carregando..."
                />
              ) : (
                  <TextField 
                    id="name" 
                    text="Nome do local*" 
                    placeholder="Informe o nome do local"
                    defaultValue={name}
                    maxLength={100}
                    onChange={(e) => setName(e.target.value)}
                    className={inputError.includes("name") ? "error" : null}
                  />
                )}

              <EditPlaceErrorMessage errors={errors} id="name" />  
            </Box>

            <Box>
              {!placeTypesQuery ? (
                <SelectField 
                  id="typeId"
                  text="Selecione um tipo*"
                  defaultKey={"default"}
                  defaultValue="Carregando itens..."
                  items={[]}
                  className="loading"
                  loading={true}
                />
              ) : (
                  <SelectField 
                    id="typeId"
                    text="Selecione um tipo*"
                    defaultKey={typeId}
                    defaultValue="Selecione um tipo"
                    items={placeTypesQuery.data}
                    onChange={(e) => setTypeId(e.target.value)}
                    className={inputError.includes("typeId") ? "error" : null}
                  /> 
                )}

              <EditPlaceErrorMessage errors={errors} id="typeId" />  
            </Box>

          </EditPlaceFormCard>

          <EditPlaceFormCard>

            <Box>
              {placeLoading ? (
                <TextField 
                  id="nickname" 
                  text="Apelido" 
                  placeholder="Carregando..."
                />
              ) : (
                  <TextField 
                    id="nickname" 
                    text="Apelido" 
                    placeholder="Informe um apelido (caso exista)"
                    defaultValue={nickname}
                    maxLength={100}
                    onChange={(e) => setNickname(e.target.value)}
                    className={inputError.includes("nickname") ? "error" : null}
                  />
                )}

              <EditPlaceErrorMessage errors={errors} id="nickname" />  
            </Box>

            <Box>
              {placeLoading ? (
                <CNPJInput 
                  id="cnpj" 
                  text="CNPJ*" 
                  placeholder="Carregando..."
                /> 
              ) : (
                  <CNPJInput 
                    id="cnpj" 
                    text="CNPJ*" 
                    placeholder="Informe um CNPJ"
                    defaultValue={cnpj || undefined}
                    onChange={(e) => setCNPJ(e.target.value)}
                    className={inputError.includes("cnpj") ? "error" : null}
                  />
                )}

              <EditPlaceErrorMessage errors={errors} id="cnpj" />  
            </Box>

          </EditPlaceFormCard>

        </EditPlaceFormSection>

        <EditPlaceFormTop>
          <EditPlaceFormTopMessage>Localização</EditPlaceFormTopMessage>
        </EditPlaceFormTop>

        <EditPlaceFormSection>

          <EditPlaceFormCard>
            <Box>
              {placeLoading ? (
                <TextField 
                  id="city" 
                  text="Cidade*" 
                  placeholder="Carregando..."
                />
              ) : (
                  <TextField 
                    id="city" 
                    text="Cidade*" 
                    placeholder="Informe a cidade"
                    defaultValue={city}
                    maxLength={80}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputError.includes("city") ? "error" : null}
                  />
                )}

              <EditPlaceErrorMessage errors={errors} id="city" />  
            </Box>

            <Box>
              {placeLoading ? (
                <CEPInput 
                  id="cep" 
                  text="CEP*" 
                  placeholder="Carregando..."
                /> 
              ) : (
                  <CEPInput 
                    id="cep" 
                    text="CEP*" 
                    placeholder="Informe o CEP"
                    defaultValue={cep || undefined}
                    onChange={(e) => setCEP(e.target.value)}
                    className={inputError.includes("cep") ? "error" : null}
                  /> 
                )}
              <EditPlaceErrorMessage errors={errors} id="cep" />  
            </Box>

            <Box>
              {placeLoading ? (
                <TextField 
                  id="complement" 
                  text="Complemento" 
                  placeholder="Carregando..."
                />
              ) : (
                  <TextField 
                    id="complement" 
                    text="Complemento" 
                    maxLength={80}
                    placeholder="Informe o complemento"
                    defaultValue={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className={inputError.includes("complement") ? "error" : null}
                  />
                )}

              <EditPlaceErrorMessage errors={errors} id="complement" />  
            </Box>

          </EditPlaceFormCard>

          <EditPlaceFormCard>

            <Box>
              {placeLoading ? (
                <SelectField 
                  id="state"
                  text="Estado*"
                  defaultKey={"default"}
                  defaultValue="Carregando itens..."
                  items={[]}
                  className="loading"
                  loading={true}
                />
              ) : (
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
                )}

              <EditPlaceErrorMessage errors={errors} id="state" />  
            </Box>

            <Box>
              {placeLoading ? (
                <TextField 
                  id="address" 
                  text="Endereço*" 
                  placeholder="Carregando..."
                />
              ) : (
                  <TextField 
                    id="address" 
                    text="Endereço*" 
                    maxLength={80}
                    placeholder="Informe o Endereço"
                    defaultValue={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputError.includes("address") ? "error" : null}
                  />
                )}

              <EditPlaceErrorMessage errors={errors} id="address" />  
            </Box>

          </EditPlaceFormCard>

        </EditPlaceFormSection>

        <EditPlaceFormTop>
          <EditPlaceFormTopMessage>Contato</EditPlaceFormTopMessage>
        </EditPlaceFormTop>

        <EditPlaceFormSection>

          <EditPlaceFormCard>
            <Box>
              {placeLoading ? (
                <TextField 
                  id="email" 
                  text="E-mail*" 
                  placeholder="Carregando..."
                />
              ) : (
                  <TextField 
                    id="email" 
                    text="E-mail*" 
                    placeholder="Informe um e-mail"
                    defaultValue={email}
                    maxLength={100}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputError.includes("email") ? "error" : null}
                  />
                )}

              <EditPlaceErrorMessage errors={errors} id="email" />  
            </Box>

          </EditPlaceFormCard>

          <EditPlaceFormCard>

            <Box>
              {placeLoading ? (
                <PhoneInput 
                  id="phone" 
                  text="Telefone" 
                  placeholder="Carregando"
                />
              ) : (
                  <PhoneInput 
                    id="phone" 
                    text="Telefone" 
                    placeholder="Informe um telefone"
                    defaultValue={phone || undefined}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputError.includes("phone") ? "error" : null}
                  />
                )}

              <EditPlaceErrorMessage errors={errors} id="phone" />  
            </Box>

          </EditPlaceFormCard>

        </EditPlaceFormSection>

        <EditPlaceFormTop>
          <EditPlaceFormTopMessage>Cadastro de entradas e catracas</EditPlaceFormTopMessage>
        </EditPlaceFormTop>

        <EditPlaceFormSection>

          <EditPlaceFormCard>
            <Box>
              {placeLoading ? (
                <TagsInput 
                  id="inputs" 
                  text="Cadastre as entradas" 
                  placeholder="Carregando..."
                  setState={setInputs}
                />
              ) : (
                  <TagsInput 
                    id="inputs" 
                    text="Cadastre as entradas" 
                    placeholder="Insira as entradas"
                    setState={setInputs}
                    defaultTags={inputs}
                  />
                )}

              <EditPlaceErrorMessage errors={errors} id="inputs" />  
            </Box>
          </EditPlaceFormCard>

          <EditPlaceFormCard>
            <Box>
              {placeLoading ? (
                <TagsInput 
                  id="turnstiles" 
                  text="Cadastre as catracas" 
                  placeholder="Carregando"
                  setState={setTurnstiles}
                />

              ) : (
                  <TagsInput 
                    id="turnstiles" 
                    text="Cadastre as catracas" 
                    placeholder="Insira as catracas"
                    setState={setTurnstiles}
                    defaultTags={turnstiles}
                  />

                )}
              <EditPlaceErrorMessage errors={errors} id="turnstiles" />  
            </Box>
          </EditPlaceFormCard>

        </EditPlaceFormSection>

        <EditPlaceFormBtnGroup>

          <ButtonTransparent 
            text="Cancelar"
            style={{ width: 200, marginRight: 30 }}
            onClick={() => navigate("/places")}
          />

          {updatePlaceMutation.isPending ? (
            <ButtonPrimary 
              type="button"
              text="Salvar"
              style={{ width: 200 }}
              loading
            />
          ) : (
              <ButtonPrimary 
                type="submit"
                text="Salvar"
                style={{ width: 200 }}
              />
            )}
        </EditPlaceFormBtnGroup>

      </EditPlaceForm>
    </>
  );
}
