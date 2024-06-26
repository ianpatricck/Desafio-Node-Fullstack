import PageBreadcrumb from "@/components/Common/Breadcrumb/PageBreadcrumb";
import TextField from "@/components/Common/Input/TextField";
import SelectField from "@/components/Common/Input/SelectField";
import ButtonPrimary from "@/components/Common/Button/ButtonPrimary";
import ButtonTransparent from "@/components/Common/Button/ButtonTransparent";
import PhoneInput from "@/components/Common/Input/PhoneInput";
import DateInput from "@/components/Common/Input/DateInput";
import TimeInput from "@/components/Common/Input/TimeInput";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { eventValidate } from "@/services/updateEventService";
import { updateEventService } from "@/services/updateEventService";
import { getEventTypesService } from "@/services/getEventTypesService";
import { getPlacesSelectService } from "@/services/getPlacesSelectService";
import { getEventService } from "@/services/getEventService";
import { useMutation, useQuery } from "@tanstack/react-query";
import GlobalAlertContext from "@/context/GlobalAlertContext";
import { 
  EditEventDescription, 
  EditEventError, 
  EditEventForm, 
  EditEventFormBtnGroup, 
  EditEventFormCard, 
  EditEventFormSection, 
  EditEventFormTop, 
  EditEventFormTopMessage, 
  EditEventInfo, 
  EditEventLink, 
  EditEventPresentation, 
  EditEventTitle 
} from "./EditEventStyle";

const EditEventErrorMessage = ({ errors, id }) => {
  return (
    <>
      {errors && errors.map((error, index) => {
        if (error.fields.includes(id)) {
          return (
            <EditEventError key={index}>{ error.message }</EditEventError>
          )
        }
      })}
    </>
  );
};

export default function EditEvent() {

  const navigate = useNavigate();
  const { id } = useParams();

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


  const { isLoading: eventLoading } = useQuery({
    queryFn: async () => {
      const response = await getEventService(id);

      setName(response.data.name);
      setDate(response.data.date);
      setTypeId(response.data.type_id);
      setPlaceId(response.data.place_id);
      setTime(response.data.time);
      setEmail(response.data.email);
      setPhone(response.data.phone);

      return response;
    },
    queryKey: ["event-data"],
    retry: false,
  }); 

  const { data: placesSelectAllQuery } = useQuery({
    queryFn: async () => {
      return await getPlacesSelectService({ id: true, name: true });
    },
    queryKey: ["places-select-data"],
    retry: false,
  }); 

  const { data: eventTypesQuery } = useQuery({
    queryFn: async () => {
      return await getEventTypesService();
    },
    queryKey: ["event-types-data"],
    retry: false,
  }); 

  const updateEventMutation = useMutation({
    mutationFn: async (payload) => {
      return await updateEventService(id, payload);
    },

    onSuccess: (response) => {
      if (response.status == 200) {

        globalAlert.setIsSuccessActivated(true);
        globalAlert.setSuccessMessage("evento foi editado");

        navigate("/events");

        setTimeout(() => {
          globalAlert.setIsSuccessActivated(false);
        }, 5000);
      }
    },

    onError: (response) => {
      console.log(response);

      globalAlert.setIsErrorActivated(true);
      globalAlert.setErrorMessage("Não foi possível editar evento");

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

  const handleEditEventForm = async (e) => {
    e.preventDefault();

    const payload = { name, date, typeId, placeId, time, email, phone };

    setErrors([]);
    setInputError([]);

    const eventValidationResponse = await eventValidate(payload);

    if (eventValidationResponse.errors) {
      setErrors(eventValidationResponse.errors);
      populateInputsError(eventValidationResponse.errors);
      return;
    }

    updateEventMutation.mutate(payload);
  }

  return (
    <>
      <EditEventPresentation> 
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
      </EditEventPresentation> 

      <EditEventInfo>
        <EditEventTitle>Editar Evento</EditEventTitle>
        <EditEventDescription>*Campos obrigatórios</EditEventDescription>
      </EditEventInfo>

      <EditEventForm onSubmit={handleEditEventForm}>

        <EditEventFormTop>
          <EditEventFormTopMessage>Informações básicas</EditEventFormTopMessage>
        </EditEventFormTop>

        <EditEventFormSection>

          <EditEventFormCard>
            <Box>
              {eventLoading ? (
                <TextField 
                  id="name" 
                  text="Nome do evento*" 
                  placeholder="Carregando..."
                />
              ) : (
                  <TextField 
                    id="name" 
                    text="Nome do evento*" 
                    placeholder="Informe o nome do evento"
                    defaultValue={name}
                    maxLength={100}
                    onChange={(e) => setName(e.target.value)}
                    className={inputError.includes("name") ? "error" : null}
                  />

                )}
              <EditEventErrorMessage errors={errors} id="name" />  
            </Box>

            <Box>
              {eventLoading ? (
                <DateInput 
                  id="date" 
                  text="Data do evento*" 
                  placeholder="Carregando..."
                />
              ) : (
                  <DateInput 
                    id="date" 
                    text="Data do evento*" 
                    placeholder="00/00/0000"
                    onChange={(e) => setDate(e.target.value)}
                    defaultValue={date || undefined}
                    className={inputError.includes("date") ? "error" : null}
                  />

                )}

              <EditEventErrorMessage errors={errors} id="date" />  
            </Box>

            <Box>
              {placesSelectAllQuery ? (
                <SelectField 
                  id="placeId"
                  text="Selecione um local*"
                  defaultKey={placeId}
                  defaultValue="Selecione um local"
                  items={placesSelectAllQuery.data}
                  onChange={(e) => setPlaceId(e.target.value)}
                  className={inputError.includes("placeId") ? "error" : null}
                />
              ) : (
                  <SelectField 
                    id="placeId"
                    text="Selecione um local*"
                    defaultKey={"default"}
                    defaultValue="Carregando itens..."
                    items={[]}
                    className="loading"
                    loading={true}
                  />
                )}
              <Box sx={{ marginTop: ".5rem", textAlign: "right" }}>
                <EditEventLink to="/places/add">Cadastrar local</EditEventLink>
              </Box>

              <EditEventErrorMessage errors={errors} id="placeId" />  
            </Box>

          </EditEventFormCard>

          <EditEventFormCard>
            <Box>
              {!eventTypesQuery ? (
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
                    items={eventTypesQuery.data}
                    onChange={(e) => setTypeId(e.target.value)}
                    className={inputError.includes("typeId") ? "error" : null}
                  /> 
                )}
              <EditEventErrorMessage errors={errors} id="typeId" />
            </Box>

            <Box>
              {eventLoading ? (
                <TimeInput 
                  id="time" 
                  text="Horário do evento*" 
                  placeholder="Carregando..."
                />

              ) : (
                  <TimeInput 
                    id="time" 
                    text="Horário do evento*" 
                    placeholder="Adicione o horário do evento"
                    onChange={(e) => setTime(e.target.value)}
                    defaultValue={time || undefined}
                    className={inputError.includes("time") ? "error" : null}
                  />

                )}
              <EditEventErrorMessage errors={errors} id="time" />
            </Box>

          </EditEventFormCard>

        </EditEventFormSection>

        <EditEventFormTop>
          <EditEventFormTopMessage>Contato</EditEventFormTopMessage>
        </EditEventFormTop>

        <EditEventFormSection>

          <EditEventFormCard>
            <Box>
              {eventLoading ? (
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
                    maxLength={100}
                    onChange={(e) => setEmail(e.target.value)}
                    defaultValue={email}
                    className={inputError.includes("email") ? "error" : null}
                  />

                )}
              <EditEventErrorMessage errors={errors} id="email" />
            </Box>

          </EditEventFormCard>

          <EditEventFormCard>
            <Box>
              {eventLoading ? (
                <PhoneInput 
                  id="phone" 
                  text="Telefone" 
                  placeholder="Carregando..."
                />

              ) : (
                  <PhoneInput 
                    id="phone" 
                    text="Telefone" 
                    placeholder="Informe um telefone"
                    onChange={(e) => setPhone(e.target.value)}
                    defaultValue={phone || undefined}
                    className={inputError.includes("phone") ? "error" : null}
                  />

                )}
              <EditEventErrorMessage errors={errors} id="phone" />
            </Box>

          </EditEventFormCard>

        </EditEventFormSection>

        <EditEventFormBtnGroup>

          <ButtonTransparent 
            text="Cancelar"
            style={{ width: 200, marginRight: 30 }}
            onClick={() => navigate("/events")}
          />

          {updateEventMutation.isPending ? (
            <ButtonPrimary 
              type="submit"
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
        </EditEventFormBtnGroup>
      </EditEventForm>
    </>
  );
}
