import corpo from "@/assets/images/corpo.svg";
import { WelcomeCardContainer, WelcomeCardWrapper, WelcomeImage, WelcomeMessage, WelcomeTitle } from "./WelcomeCardStyle";

export default function WelcomeCard() {
  return (
    <WelcomeCardWrapper>
      <WelcomeCardContainer>
        <WelcomeImage src={corpo} alt="Avatar"/>
        <div>
          <WelcomeTitle>Olá, Ian Patrick</WelcomeTitle>
          <WelcomeMessage>Confira todos os seus eventos e locais em um só lugar!</WelcomeMessage>
        </div>
      </WelcomeCardContainer>
    </WelcomeCardWrapper>
  );
}
