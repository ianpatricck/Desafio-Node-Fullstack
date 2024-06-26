import { ButtonPrimaryLoadingStyle, ButtonPrimaryStyle } from "./ButtonPrimaryStyle";

export default function ButtonPrimary(props) {
  return (
    <>
      {props.loading ? (
        <ButtonPrimaryLoadingStyle {...props}>
          {props.text}
        </ButtonPrimaryLoadingStyle>
      ) : (

          <ButtonPrimaryStyle {...props}>
            {props.text}
          </ButtonPrimaryStyle>
        )}
    </>
  );
}
