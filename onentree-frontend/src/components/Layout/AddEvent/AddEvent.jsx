import PageBreadcrumb from "@/components/Common/Breadcrumb/PageBreadcrumb";
import TextField from "@/components/Common/Input/TextField";
import PhoneInput from "@/components/Common/Input/PhoneInput";
import TimeInput from "@/components/Common/Input/TimeInput";
import SelectField from "@/components/Common/Input/SelectField";
import ButtonPrimary from "@/components/Common/Button/ButtonPrimary";
import ButtonTransparent from "@/components/Common/Button/ButtonTransparent";
import DateInput from "@/components/Common/Input/DateInput";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { getEventTypesService } from "@/services/getEventTypesService";
import { getPlacesSelectService } from "@/services/getPlacesSelectService";
import { addEventService } from "@/services/addEventService";
import { eventValidate } from "@/services/addEventService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box } from "@mui/material";
import GlobalAlertContext from "@/context/GlobalAlertContext";
import { 
  AddEventDescription, 
  AddEventError, 
  AddEventForm, 
  AddEventFormBtnGroup, 
  AddEventFormCard, 
  AddEventFormSection, 
  AddEventFormTop, 
  AddEventFormTopMessage, 
  AddEventInfo, 
  AddEventLink, 
  AddEventPresentation, 
  AddEventTitle 
} from "./AddEventStyle";

const AddEventErrorMessage = ({ errors, id }) => {
  return (
    <>
      {errors && errors.map((error, index) => {
        if (error.fields.includes(id)) {
          return (
            <AddEventError key={index}>{ error.message }</AddEventError>
          )
        }
      })}
    </>
  );
};

export default function AddEvent() {

  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [inputError, setInputError] = useState([]);

  const globalAlert = useContext(GlobalAlertContext);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [placeId, setPlaceId] = useState("default");
  const [typeId, setTypeId] = useState("default");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const eventTypesQuery = useQuery({
    queryFn: async () => {
      return await getEventTypesService();
    },
    queryKey: ["event-types-data"],
    retry: false
  });

  const placesSelectAllQuery = useQuery({
    queryFn: async () => { 
      return await getPlacesSelectService({
        id: true,
        name: true
      }); 
    },
    queryKey: ["places-select-data"],
    retry: false,
  });

  const addEventMutation = useMutation({
    mutationFn: async (payload) => {
      return await addEventService(payload);
    },

    onSuccess: (response) => {
      if (response.status == 201) {

        globalAlert.setIsSuccessActivated(true);
        globalAlert.setSuccessMessage("um novo evento foi adicionado");

        navigate("/events");

        setTimeout(() => {
          globalAlert.setIsSuccessActivated(false);
        }, 5000);

      }
    },

    onError: (response) => {
      globalAlert.setIsErrorActivated(true);
      globalAlert.setErrorMessage(response.response?.data.message);

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

  const handleAddEventForm = async (e) => {
    e.preventDefault();

    setErrors([]);
    setInputError([]);

    const payload = {
      name,
      date,
      placeId,
      typeId,
      time,
      email,
      phone
    };

    const eventValidationResponse = await eventValidate(payload);

    if (eventValidationResponse.errors) {
      setErrors(eventValidationResponse.errors);
      populateInputsError(eventValidationResponse.errors);
      return;
    }

    addEventMutation.mutate(payload);
  }

  return (
    <>
      <AddEventPresentation> 
        <PageBreadcrumb items={[
          {
            page: "Home",
            path: "/",
            isLastItem: false
          },
          {
            page: "Eventos",
            path: "/events",
            isLastItem: true
          }
        ]} />
      </AddEventPresentation> 

      <AddEventInfo>
        <AddEventTitle>Adicionar novo Evento</AddEventTitle>
        <AddEventDescription>*Campos obrigatórios</AddEventDescription>
      </AddEventInfo>

      <AddEventForm onSubmit={handleAddEventForm}>

        <AddEventFormTop>
          <AddEventFormTopMessage>Informações básicas</AddEventFormTopMessage>
        </AddEventFormTop>

        <AddEventFormSection>

          <AddEventFormCard>
            <Box>
              <TextField 
                id="name" 
                text="Nome do evento*" 
                placeholder="Informe o nome do evento"
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
                className={inputError.includes("name") ? "error" : null}
              />

              <AddEventErrorMessage errors={errors} id="name" />  
            </Box>

            <Box>
              <DateInput 
                id="date" 
                text="Data do evento*" 
                placeholder="00/00/0000"
                onChange={(e) => setDate(e.target.value)}
                defaultValue={date || undefined}
                className={inputError.includes("date") ? "error" : null}
              />

              <AddEventErrorMessage errors={errors} id="date" />  
            </Box>

            <Box>
              {placesSelectAllQuery.data ? (
                <SelectField 
                  id="placeId"
                  text="Selecione um local*"
                  defaultKey={placeId}
                  defaultValue="Selecione um local"
                  items={placesSelectAllQuery.data.data}
                  onChange={(e) => setPlaceId(e.target.value)}
                  className={inputError.includes("placeId") ? "error" : null}
                />
              ) : (
                  <SelectField 
                    id="placeId"
                    text="Selecione um local*"
                    defaultKey={placeId}
                    defaultValue="Carregando itens..."
                    items={[]}
                    className="loading"
                    loading={true}
                  />
                )}

              <Box sx={{ marginTop: ".5rem", textAlign: "right" }}>
                <AddEventLink to="/places/add">Cadastrar local</AddEventLink>
              </Box>

              <AddEventErrorMessage errors={errors} id="placeId" />  
            </Box>

          </AddEventFormCard>

          <AddEventFormCard>

            <Box>
              {eventTypesQuery.data ? (
                <SelectField 
                  id="typeId"
                  text="Selecione um tipo*"
                  defaultKey={typeId}
                  defaultValue="Selecione um tipo"
                  items={eventTypesQuery.data.data}
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

              <AddEventErrorMessage errors={errors} id="typeId" />
            </Box>

            <Box>
              <TimeInput 
                id="time" 
                text="Horário do evento*" 
                placeholder="Adicione o horário do evento"
                onChange={(e) => setTime(e.target.value)}
                defaultValue={time || undefined}
                className={inputError.includes("time") ? "error" : null}
              />
              <AddEventErrorMessage errors={errors} id="time" />
            </Box>

          </AddEventFormCard>

        </AddEventFormSection>

        <AddEventFormTop>
          <AddEventFormTopMessage>Contato</AddEventFormTopMessage>
        </AddEventFormTop>

        <AddEventFormSection>

          <AddEventFormCard>
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
              <AddEventErrorMessage errors={errors} id="email" />
            </Box>

          </AddEventFormCard>

          <AddEventFormCard>

            <Box>
              <PhoneInput 
                id="phone" 
                text="Telefone" 
                placeholder="Informe um telefone"
                onChange={(e) => setPhone(e.target.value)}
                defaultValue={phone || undefined}
                className={inputError.includes("phone") ? "error" : null}
              />
              <AddEventErrorMessage errors={errors} id="phone" />
            </Box>

          </AddEventFormCard>

        </AddEventFormSection>

        <AddEventFormBtnGroup>

          <ButtonTransparent 
            text="Cancelar"
            style={{ width: 200, marginRight: 30 }}
            onClick={() => navigate("/events")}
          />

          {addEventMutation.isPending ? (
            <ButtonPrimary 
              type="submit"
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

        </AddEventFormBtnGroup>

      </AddEventForm>
    </>
  );
}
