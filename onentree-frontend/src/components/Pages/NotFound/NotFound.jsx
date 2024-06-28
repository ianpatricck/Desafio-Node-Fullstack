import { NotFoundCode, NotFoundMessage, NotFoundWrapper } from "./NotFoundStyle";


export default function NotFound() {
  return (
    <NotFoundWrapper>
    <NotFoundCode>404</NotFoundCode>
    <NotFoundMessage>Página não encontrada</NotFoundMessage>
    </NotFoundWrapper>
  );
}

